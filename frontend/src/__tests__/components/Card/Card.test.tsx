import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Card from "../../../components/Card/Card";

describe("Card component", () => {
  it("renders Card with children correctly", () => {
    render(<Card>Test content</Card>);

    const card = screen.getByText("Test content");
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("bg-white rounded-lg border shadow-sm");
  });

  it("applies additional className to Card", () => {
    render(<Card className="custom-class">Test content</Card>);

    const card = screen.getByText("Test content");
    expect(card).toHaveClass("custom-class");
  });
});
