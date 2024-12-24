export interface Job {
  id: string;
  status: "pending" | "completed" | "failed";
  result?: string;
  error?: string;
  createDate: string;
  lastUpdateDate: string;
}

export interface JobsResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  jobs: Job[];
}
