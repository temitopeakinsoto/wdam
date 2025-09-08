import React from "react";
import { render, screen } from "@testing-library/react";
import { EmptyState } from "@/components/EmptyState";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({ children, href, ...props }: any) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

describe("EmptyState Component", () => {
  const defaultProps = {
    title: "Test Empty State Title",
  };

  it("should render empty state title", () => {
    render(<EmptyState {...defaultProps} />);
    expect(screen.getByText("Test Empty State Title")).toBeInTheDocument();
  });

  it("should render message when provided", () => {
    const message = "Test empty state message";
    render(<EmptyState {...defaultProps} message={message} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it("should not render message when not provided", () => {
    render(<EmptyState {...defaultProps} />);
    expect(
      screen.queryByText(/Test empty state message/)
    ).not.toBeInTheDocument();
  });

  it("should render link when linkHref is provided", () => {
    const linkHref = "/test-link";
    const linkText = "Test Link";
    render(
      <EmptyState {...defaultProps} linkHref={linkHref} linkText={linkText} />
    );

    const linkElement = screen.getByText(linkText);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.closest("a")).toHaveAttribute("href", linkHref);
  });

  it("should use default link text when linkText is not provided", () => {
    const linkHref = "/test-link";
    render(<EmptyState {...defaultProps} linkHref={linkHref} />);

    expect(screen.getByText("Go back")).toBeInTheDocument();
  });

  it("should not render link when linkHref is not provided", () => {
    render(<EmptyState {...defaultProps} linkText="Test Link" />);
    expect(screen.queryByText("Test Link")).not.toBeInTheDocument();
  });

  it("should render custom action when provided", () => {
    const CustomAction = <button>Custom Action</button>;
    render(<EmptyState {...defaultProps} action={CustomAction} />);

    expect(screen.getByText("Custom Action")).toBeInTheDocument();
  });

  it("should render both link and action when both are provided", () => {
    const linkHref = "/test-link";
    const CustomAction = <button>Custom Action</button>;

    render(
      <EmptyState {...defaultProps} linkHref={linkHref} action={CustomAction} />
    );

    expect(screen.getByText("Go back")).toBeInTheDocument();
    expect(screen.getByText("Custom Action")).toBeInTheDocument();
  });

  it("should have correct CSS classes for styling", () => {
    render(<EmptyState {...defaultProps} />);

    const container = screen.getByText("Test Empty State Title").closest("div");
    expect(container?.parentElement).toHaveClass(
      "min-h-[400px]",
      "flex",
      "justify-center",
      "items-center"
    );
  });

  it("should have correct styling for title", () => {
    render(<EmptyState {...defaultProps} />);

    const title = screen.getByText("Test Empty State Title");
    expect(title).toHaveClass(
      "text-xl",
      "font-semibold",
      "text-gray-900",
      "mb-3"
    );
  });
});
