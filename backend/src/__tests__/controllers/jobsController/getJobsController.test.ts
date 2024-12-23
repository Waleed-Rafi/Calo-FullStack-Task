import { getJobs } from "../../../controllers/jobsController/getJobsController";
import { getJobsService } from "../../../services/getJobsService";
import { Request, Response } from "express";

jest.mock("../../../services/getJobsService");

describe("getJobsController", () => {
  const mockRequest = (query: any = {}): Partial<Request> => ({
    query,
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

  it("should return paginated jobs with status 200", async () => {
    const mockJobsResponse = {
      page: 1,
      limit: 10,
      total: 15,
      totalPages: 2,
      jobs: [
        { id: "1", status: "pending", result: null },
        { id: "2", status: "completed", result: "Success" },
      ],
    };

    (getJobsService as jest.Mock).mockResolvedValue(mockJobsResponse);

    const req = mockRequest({ page: "1" });
    const res = mockResponse();

    await getJobs(req as Request, res as Response);

    expect(getJobsService).toHaveBeenCalledWith(1, 10);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockJobsResponse);
  });

  it("should handle invalid page query and default to page 1", async () => {
    const mockJobsResponse = {
      page: 1,
      limit: 10,
      total: 15,
      totalPages: 2,
      jobs: [
        { id: "1", status: "pending", result: null },
        { id: "2", status: "completed", result: "Success" },
      ],
    };

    (getJobsService as jest.Mock).mockResolvedValue(mockJobsResponse);

    const req = mockRequest({ page: "-5" });
    const res = mockResponse();

    await getJobs(req as Request, res as Response);

    expect(getJobsService).toHaveBeenCalledWith(1, 10);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockJobsResponse);
  });

  it("should handle errors and return status 500", async () => {
    (getJobsService as jest.Mock).mockRejectedValue(
      new Error("Service failed")
    );

    const req = mockRequest();
    const res = mockResponse();

    await getJobs(req as Request, res as Response);

    expect(getJobsService).toHaveBeenCalledWith(1, 10);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Failed to fetch jobs" });
  });
});
