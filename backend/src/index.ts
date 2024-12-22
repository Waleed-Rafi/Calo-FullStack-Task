import express from "express";
import testRoutes from "./routes/test";

const app = express();

app.use(express.json());

app.use("/", testRoutes);

module.exports = app;
