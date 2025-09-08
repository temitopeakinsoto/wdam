import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PostForm } from "@/components/PostForm";

describe("PostForm Component", () => {
  const defaultProps = {
    onSubmit: jest.fn(),
    onCancel: jest.fn(),
    isSubmitting: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render form fields", () => {
    render(<PostForm {...defaultProps} />);

    expect(screen.getByLabelText("Post Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Post Content")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Publish" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  it("should call onCancel when cancel button is clicked", () => {
    const onCancel = jest.fn();
    render(<PostForm {...defaultProps} onCancel={onCancel} />);

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("should update form fields when typing", () => {
    render(<PostForm {...defaultProps} />);

    const titleInput = screen.getByLabelText("Post Title");
    const contentTextarea = screen.getByLabelText("Post Content");

    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(contentTextarea, { target: { value: "Test Content" } });

    expect(titleInput).toHaveValue("Test Title");
    expect(contentTextarea).toHaveValue("Test Content");
  });

  it("should disable submit button when form is invalid", () => {
    render(<PostForm {...defaultProps} />);

    const submitButton = screen.getByRole("button", { name: "Publish" });
    expect(submitButton).toBeDisabled();
  });

  it("should enable submit button when form is valid", () => {
    render(<PostForm {...defaultProps} />);

    fireEvent.change(screen.getByLabelText("Post Title"), {
      target: { value: "Valid title" },
    });
    fireEvent.change(screen.getByLabelText("Post Content"), {
      target: { value: "Valid content here" },
    });

    const submitButton = screen.getByRole("button", { name: "Publish" });
    expect(submitButton).not.toBeDisabled();
  });

  it("should show validation error for long title", async () => {
    render(<PostForm {...defaultProps} />);

    const titleInput = screen.getByLabelText("Post Title");
    const longTitle = "a".repeat(101);
    fireEvent.change(titleInput, { target: { value: longTitle } });
    fireEvent.change(screen.getByLabelText("Post Content"), {
      target: { value: "Valid content" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Publish" }));

    await waitFor(() => {
      expect(
        screen.getByText("Title must be less than 100 characters")
      ).toBeInTheDocument();
    });
  });

  it("should show validation error for long content", async () => {
    render(<PostForm {...defaultProps} />);

    fireEvent.change(screen.getByLabelText("Post Title"), {
      target: { value: "Valid title" },
    });
    const longContent = "a".repeat(1001);
    fireEvent.change(screen.getByLabelText("Post Content"), {
      target: { value: longContent },
    });
    fireEvent.click(screen.getByRole("button", { name: "Publish" }));

    await waitFor(() => {
      expect(
        screen.getByText("Content must be less than 1000 characters")
      ).toBeInTheDocument();
    });
  });

  it("should clear validation errors when cancel is clicked", async () => {
    render(<PostForm {...defaultProps} />);

    // Create an error condition
    const titleInput = screen.getByLabelText("Post Title");
    const longTitle = "a".repeat(101);
    fireEvent.change(titleInput, { target: { value: longTitle } });
    fireEvent.change(screen.getByLabelText("Post Content"), {
      target: { value: "Valid content" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Publish" }));

    await waitFor(() => {
      expect(
        screen.getByText("Title must be less than 100 characters")
      ).toBeInTheDocument();
    });

    // Click cancel
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    await waitFor(() => {
      expect(
        screen.queryByText("Title must be less than 100 characters")
      ).not.toBeInTheDocument();
    });
  });

  it("should call onSubmit with valid data", async () => {
    const onSubmit = jest.fn();
    render(<PostForm {...defaultProps} onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText("Post Title"), {
      target: { value: "Valid title" },
    });
    fireEvent.change(screen.getByLabelText("Post Content"), {
      target: { value: "Valid content here" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Publish" }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        title: "Valid title",
        content: "Valid content here",
      });
    });
  });

  it("should render with initial data", () => {
    const initialData = { title: "Initial Title", content: "Initial Content" };
    render(<PostForm {...defaultProps} initialData={initialData} />);

    expect(screen.getByLabelText("Post Title")).toHaveValue("Initial Title");
    expect(screen.getByLabelText("Post Content")).toHaveValue(
      "Initial Content"
    );
  });

  it("should disable submit button when isSubmitting is true", () => {
    render(<PostForm {...defaultProps} isSubmitting={true} />);

    const submitButton = screen.getByRole("button", { name: "Publishing..." });
    expect(submitButton).toBeDisabled();
  });

  it("should have correct form styling", () => {
    render(<PostForm {...defaultProps} />);

    const titleInput = screen.getByLabelText("Post Title");
    const contentTextarea = screen.getByLabelText("Post Content");

    expect(titleInput).toHaveClass(
      "w-full",
      "px-3",
      "py-2",
      "border",
      "border-gray-300",
      "rounded-md"
    );
    expect(contentTextarea).toHaveClass(
      "w-full",
      "px-3",
      "py-2",
      "border",
      "border-gray-300",
      "rounded-md"
    );
  });

  it("should have correct button styling", () => {
    render(<PostForm {...defaultProps} />);

    const publishButton = screen.getByRole("button", { name: "Publish" });
    const cancelButton = screen.getByRole("button", { name: "Cancel" });

    expect(publishButton).toHaveClass(
      "bg-black",
      "text-white",
      "hover:bg-gray-800"
    );
    expect(cancelButton).toHaveClass(
      "border",
      "border-gray-300",
      "bg-white",
      "text-gray-700"
    );
  });

  it("should display error messages with correct styling", async () => {
    render(<PostForm {...defaultProps} />);

    // Create an error condition
    const titleInput = screen.getByLabelText("Post Title");
    const longTitle = "a".repeat(101);
    fireEvent.change(titleInput, { target: { value: longTitle } });
    fireEvent.change(screen.getByLabelText("Post Content"), {
      target: { value: "Valid content" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Publish" }));

    await waitFor(() => {
      const errorContainer = screen
        .getByText("Title must be less than 100 characters")
        .closest("div");
      expect(errorContainer).toHaveClass(
        "bg-red-50",
        "border",
        "border-red-200",
        "rounded-md"
      );

      const errorList = screen
        .getByText("Title must be less than 100 characters")
        .closest("ul");
      expect(errorList).toHaveClass(
        "text-sm",
        "text-red-600",
        "list-disc",
        "list-inside"
      );
    });
  });

  it("should show loading spinner when submitting", () => {
    render(<PostForm {...defaultProps} isSubmitting={true} />);

    const submitButton = screen.getByRole("button", { name: "Publishing..." });
    const spinner = submitButton.querySelector("svg");

    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("animate-spin");
  });
});
