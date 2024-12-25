import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CardHeader from "../../../components/Card/CardHeader";

describe("CardHeader component", () => {
  it("renders CardHeader with children correctly", () => {
    render(<CardHeader>Header content</CardHeader>);

    const header = screen.getByText("Header content");
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass(
      "flex flex-row items-center justify-between p-6"
    );
  });

  it("applies additional className to CardHeader", () => {
    render(
      <CardHeader className="custom-header-class">Header content</CardHeader>
    );

    const header = screen.getByText("Header content");
    expect(header).toHaveClass("custom-header-class");
  });
});
