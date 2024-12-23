import { Request, Response } from "express";
import { createJob } from "../../../controllers/jobsController/createJobController";
import { readJobs, writeJobs } from "../../../utils/jobsFileHandler";
import { getTimeStamp } from "../../../utils/getTimestamp";
import { jobQueue } from "../../../queue/JobQueue";
import { logger } from "../../../logger/customerLogger";

// Mock dependencies
jest.mock("../../../utils/jobsFileHandler", () => ({
  readJobs: jest.fn(),
  writeJobs: jest.fn(),
}));

jest.mock("../../../utils/getTimestamp", () => ({
  getTimeStamp: jest.fn(() => "2024-12-23T12:00:00Z"),
}));

jest.mock("../../../queue/JobQueue", () => ({
  jobQueue: {
    enqueue: jest.fn(),
  },
}));

jest.mock("../../../logger/customerLogger", () => ({
  logger: {
    error: jest.fn(),
  },
}));

describe("createJob", () => {
  it("should create a new job and return its ID", async () => {
    (readJobs as jest.Mock).mockResolvedValue([]);
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await createJob(req, res);

    expect(readJobs).toHaveBeenCalled();
    expect(writeJobs).toHaveBeenCalledWith([
      {
        id: expect.any(String),
        status: "pending",
        result: null,
        createDate: "2024-12-23T12:00:00Z",
        lastUpdateDate: "2024-12-23T12:00:00Z",
      },
    ]);
    expect(jobQueue.enqueue).toHaveBeenCalledWith({
      id: expect.any(String),
      status: "pending",
      result: null,
      createDate: "2024-12-23T12:00:00Z",
      lastUpdateDate: "2024-12-23T12:00:00Z",
    });
    expect(res.status).toHaveBeenCalledWith(202);
    expect(res.json).toHaveBeenCalledWith({ jobId: expect.any(String) });
  });

  it("should handle errors and respond with a 500 status code", async () => {
    (readJobs as jest.Mock).mockRejectedValue(new Error("File read error"));
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await createJob(req, res);

    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining("Error creating job:")
    );
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
  });
});
