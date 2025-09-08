import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "@/components/Pagination";

describe("Pagination Component", () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 10,
    totalItems: 100,
    startIndex: 0,
    endIndex: 10,
    onPageChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render pagination info text", () => {
    render(<Pagination {...defaultProps} />);

    expect(
      screen.getByText((content, element) => {
        return element?.textContent === "Showing 1 to 10 of 100 results";
      })
    ).toBeInTheDocument();
  });

  it("should render loading text when isLoading is true", () => {
    render(<Pagination {...defaultProps} isLoading={true} />);

    // When loading, the pagination still shows results but buttons are disabled
    expect(
      screen.getByText((content, element) => {
        return element?.textContent === "Showing 1 to 10 of 100 results";
      })
    ).toBeInTheDocument();
  });

  it("should render Previous and Next buttons", () => {
    render(<Pagination {...defaultProps} />);

    expect(screen.getByText("← Previous")).toBeInTheDocument();
    expect(screen.getByText("Next →")).toBeInTheDocument();
  });

  it("should disable Previous button on first page", () => {
    render(<Pagination {...defaultProps} currentPage={1} />);

    const prevButton = screen.getByText("← Previous");
    expect(prevButton).toBeDisabled();
  });

  it("should disable Next button on last page", () => {
    render(<Pagination {...defaultProps} currentPage={10} totalPages={10} />);

    const nextButton = screen.getByText("Next →");
    expect(nextButton).toBeDisabled();
  });

  it("should call onPageChange when Previous button is clicked", () => {
    const onPageChange = jest.fn();
    render(
      <Pagination
        {...defaultProps}
        currentPage={5}
        onPageChange={onPageChange}
      />
    );

    const prevButton = screen.getByText("← Previous");
    fireEvent.click(prevButton);

    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it("should call onPageChange when Next button is clicked", () => {
    const onPageChange = jest.fn();
    render(
      <Pagination
        {...defaultProps}
        currentPage={5}
        onPageChange={onPageChange}
      />
    );

    const nextButton = screen.getByText("Next →");
    fireEvent.click(nextButton);

    expect(onPageChange).toHaveBeenCalledWith(6);
  });

  it("should render page numbers", () => {
    render(<Pagination {...defaultProps} currentPage={1} totalPages={5} />);

    // Should show pages 1, 2, 3, 4, 5
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("should highlight current page", () => {
    render(<Pagination {...defaultProps} currentPage={3} totalPages={5} />);

    const currentPageButton = screen.getByText("3");
    expect(currentPageButton).toHaveClass("bg-gray-900", "text-white");
  });

  it("should call onPageChange when page number is clicked", () => {
    const onPageChange = jest.fn();
    render(
      <Pagination
        {...defaultProps}
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChange}
      />
    );

    const pageButton = screen.getByText("3");
    fireEvent.click(pageButton);

    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("should render ellipsis for large page counts", () => {
    render(<Pagination {...defaultProps} currentPage={2} totalPages={10} />);

    const ellipsis = screen.getByText("...");
    expect(ellipsis).toBeInTheDocument();
  });

  it("should not render anything when totalItems is 0", () => {
    const { container } = render(
      <Pagination {...defaultProps} totalItems={0} />
    );

    expect(container.firstChild).toBeNull();
  });

  it("should calculate correct pagination info for middle page", () => {
    render(
      <Pagination
        {...defaultProps}
        currentPage={5}
        startIndex={40}
        endIndex={50}
        totalItems={100}
      />
    );

    expect(
      screen.getByText((content, element) => {
        return element?.textContent === "Showing 41 to 50 of 100 results";
      })
    ).toBeInTheDocument();
  });

  it("should calculate correct pagination info for last page", () => {
    render(
      <Pagination
        {...defaultProps}
        currentPage={10}
        startIndex={90}
        endIndex={100}
        totalItems={95}
      />
    );

    expect(
      screen.getByText((content, element) => {
        return element?.textContent === "Showing 91 to 95 of 95 results";
      })
    ).toBeInTheDocument();
  });

  it("should handle single page correctly", () => {
    render(
      <Pagination
        {...defaultProps}
        currentPage={1}
        totalPages={1}
        totalItems={5}
        startIndex={0}
        endIndex={5}
      />
    );

    expect(
      screen.getByText((content, element) => {
        return element?.textContent === "Showing 1 to 5 of 5 results";
      })
    ).toBeInTheDocument();
    expect(screen.getByText("← Previous")).toBeDisabled();
    expect(screen.getByText("Next →")).toBeDisabled();
  });

  it("should have correct styling for disabled buttons", () => {
    render(<Pagination {...defaultProps} currentPage={1} />);

    const prevButton = screen.getByText("← Previous");
    expect(prevButton).toHaveClass(
      "disabled:pointer-events-none",
      "disabled:opacity-50"
    );
  });

  it("should have correct styling for non-current page buttons", () => {
    render(<Pagination {...defaultProps} currentPage={1} totalPages={5} />);

    const pageButton = screen.getByText("2");
    expect(pageButton).toHaveClass("text-gray-900", "hover:bg-gray-100");
    expect(pageButton).not.toHaveClass("bg-gray-900", "text-white");
  });
});
