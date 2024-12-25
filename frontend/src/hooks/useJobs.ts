import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  InfiniteData,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Job, JobsResponse } from "../types/job";
import apiClient from "../services/apiClient";

const fetchJobs = async (page: number): Promise<JobsResponse> => {
  const { data } = await apiClient.get(`/jobs?page=${page}`);
  return data;
};

const fetchJobById = async (id: string): Promise<Job> => {
  const { data } = await apiClient.get(`/jobs/${id}`);
  return data;
};

const createJob = async () => {
  const { data } = await apiClient.post("/jobs");
  return data;
};

export const useJobs = () => {
  const queryClient = useQueryClient();
  const [pendingJobs, setPendingJobs] = useState<string[]>([]);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["jobs"],
    queryFn: ({ pageParam = 1 }) => fetchJobs(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    // Add this to prevent double fetching
    select: (data) => ({
      pages: [...data.pages],
      pageParams: [...data.pageParams],
    }),
  });

  const createJobMutation = useMutation({
    mutationFn: createJob,
    onSuccess: (newJob: Job) => {
      if (newJob.status === "pending") {
        setPendingJobs((prev) => [...prev, newJob.id]);
      }

      queryClient.setQueryData<InfiniteData<JobsResponse>>(
        ["jobs"],
        (oldData) => {
          if (!oldData?.pages?.length) return oldData;

          return {
            ...oldData,
            pages: [
              {
                ...oldData.pages[0],
                jobs: [newJob, ...oldData.pages[0].jobs],
              },
              ...oldData.pages.slice(1),
            ],
          };
        }
      );
    },
  });

  useEffect(() => {
    if (pendingJobs.length === 0) return;

    const intervalId = setInterval(async () => {
      for (const jobId of pendingJobs) {
        try {
          const updatedJob = await fetchJobById(jobId);

          if (updatedJob.status !== "pending") {
            setPendingJobs((prev) => prev.filter((id) => id !== jobId));

            queryClient.setQueryData<InfiniteData<JobsResponse>>(
              ["jobs"],
              (oldData) => {
                if (!oldData?.pages) return oldData;

                return {
                  ...oldData,
                  pages: oldData.pages.map((page) => ({
                    ...page,
                    jobs: page.jobs.map((job) =>
                      job.id === jobId ? updatedJob : job
                    ),
                  })),
                };
              }
            );
          }
        } catch (error) {
          if (error instanceof Error) {
            console.error(`Error polling job ${jobId}:`, error.message);
          }
        }
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [pendingJobs, queryClient]);

  const safeData = data?.pages.flatMap((page) => page.jobs) ?? [];

  return {
    jobs: safeData,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    createJob: createJobMutation.mutate,
    isCreating: createJobMutation.isPending,
    status,
  };
};
