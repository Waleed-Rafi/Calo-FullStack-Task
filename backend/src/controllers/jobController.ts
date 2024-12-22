import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { readJobs, writeJobs } from "../utils/jobsFileHandler";
import { getTimeStamp } from "../utils/getTimestamp";

export const createJob = async (req: Request, res: Response) => {
  try {
    const jobId = uuidv4(); // we can make it more unique by mixing it with some user related information (hash of ip etc)

    const newJob = {
      id: jobId,
      status: "pending",
      result: null,
      createDate: getTimeStamp(),
      lastUpdateDate: getTimeStamp(),
    };

    const jobs = await readJobs();

    jobs.push(newJob);

    await writeJobs(jobs);

    // Add job to queue for async processing

    res.status(202).json({ jobId });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};