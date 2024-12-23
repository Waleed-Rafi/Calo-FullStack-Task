import fs from "fs-extra";
import { readJobs, writeJobs } from "../../utils/jobsFileHandler";
import { logger } from "../../logger/customerLogger";
import { TJobs } from "../../types/Job";

jest.mock("fs-extra", () => ({
  readJSON: jest.fn(),
  writeJSON: jest.fn(),
}));

jest.mock("../../logger/customerLogger", () => ({
  logger: {
    error: jest.fn(),
  },
}));

describe("jobsFileHandler", () => {
  describe("readJobs", () => {
    it("should return jobs from the file", async () => {
      const mockJobs = [
        {
          id: "1",
          status: "pending",
          result: null,
          createDate: "2024-12-23T12:00:00Z",
          lastUpdateDate: "2024-12-23T12:00:00Z",
        },
      ];

      (fs.readJSON as jest.Mock).mockResolvedValue(mockJobs);

      const result = await readJobs();

      expect(result).toEqual(mockJobs);
      expect(fs.readJSON).toHaveBeenCalledWith(expect.any(String));
    });

    it("should return an empty array if there is an error reading the file", async () => {
      (fs.readJSON as jest.Mock).mockRejectedValue(new Error("File not found"));

      const result = await readJobs();

      expect(result).toEqual([]);
      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining("Error reading file:")
      );
    });
  });

  describe("writeJobs", () => {
    it("should write jobs to the file", async () => {
      const jobs: TJobs[] = [
        {
          id: "1",
          status: "pending",
          result: null,
          createDate: "2024-12-23T12:00:00Z",
          lastUpdateDate: "2024-12-23T12:00:00Z",
        },
      ];

      (fs.writeJSON as jest.Mock).mockResolvedValue(undefined);

      await writeJobs(jobs);

      expect(fs.writeJSON).toHaveBeenCalledWith(expect.any(String), jobs, {
        spaces: 2,
      });
    });

    it("should throw an error if there is an error writing the file", async () => {
      const jobs: TJobs[] = [
        {
          id: "1",
          status: "pending",
          result: null,
          createDate: "2024-12-23T12:00:00Z",
          lastUpdateDate: "2024-12-23T12:00:00Z",
        },
      ];

      (fs.writeJSON as jest.Mock).mockRejectedValue(
        new Error("Permission denied")
      );

      try {
        await writeJobs(jobs);
      } catch (error) {
        expect(logger.error).toHaveBeenCalledWith(
          expect.stringContaining("Error writing file:")
        );
      }
    });
  });
});
