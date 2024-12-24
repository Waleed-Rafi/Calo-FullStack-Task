import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Job } from "../types/job";

const fetchJobs = async (): Promise<Job[]> => {
  const response = await axios.get("http://localhost:5001/jobs");
  return response.data.jobs;
};

const createJob = async (): Promise<Job> => {
  const response = await axios.post("http://localhost:5001/jobs");
  return response.data;
};

export const useJobs = () => {
  const queryClient = useQueryClient();

  const jobsQuery = useQuery<Job[], Error>({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  const createNewJobMutation = useMutation<Job, Error, Partial<Job>>({
    mutationFn: createJob,
    onSuccess: (newJob) => {
      console.log(newJob);
      queryClient.setQueryData<Job[]>(["jobs"], (oldJobs) => [
        newJob,
        ...(oldJobs || []),
      ]);
    },
  });

  return {
    ...jobsQuery,
    createNewJob: createNewJobMutation.mutateAsync,
    isCreating: createNewJobMutation.isPending,
  };
};
