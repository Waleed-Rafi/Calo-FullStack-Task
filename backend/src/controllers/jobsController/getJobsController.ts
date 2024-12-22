import { Request, Response } from "express";
import { getJobsService } from "../../services/getJobsService";

const ALL_JOBS_RESULT_LIMIT = 10;

export const getJobs = async (req: Request, res: Response) => {
  try {
    const { page = 1 } = req.query;

    const pageNumber = Math.max(1, parseInt(page as string, 10));

    const jobs = await getJobsService(pageNumber, ALL_JOBS_RESULT_LIMIT);
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};
