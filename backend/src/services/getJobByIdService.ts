import { logger } from "../logger/customerLogger";
import { readJobs } from "../utils/jobsFileHandler";

export const getJobByIdService = async (jobId: string) => {
  try {
    const jobs = await readJobs();

    if (jobs.length === 0) {
      logger.warn("No jobs found.");
      return null;
    }

    const requiredJob = jobs.find((job) => job.id === jobId);

    return requiredJob || null;
  } catch (error) {
    logger.error(`Error in getJobByIdService: ${error}`);
    throw new Error("Failed to fetch job data.");
  }
};
