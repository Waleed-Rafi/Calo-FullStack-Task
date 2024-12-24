export interface Job {
  id: string;
  status: "pending" | "completed" | "failed";
  result?: string;
  error?: string;
  createDate: string;
  lastUpdateDate: string;
}
