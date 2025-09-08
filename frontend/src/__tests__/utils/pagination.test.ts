import { calculatePagination, getPaginationItems, getPaginationIndices } from '@/utils/pagination';

describe('Pagination Utilities', () => {
  describe('calculatePagination', () => {
    it('should calculate pagination correctly for basic case', () => {
      const result = calculatePagination(1, 100, 10);
      expect(result).toEqual({
        currentPage: 1,
        totalPages: 10,
        totalItems: 100,
        itemsPerPage: 10,
      });
    });

    it('should handle non-divisible total items', () => {
      const result = calculatePagination(2, 95, 10);
      expect(result).toEqual({
        currentPage: 2,
        totalPages: 10,
        totalItems: 95,
        itemsPerPage: 10,
      });
    });

    it('should handle zero total items', () => {
      const result = calculatePagination(1, 0, 10);
      expect(result).toEqual({
        currentPage: 1,
        totalPages: 0,
        totalItems: 0,
        itemsPerPage: 10,
      });
    });

    it('should handle single page', () => {
      const result = calculatePagination(1, 5, 10);
      expect(result).toEqual({
        currentPage: 1,
        totalPages: 1,
        totalItems: 5,
        itemsPerPage: 10,
      });
    });
  });

  describe('getPaginationIndices', () => {
    it('should calculate correct indices for first page', () => {
      const result = getPaginationIndices(1, 10);
      expect(result).toEqual({
        startIndex: 0,
        endIndex: 10,
      });
    });

    it('should calculate correct indices for middle page', () => {
      const result = getPaginationIndices(3, 10);
      expect(result).toEqual({
        startIndex: 20,
        endIndex: 30,
      });
    });

    it('should calculate correct indices for different page size', () => {
      const result = getPaginationIndices(2, 5);
      expect(result).toEqual({
        startIndex: 5,
        endIndex: 10,
      });
    });
  });

  describe('getPaginationItems', () => {
    it('should return all pages when total is small', () => {
      const result = getPaginationItems(2, 4);
      expect(result).toEqual([1, 2, 3, 4]);
    });

    it('should include ellipsis for beginning case', () => {
      const result = getPaginationItems(2, 10);
      expect(result).toEqual([1, 2, 3, 4, '...', 10]);
    });

    it('should include ellipsis for end case', () => {
      const result = getPaginationItems(9, 10);
      expect(result).toEqual([1, '...', 7, 8, 9, 10]);
    });

    it('should include ellipsis for middle case', () => {
      const result = getPaginationItems(5, 10);
      expect(result).toEqual([1, '...', 4, 5, 6, '...', 10]);
    });

    it('should handle single page', () => {
      const result = getPaginationItems(1, 1);
      expect(result).toEqual([1]);
    });

    it('should handle edge case with exactly 5 pages', () => {
      const result = getPaginationItems(3, 5);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });
  });
});
