import React from "react";
import { getPaginationItems } from "@/utils/pagination";

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
    <div className="flex items-center justify-end mt-6">
      <div className="flex items-center space-x-2">
        <button
          onClick={goToPrevious}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm font-medium text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>

        <div className="flex space-x-1">
          {getPaginationItems(currentPage, totalPages).map((item, index) => {
            if (item === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-3 py-2 text-xs font-medium text-gray-500"
                >
                  ...
                </span>
              );
            }

            const pageNumber = item as number;
            return (
              <button
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                className={`px-3 py-2 text-xs font-medium rounded-md ${
                  currentPage === pageNumber
                    ? "bg-purple-100 text-purple-500"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

        <button
          onClick={goToNext}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
