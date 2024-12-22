import express from "express";

const app = express();

app.use(express.json());

app.get("/test", async (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

module.exports = app;
