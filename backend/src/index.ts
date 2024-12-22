import express from "express";
import testRoutes from "./routes/test";
import jobRoutes from "./routes/jobs";
import { rateLimiter } from "./middlewares/rateLimiter";

const app = express();

app.use(express.json());
app.use(rateLimiter);

app.use("/", testRoutes);
app.use("/", jobRoutes);

module.exports = app;
