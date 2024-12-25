import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StatusBadge from "../../components/StatusBadge";

describe("StatusBadge component", () => {
  it("renders the 'completed' status with correct styles and icon", () => {
    render(<StatusBadge status="completed" />);

    const badge = screen.getByText(/completed/i);
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-green-50 text-green-700 border-green-200");
    expect(badge.querySelector("svg")).toBeInTheDocument();
  });

  it("renders the 'failed' status with correct styles and icon", () => {
    render(<StatusBadge status="failed" />);

    const badge = screen.getByText(/failed/i);
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-red-50 text-red-700 border-red-200");
    expect(badge.querySelector("svg")).toBeInTheDocument();
  });

  it("renders the 'pending' status with correct styles and icon", () => {
    render(<StatusBadge status="pending" />);

    const badge = screen.getByText(/pending/i);
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-blue-50 text-blue-700 border-blue-200");
    expect(badge.querySelector("svg")).toBeInTheDocument(); // Ensures the icon is rendered
  });

  it("capitalizes the status text correctly", () => {
    render(<StatusBadge status="pending" />);

    const badge = screen.getByText(/pending/i);
    expect(badge).toHaveTextContent("pending");
    expect(badge).toHaveClass("capitalize");
  });
});
