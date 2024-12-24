import JobCard from "./components/JobCard/JobCard";
import { Job } from "./types/job";

const jobs: Job[] = [
  {
    id: "sdkfj-asdkfj-kadfsadfsdf",
    status: "completed",
    result: "https://myurl.com",
    createDate: "2024-12-15",
    lastUpdateDate: "2024-12-15",
  },
  {
    id: "sdkfj-asdkfj-kad",
    status: "pending",
    result: "",
    createDate: "2024-12-16",
    lastUpdateDate: "2024-12-16",
  },
  {
    id: "sdkfj-asdkfj-kad",
    status: "failed",
    result: "",
    createDate: "2024-12-17",
    lastUpdateDate: "2024-12-17",
  },
];
function App() {
  return (
    <div>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default App;
