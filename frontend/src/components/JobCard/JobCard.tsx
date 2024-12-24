import React from "react";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import StatusBadge from "../StatusBadge";
import CardContent from "../Card/CardContent";
import { formatDate } from "../../utils/dateUtils";
import { Job } from "../../types/job";

const JobCard: React.FC<{ job: Job }> = ({ job }) => (
  <React.Fragment key={job.id}>
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-700">
            Job ID: <span className="font-mono">{job.id}</span>
          </h3>
        </div>
        <StatusBadge status={job.status} />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">
              Created
            </p>
            <p className="mt-1 text-sm font-medium">
              {formatDate(job.createDate)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">
              Last Updated
            </p>
            <p className="mt-1 text-sm font-medium">
              {formatDate(job.lastUpdateDate)}
            </p>
          </div>
          {job.result && (
            <div className="col-span-2 md:w-1/3">
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                Result URL
              </p>
              <p className="mt-1 text-sm font-medium text-blue-600 hover:text-blue-800 truncate cursor-pointer">
                <a
                  href={job.result}
                  target="_blank"
                  className="block w-full truncate"
                >
                  {job.result}
                </a>
              </p>
            </div>
          )}
          {job.error && (
            <div className="col-span-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                Error
              </p>
              <p className="mt-1 text-sm font-medium text-red-600">
                {job.error}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  </React.Fragment>
);

export default JobCard;
