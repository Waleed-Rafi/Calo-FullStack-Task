import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CardContent from "../../../components/Card/CardContent";

describe("CardContent component", () => {
  it("renders CardContent with children correctly", () => {
    render(<CardContent>Content here</CardContent>);

    const content = screen.getByText("Content here");
    expect(content).toBeInTheDocument();
    expect(content).toHaveClass("p-6 pt-0");
  });

  it("applies additional className to CardContent", () => {
    render(
      <CardContent className="custom-content-class">Content here</CardContent>
    );

    const content = screen.getByText("Content here");
    expect(content).toHaveClass("custom-content-class");
  });
});
