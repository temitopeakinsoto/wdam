import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { PostCard, NewPostCard } from "@/components/PostCard";
import { Post } from "@/types";

describe("PostCard Component", () => {
  const mockPost: Post = {
    id: "test-post-id",
    title: "Test Post Title",
    body: "This is a test post body content.",
    user_id: "test-user-id",
  };

  it("should render post title and body", () => {
    render(<PostCard post={mockPost} />);

    expect(screen.getByText("Test Post Title")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test post body content.")
    ).toBeInTheDocument();
  });

  it("should render delete button when onDelete is provided", () => {
    const onDelete = jest.fn();
    render(<PostCard post={mockPost} onDelete={onDelete} />);

    const deleteButton = screen.getByTitle("Delete post");
    expect(deleteButton).toBeInTheDocument();
  });

  it("should not render delete button when onDelete is not provided", () => {
    render(<PostCard post={mockPost} />);

    const deleteButton = screen.queryByTitle("Delete post");
    expect(deleteButton).not.toBeInTheDocument();
  });

  it("should call onDelete with post id when delete button is clicked", () => {
    const onDelete = jest.fn();
    render(<PostCard post={mockPost} onDelete={onDelete} />);

    const deleteButton = screen.getByTitle("Delete post");
    fireEvent.click(deleteButton);

    expect(onDelete).toHaveBeenCalledWith("test-post-id");
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it("should disable delete button when isDeleting is true", () => {
    const onDelete = jest.fn();
    render(<PostCard post={mockPost} onDelete={onDelete} isDeleting={true} />);

    const deleteButton = screen.getByTitle("Delete post");
    expect(deleteButton).toBeDisabled();
  });

  it("should not disable delete button when isDeleting is false", () => {
    const onDelete = jest.fn();
    render(<PostCard post={mockPost} onDelete={onDelete} isDeleting={false} />);

    const deleteButton = screen.getByTitle("Delete post");
    expect(deleteButton).not.toBeDisabled();
  });

  it("should have correct styling classes", () => {
    const { container } = render(<PostCard post={mockPost} />);
    const cardElement = container.firstChild as HTMLElement;

    expect(cardElement).toHaveClass(
      "bg-white",
      "rounded-lg",
      "shadow-sm",
      "p-4",
      "hover:shadow-md",
      "transition-shadow",
      "h-80",
      "flex",
      "flex-col"
    );
  });

  it("should render long title correctly", () => {
    const longTitlePost = {
      ...mockPost,
      title:
        "This is a very long title that should be displayed properly with line clamp styling applied to it",
    };

    render(<PostCard post={longTitlePost} />);

    const titleElement = screen.getByText(longTitlePost.title);
    expect(titleElement).toHaveClass("line-clamp-2");
  });

  it("should render long body correctly", () => {
    const longBodyPost = {
      ...mockPost,
      body: "This is a very long body content that should be displayed properly with overflow hidden styling applied to it to maintain the card height and appearance.",
    };

    render(<PostCard post={longBodyPost} />);

    const bodyElement = screen.getByText(longBodyPost.body);
    expect(bodyElement).toHaveClass("overflow-hidden");
  });
});

describe("NewPostCard Component", () => {
  it("should render new post card", () => {
    const onClick = jest.fn();
    render(<NewPostCard onClick={onClick} />);

    expect(screen.getByText("New Post")).toBeInTheDocument();
  });

  it("should call onClick when clicked", () => {
    const onClick = jest.fn();
    render(<NewPostCard onClick={onClick} />);

    const button = screen.getByText("New Post");
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("should render plus icon", () => {
    const onClick = jest.fn();
    const { container } = render(<NewPostCard onClick={onClick} />);

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("w-8", "h-8", "mb-3");
  });

  it("should have correct styling for button", () => {
    const onClick = jest.fn();
    render(<NewPostCard onClick={onClick} />);

    const button = screen.getByText("New Post").closest("button");
    expect(button).toHaveClass(
      "w-full",
      "h-72",
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
      "text-gray-500",
      "hover:text-gray-600",
      "transition-colors"
    );
  });

  it("should have correct container styling", () => {
    const onClick = jest.fn();
    const { container } = render(<NewPostCard onClick={onClick} />);

    const cardContainer = container.firstChild as HTMLElement;
    expect(cardContainer).toHaveClass(
      "bg-white",
      "rounded-lg",
      "shadow-sm",
      "border-2",
      "border-dashed",
      "border-gray-300",
      "hover:border-gray-400",
      "transition-colors"
    );
  });
});
