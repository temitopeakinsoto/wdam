import React from "react";
import { getPaginationItems } from "@/utils/pagination";
import { Button } from "./Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  onPageChange,
  isLoading = false,
}: PaginationProps) {
  const goToPrevious = () => {
    onPageChange(Math.max(currentPage - 1, 1));
  };

  const goToNext = () => {
    onPageChange(Math.min(currentPage + 1, totalPages));
  };

  if (totalItems === 0) return null;

  return (
    <div className="flex items-center justify-between mt-8">
      <div className="text-sm text-gray-700">
        Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of{" "}
        {totalItems} results
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={goToPrevious}
          disabled={currentPage === 1 || isLoading}
        >
          ← Previous
        </Button>

        <div className="flex space-x-1">
          {getPaginationItems(currentPage, totalPages).map((item, index) => {
            if (item === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-3 py-2 text-sm font-medium text-gray-500"
                >
                  ...
                </span>
              );
            }

            const pageNumber = item as number;
            return (
              <Button
                key={pageNumber}
                variant={currentPage === pageNumber ? "default" : "ghost"}
                size="sm"
                onClick={() => onPageChange(pageNumber)}
                disabled={isLoading}
                className={
                  currentPage === pageNumber ? "bg-gray-900 text-white" : ""
                }
              >
                {pageNumber}
              </Button>
            );
          })}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={goToNext}
          disabled={currentPage === totalPages || isLoading}
        >
          Next →
        </Button>
      </div>
    </div>
  );
}
