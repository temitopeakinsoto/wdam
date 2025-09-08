import { PaginationInfo } from '@/types';

/**
 * Calculates pagination information
 */
export function calculatePagination(
  currentPage: number,
  totalItems: number,
  itemsPerPage: number
): PaginationInfo {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
  };
}

/**
 * Generates pagination items with ellipsis for UI display
 */
export function getPaginationItems(currentPage: number, totalPages: number): (number | string)[] {
  const items: (number | string)[] = [];
  const maxVisiblePages = 5;

  if (totalPages <= maxVisiblePages) {
    // Show all pages if total is less than max visible
    for (let i = 1; i <= totalPages; i++) {
      items.push(i);
    }
  } else {
    // Complex logic for ellipsis
    if (currentPage <= 3) {
      // Beginning: 1, 2, 3, 4, ..., last
      for (let i = 1; i <= 4; i++) {
        items.push(i);
      }
      items.push('...');
      items.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      // End: 1, ..., last-3, last-2, last-1, last
      items.push(1);
      items.push('...');
      for (let i = totalPages - 3; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      // Middle: 1, ..., current-1, current, current+1, ..., last
      items.push(1);
      items.push('...');
      items.push(currentPage - 1);
      items.push(currentPage);
      items.push(currentPage + 1);
      items.push('...');
      items.push(totalPages);
    }
  }

  return items;
}

/**
 * Calculates the start and end indices for current page items
 */
export function getPaginationIndices(currentPage: number, itemsPerPage: number) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return { startIndex, endIndex };
}
