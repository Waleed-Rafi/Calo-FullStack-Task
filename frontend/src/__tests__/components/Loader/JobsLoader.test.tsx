import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { JobsLoader } from "../../../components/Loader/JobsLoader";

vi.mock("lucide-react", () => ({
  Loader2: ({ className }: { className?: string }) => (
    <svg data-testid="loader" className={className} />
  ),
}));

describe("JobsLoader component", () => {
  it("displays the loader icon when isLoading is true", () => {
    render(<JobsLoader isLoading={true} jobs={undefined} />);

    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass("animate-spin text-blue-500");
  });

  it("displays a message when no jobs are found", () => {
    render(<JobsLoader isLoading={false} jobs={[]} />);

    const message = screen.getByText(/no jobs found/i);
    expect(message).toBeInTheDocument();
    expect(message).toHaveClass("text-gray-500");
  });

  it("renders nothing when there are jobs (but we should test jobs rendering elsewhere)", () => {
    render(
      <JobsLoader
        isLoading={false}
        jobs={[
          {
            id: "sdf",
            status: "pending",
            result: "",
            createDate: "",
            lastUpdateDate: "",
          },
        ]}
      />
    );

    expect(screen.queryByText(/no jobs found/i)).toBeNull();
    expect(screen.queryByTestId("loader")).toBeNull();
  });
});
