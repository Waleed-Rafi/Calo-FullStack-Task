import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Button from "../../components/Button";

describe("Button component", () => {
  it("renders the button with default styles and children", () => {
    render(<Button>Click Me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-blue-600 text-white h-10 py-2 px-4");
  });

  it("renders the button with outline variant", () => {
    render(<Button variant="outline">Outline Button</Button>);

    const button = screen.getByRole("button", { name: /outline button/i });
    expect(button).toHaveClass(
      "border border-gray-300 bg-transparent hover:bg-gray-50"
    );
  });

  it("renders the button with small size", () => {
    render(<Button size="small">Small Button</Button>);

    const button = screen.getByRole("button", { name: /small button/i });
    expect(button).toHaveClass("h-8 px-3 text-sm");
  });

  it("applies additional class names", () => {
    render(<Button className="custom-class">Styled Button</Button>);

    const button = screen.getByRole("button", { name: /styled button/i });
    expect(button).toHaveClass("custom-class");
  });

  it("triggers onClick event when clicked", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);

    const button = screen.getByRole("button", { name: /clickable/i });
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when the disabled prop is set", () => {
    render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByRole("button", { name: /disabled button/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass(
      "disabled:opacity-50 disabled:pointer-events-none"
    );
  });
});
