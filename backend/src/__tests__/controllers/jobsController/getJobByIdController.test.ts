import { getJobsById } from "../../../controllers/jobsController/getJobByIdController";
import { getJobByIdService } from "../../../services/getJobByIdService";
import { Request, Response } from "express";
import { logger } from "../../../logger/customerLogger";

jest.mock("../../../services/getJobByIdService");
jest.mock("../../../logger/customerLogger");

describe("getJobsById Controller", () => {
  const mockRequest = (params: any = {}): Partial<Request> => ({
    params,
  });

  const mockResponse = (): Partial<Response> => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return job data with status 200 when job is found", async () => {
    const mockJobResponse = {
      id: "1",
      status: "pending",
      result: null,
      createDate: "2024-01-01T00:00:00Z",
      lastUpdateDate: "2024-01-02T00:00:00Z",
    };

    (getJobByIdService as jest.Mock).mockResolvedValue(mockJobResponse);

    const req = mockRequest({ jobId: "1" });
    const res = mockResponse();

    await getJobsById(req as Request, res as Response);

    expect(getJobByIdService).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockJobResponse);
  });

  it("should return 400 if jobId is not provided", async () => {
    const req = mockRequest();
    const res = mockResponse();

    await getJobsById(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Job ID is required" });
  });

  it("should return 404 if job with given jobId is not found", async () => {
    (getJobByIdService as jest.Mock).mockResolvedValue(null);

    const req = mockRequest({ jobId: "999" });
    const res = mockResponse();

    await getJobsById(req as Request, res as Response);

    expect(getJobByIdService).toHaveBeenCalledWith("999");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "Job with ID 999 not found",
    });
  });

  it("should handle errors and return status 500", async () => {
    (getJobByIdService as jest.Mock).mockRejectedValue(
      new Error("Service failed")
    );

    const req = mockRequest({ jobId: "1" });
    const res = mockResponse();

    await getJobsById(req as Request, res as Response);

    expect(getJobByIdService).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to fetch job. Please try again later.",
    });
    expect(logger.error).toHaveBeenCalledWith(
      "Error fetching job: Error: Service failed"
    );
  });
});
