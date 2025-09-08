import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ErrorState } from "@/components/ErrorState";

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

describe("ErrorState Component", () => {
  const defaultProps = {
    title: "Test Error Title",
  };

  it("should render error title", () => {
    render(<ErrorState {...defaultProps} />);
    expect(screen.getByText("Test Error Title")).toBeInTheDocument();
  });

  it("should render error message when provided", () => {
    const message = "Test error message";
    render(<ErrorState {...defaultProps} message={message} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it("should not render message when not provided", () => {
    render(<ErrorState {...defaultProps} />);
    expect(screen.queryByText(/Test error message/)).not.toBeInTheDocument();
  });

  it("should render link when linkHref is provided", () => {
    const linkHref = "/test-link";
    const linkText = "Test Link";
    render(
      <ErrorState {...defaultProps} linkHref={linkHref} linkText={linkText} />
    );

    const linkElement = screen.getByText(linkText);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.closest("a")).toHaveAttribute("href", linkHref);
  });

  it("should use default link text when linkText is not provided", () => {
    const linkHref = "/test-link";
    render(<ErrorState {...defaultProps} linkHref={linkHref} />);

    expect(screen.getByText("Go back")).toBeInTheDocument();
  });

  it("should not render link when linkHref is not provided", () => {
    render(<ErrorState {...defaultProps} linkText="Test Link" />);
    expect(screen.queryByText("Test Link")).not.toBeInTheDocument();
  });

  it("should render retry button when onRetry is provided", () => {
    const onRetry = jest.fn();
    render(<ErrorState {...defaultProps} onRetry={onRetry} />);

    const retryButton = screen.getByText("Try again");
    expect(retryButton).toBeInTheDocument();
    expect(retryButton.tagName).toBe("BUTTON");
  });

  it("should call onRetry when retry button is clicked", () => {
    const onRetry = jest.fn();
    render(<ErrorState {...defaultProps} onRetry={onRetry} />);

    const retryButton = screen.getByText("Try again");
    fireEvent.click(retryButton);

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("should not render retry button when onRetry is not provided", () => {
    render(<ErrorState {...defaultProps} />);
    expect(screen.queryByText("Try again")).not.toBeInTheDocument();
  });

  it("should render both link and retry button when both are provided", () => {
    const onRetry = jest.fn();
    const linkHref = "/test-link";

    render(
      <ErrorState {...defaultProps} linkHref={linkHref} onRetry={onRetry} />
    );

    expect(screen.getByText("Go back")).toBeInTheDocument();
    expect(screen.getByText("Try again")).toBeInTheDocument();
  });

  it("should have correct CSS classes for styling", () => {
    render(<ErrorState {...defaultProps} />);

    const container = screen.getByText("Test Error Title").closest("div");
    expect(container?.parentElement).toHaveClass(
      "min-h-screen",
      "flex",
      "justify-center",
      "items-center"
    );
  });

  it("should have correct styling for error title", () => {
    render(<ErrorState {...defaultProps} />);

    const title = screen.getByText("Test Error Title");
    expect(title).toHaveClass("text-xl", "font-medium", "text-red-600", "mb-2");
  });
});
