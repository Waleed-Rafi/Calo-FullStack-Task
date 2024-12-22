import express from "express";
import testRoutes from "./routes/test";
import jobRoutes from "./routes/jobs";

const app = express();

app.use(express.json());

app.use("/", testRoutes);
app.use("/", jobRoutes);

module.exports = app;
