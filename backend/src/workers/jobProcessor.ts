import { jobQueue } from "../queue/JobQueue";
import { fetchRandomImageFromUnsplash } from "../services/unsplash";
import { getTimeStamp } from "../utils/getTimestamp";
import { readJobs, writeJobs } from "../utils/jobsFileHandler";

const MIN_DELAY = 5 * 1000;
const MAX_DELAY = 1 * 60 * 1000;
const POLL_INTERVAL = 5 * 1000;

async function processJob(jobId: string) {
  const delay =
    Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1)) + MIN_DELAY;

  console.log(`Processing job: ${jobId}`);

  await new Promise((resolve) => setTimeout(resolve, delay));

  try {
    const imageUrl = await fetchRandomImageFromUnsplash();
    console.log(`Fetched image URL for job ${jobId}: ${imageUrl}`);

    return { jobId, imageUrl };
  } catch (error) {
    console.log(`Error processing job ${jobId}: ${error}`);
    throw new Error(`Job ${jobId} failed due to Unsplash API error`);
  }
}

const processQueue = async () => {
  const jobBody = jobQueue.dequeue();
  if (jobBody) {
    try {
      const jobResult = await processJob(jobBody.id);
      jobBody.status = "completed";
      jobBody.result = jobResult.imageUrl;
      jobBody.lastUpdateDate = getTimeStamp();
      const jobs = await readJobs();
      const targetJobIndex = jobs.findIndex((job) => job.id === jobBody.id);
      jobs[targetJobIndex] = jobBody;
      await writeJobs(jobs);
      console.log("writing complete");
    } catch (error) {
      console.log(`something went wrong with processing job ${error}`);
    }
  } else {
    console.log("No jobs in the queue. Waiting...");
  }
};

export const jobWorker = () => {
  setInterval(async () => {
    if (jobQueue.getSize() > 0) {
      processQueue();
    }
  }, POLL_INTERVAL);
};
