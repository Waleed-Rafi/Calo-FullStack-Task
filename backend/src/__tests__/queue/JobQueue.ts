import { jobQueue } from "../../queue/JobQueue";
import { TJobs } from "../../types/Job";

describe("JobQueue", () => {
  beforeEach(() => {
    jobQueue["queue"] = [];
  });

  it("should enqueue a job", () => {
    const job: TJobs = {
      id: "1",
      status: "pending",
      result: null,
      createDate: "2024-12-23T12:00:00Z",
      lastUpdateDate: "2024-12-23T12:00:00Z",
    };
    jobQueue.enqueue(job);

    expect(jobQueue.getSize()).toBe(1);
  });

  it("should dequeue a job", () => {
    const job: TJobs = {
      id: "1",
      status: "pending",
      result: null,
      createDate: "2024-12-23T12:00:00Z",
      lastUpdateDate: "2024-12-23T12:00:00Z",
    };
    jobQueue.enqueue(job);

    const dequeuedJob = jobQueue.dequeue();
    expect(dequeuedJob).toEqual(job);
    expect(jobQueue.getSize()).toBe(0);
  });

  it("should return undefined when dequeuing from an empty queue", () => {
    const dequeuedJob = jobQueue.dequeue();
    expect(dequeuedJob).toBeUndefined();
  });

  it("should return the correct queue size", () => {
    expect(jobQueue.getSize()).toBe(0);

    const job1: TJobs = {
      id: "1",
      status: "pending",
      result: null,
      createDate: "2024-12-23T12:00:00Z",
      lastUpdateDate: "2024-12-23T12:00:00Z",
    };
    const job2: TJobs = {
      id: "2",
      status: "pending",
      result: null,
      createDate: "2024-12-23T12:00:00Z",
      lastUpdateDate: "2024-12-23T12:00:00Z",
    };

    jobQueue.enqueue(job1);
    jobQueue.enqueue(job2);

    expect(jobQueue.getSize()).toBe(2);
  });
});
