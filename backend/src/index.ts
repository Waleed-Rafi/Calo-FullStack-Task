import express from "express";
const cors = require("cors");
import jobRoutes from "./routes/jobs";
import { rateLimiter } from "./middlewares/rateLimiter";
import { jobWorker } from "./workers/jobProcessor";

const app = express();

jobWorker();
app.use(cors());
app.use(express.json());
app.use(rateLimiter);

app.use("/", jobRoutes);

export default app;
