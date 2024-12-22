import { Request, Response } from "express";
import { getJobByIdService } from "../../services/getJobByIdService";
import { logger } from "../../logger/customerLogger";

export const getJobsById = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;

    if (!jobId) {
      res.status(400).json({ error: "Job ID is required" });
      return;
    }

    const job = await getJobByIdService(jobId);

    if (!job) {
      res.status(404).json({ error: `Job with ID ${jobId} not found` });
      return;
    }

    res.status(200).json(job);
  } catch (error) {
    logger.error(`Error fetching job: ${error}`);
    res
      .status(500)
      .json({ error: "Failed to fetch job. Please try again later." });
  }
};
