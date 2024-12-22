import fs from "fs-extra";
import path from "path";
import { TJobs } from "../types/Job";

const filePath = path.join(__dirname, "../../data/jobs.json");

export const readJobs = async (): Promise<TJobs[]> => {
  try {
    return await fs.readJSON(filePath);
  } catch (error) {
    console.error("Error reading file:", error);
    return [];
  }
};

export const writeJobs = async (jobs: TJobs[] | []): Promise<void> => {
  try {
    await fs.writeJSON(filePath, jobs, { spaces: 2 });
  } catch (error) {
    console.error("Error writing file:", error);
    throw new Error("Failed to update jobs file");
  }
};
