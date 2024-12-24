import JobDashboard from "./screens/JobDashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <JobDashboard />
    </QueryClientProvider>
  );
}

export default App;
