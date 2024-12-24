import React from "react";
import { Loader2 } from "lucide-react";
import { Job } from "../../types/job";

interface LoaderPropers {
  isLoading: boolean;
  jobs: Job[] | undefined;
}

export const JobsLoader: React.FC<LoaderPropers> = ({ isLoading, jobs }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">
          No jobs found. Create one to get started!
        </p>
      </div>
    );
  }
};
