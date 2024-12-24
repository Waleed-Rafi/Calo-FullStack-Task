import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Button from "../components/Button";
import { Loader2 } from "lucide-react";
import JobCard from "../components/JobCard/JobCard";
import { JobsLoader } from "../components/Loader/JobsLoader";
import { useJobs } from "../hooks/useJobs";

export const JobDashboard: React.FC = () => {
  const {
    jobs,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    createJob,
    isCreating,
    status,
  } = useJobs();

  // For infinite scroll
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "error") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Error loading jobs
          </h2>
          <p className="mt-2 text-gray-500">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-sm">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Job Dashboard</h1>
            <p className="text-gray-500 mt-2">
              Monitor and manage your processing jobs
            </p>
          </div>
          <Button
            onClick={() => createJob()}
            disabled={isCreating}
            className="inline-flex items-center"
          >
            {isCreating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating
              </>
            ) : (
              "Create Job"
            )}
          </Button>
        </div>

        {isLoading || jobs.length === 0 ? (
          <JobsLoader isLoading={isLoading} jobs={jobs} />
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}

            <div ref={ref} className="py-4">
              {isFetchingNextPage && (
                <div className="flex justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
                </div>
              )}
            </div>

            {!hasNextPage && jobs.length > 0 && (
              <div className="text-center text-gray-500 py-4">
                No more jobs to load
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDashboard;
