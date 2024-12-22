import fs from "fs-extra";
import path from "path";
import { TJobs } from "../types/Job";
import { logger } from "../logger/customerLogger";

const filePath = path.join(__dirname, "../../data/jobs.json");

export const readJobs = async (): Promise<TJobs[]> => {
  try {
    return await fs.readJSON(filePath);
  } catch (error) {
    logger.error(`Error reading file: ${error}`);
    return [];
  }
};

export const writeJobs = async (jobs: TJobs[] | []): Promise<void> => {
  try {
    await fs.writeJSON(filePath, jobs, { spaces: 2 });
  } catch (error) {
    logger.error(`Error writing file: ${error}`);
    throw new Error("Failed to update jobs file");
  }
};
