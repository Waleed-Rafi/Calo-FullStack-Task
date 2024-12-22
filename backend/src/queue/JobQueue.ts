import { TJobs } from "../types/Job";

class JobQueue {
  private queue: TJobs[] = [];

  enqueue(job: TJobs) {
    this.queue.push(job);
  }

  dequeue(): TJobs | undefined {
    return this.queue.shift();
  }

  getSize(): number {
    return this.queue.length;
  }
}

export const jobQueue = new JobQueue();
