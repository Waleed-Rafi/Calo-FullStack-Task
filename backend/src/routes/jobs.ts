import { Router } from "express";
import { createJob, getJobs } from "../controllers/jobsController";

const router = Router();

router.post("/jobs", createJob);
router.get("/jobs", getJobs);

export default router;
