import React from "react";
import Button from "../components/Button";
import { Loader2 } from "lucide-react";
import JobCard from "../components/JobCard/JobCard";
import { JobsLoader } from "../components/Loader/JobsLoader";
import { useJobs } from "../hooks/useJobs";

const JobDashboard: React.FC = () => {
  const { data: jobs, isLoading, createNewJob, isCreating } = useJobs();

  const createNewJobb = async () => {
    createNewJob({});
    return;
  };

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
          <Button onClick={createNewJobb} disabled={isCreating}>
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

        <div className="grid gap-4">
          <JobsLoader isLoading={isLoading} jobs={jobs} />
          {jobs && jobs.map((job) => <JobCard key={job.id} job={job} />)}
        </div>
      </div>
    </div>
  );
};

export default JobDashboard;
