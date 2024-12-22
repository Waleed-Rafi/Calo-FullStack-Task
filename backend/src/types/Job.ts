export type TJobs = {
  id: string;
  status: "pending" | "completed" | "failed";
  result: string | null;
  createDate: string;
  lastUpdateDate: string;
};
