import { jobQueue } from "../queue/JobQueue";
import { fetchRandomImageFromUnsplash } from "../services/unsplash";
import { getTimeStamp } from "../utils/getTimestamp";
import { readJobs, writeJobs } from "../utils/jobsFileHandler";
import { logger } from "../logger/customerLogger";

const MIN_DELAY = 5 * 1000;
const MAX_DELAY = 1 * 60 * 1000;
const POLL_INTERVAL = 5 * 1000;

async function processJob(jobId: string) {
  const delay =
    Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1)) + MIN_DELAY;

  logger.info(`Processing job: ${jobId}`);

  await new Promise((resolve) => setTimeout(resolve, delay));

  try {
    const imageUrl = await fetchRandomImageFromUnsplash();
    logger.info(`Fetched image URL for job ${jobId}: ${imageUrl}`);

    return { jobId, imageUrl };
  } catch (error) {
    logger.error(`Error processing job ${jobId}: ${error}`);
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
      logger.info("writing complete");
    } catch (error) {
      logger.info(`something went wrong with processing job ${error}`);
    }
  } else {
    logger.info("No jobs in the queue. Waiting...");
  }
};

export const jobWorker = () => {
  setInterval(async () => {
    if (jobQueue.getSize() > 0) {
      processQueue();
    }
  }, POLL_INTERVAL);
};
