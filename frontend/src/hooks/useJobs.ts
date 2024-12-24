import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "axios";
import { Job } from "../types/job";

const fetchJobs = async (): Promise<Job[]> => {
  const response = await axios.get("http://localhost:5001/jobs");
  return response.data.jobs;
};

const fetchJobById = async (id: string): Promise<Job> => {
  const response = await axios.get(`http://localhost:5001/jobs/${id}`);
  return response.data;
};

const createJob = async (): Promise<Job> => {
  const response = await axios.post("http://localhost:5001/jobs");
  return response.data; // Return the newly created job
};

export const useJobs = () => {
  const queryClient = useQueryClient();
  const [pendingJobs, setPendingJobs] = useState<string[]>([]);

  const jobsQuery = useQuery<Job[], Error>({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  const createNewJobMutation = useMutation<Job, Error, Partial<Job>>({
    mutationFn: createJob,
    onSuccess: (newJob) => {
      if (newJob.status === "pending") {
        setPendingJobs((prev) => [...prev, newJob.id]);
      }

      queryClient.setQueryData<Job[]>(["jobs"], (oldJobs) => [
        newJob,
        ...(oldJobs || []),
      ]);
    },
  });

  // Polling logic for updating pending jobs
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        for (const jobId of pendingJobs) {
          const updatedJob = await fetchJobById(jobId);

          if (updatedJob.status !== "pending") {
            queryClient.setQueryData<Job[]>(["jobs"], (oldJobs) =>
              oldJobs?.map((job) => (job.id === jobId ? updatedJob : job))
            );

            setPendingJobs((prev) => prev.filter((id) => id !== jobId));
          }
        }
      } catch (error) {
        console.error("Error polling job status:", error);
      }
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId);
  }, [pendingJobs, queryClient]);

  return {
    ...jobsQuery,
    createNewJob: createNewJobMutation.mutateAsync,
    isCreating: createNewJobMutation.isPending,
  };
};
