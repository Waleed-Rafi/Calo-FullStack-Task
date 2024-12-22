import { readJobs } from "../utils/jobsFileHandler";

export const getJobsService = async (page: number, limit: number) => {
  const jobs = await readJobs();

  const sortedJobs = jobs.sort(
    (a, b) =>
      new Date(b.createDate).getTime() - new Date(a.createDate).getTime()
  );

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedJobs = sortedJobs.slice(startIndex, endIndex).map((job) => ({
    id: job.id,
    status: job.status,
    result: job.result,
  }));

  return {
    page,
    limit,
    total: jobs.length,
    totalPages: Math.ceil(jobs.length / limit),
    jobs: paginatedJobs,
  };
};
