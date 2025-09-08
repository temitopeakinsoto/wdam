import React from "react";
import { render, screen } from "@testing-library/react";
import Loader from "@/components/Loader";

describe("Loader Component", () => {
  it("should render loader component", () => {
    const { container } = render(<Loader />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should have correct container styling", () => {
    const { container } = render(<Loader />);
    const loaderContainer = container.firstChild as HTMLElement;

    expect(loaderContainer).toHaveClass(
      "flex",
      "items-center",
      "justify-center",
      "p-8"
    );
  });

  it("should render three bouncing dots", () => {
    const { container } = render(<Loader />);
    const dots = container.querySelectorAll(".animate-bounce");

    expect(dots).toHaveLength(3);
  });

  it("should have correct styling for each dot", () => {
    const { container } = render(<Loader />);
    const dots = container.querySelectorAll(".animate-bounce");

    dots.forEach((dot) => {
      expect(dot).toHaveClass(
        "w-3",
        "h-3",
        "bg-gray-500",
        "rounded-full",
        "animate-bounce"
      );
    });
  });

  it("should have different animation delays for dots", () => {
    const { container } = render(<Loader />);
    const dots = container.querySelectorAll(".animate-bounce");

    // First dot should have animation-delay:-0.3s
    expect(dots[0]).toHaveClass("[animation-delay:-0.3s]");

    // Second dot should have animation-delay:-0.15s
    expect(dots[1]).toHaveClass("[animation-delay:-0.15s]");

    // Third dot should have no additional delay class (default)
    expect(dots[2]).not.toHaveClass("[animation-delay:-0.3s]");
    expect(dots[2]).not.toHaveClass("[animation-delay:-0.15s]");
  });

  it("should have correct structure", () => {
    const { container } = render(<Loader />);

    // Should have outer container
    const outerContainer = container.firstChild as HTMLElement;
    expect(outerContainer).toBeInTheDocument();

    // Should have inner flex container
    const innerContainer = outerContainer.firstChild as HTMLElement;
    expect(innerContainer).toHaveClass("flex", "space-x-2");

    // Should have exactly 3 children (dots)
    expect(innerContainer.children).toHaveLength(3);
  });
});
