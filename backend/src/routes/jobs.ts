import { Router } from "express";
import { createJob, getJobs, getJobsById } from "../controllers/jobsController";

const router = Router();

router.post("/jobs", createJob);
router.get("/jobs", getJobs);
router.get("/jobs/:jobId", getJobsById);

export default router;
