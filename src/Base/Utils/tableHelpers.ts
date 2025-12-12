/**
 * Table Helper Utilities
 * Shared functions for table pagination, search, and styling
 */

/**
 * Generate pagination numbers with ellipsis for large page counts
 * @param currentPage - Current active page
 * @param totalPages - Total number of pages
 * @returns Array of page numbers and ellipsis strings
 */
export const getPaginationNumbers = (
  currentPage: number,
  totalPages: number
): (number | string)[] => {
  const pages: (number | string)[] = [];

  if (totalPages <= 5) {
    // Show all pages if 5 or less
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Always show first page
    pages.push(1);

    // Add ellipsis if current page is far from start
    if (currentPage > 3) {
      pages.push("...");
    }

    // Show pages around current page
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    // Add ellipsis if current page is far from end
    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    // Always show last page
    if (!pages.includes(totalPages)) {
      pages.push(totalPages);
    }
  }

  return pages;
};

/**
 * Get table row CSS classes with alternating background colors
 * @param index - Row index
 * @returns CSS class string for table row
 */
export const getRowClass = (index: number): string => {
  const baseClass =
    "border-b border-gray-200 hover:bg-gray-100 transition-colors";
  const bgClass = index % 2 === 0 ? "bg-white" : "bg-gray-50";
  return `${baseClass} ${bgClass}`;
};

/**
 * Filter data based on search query across multiple fields
 * @param data - Array of data to filter
 * @param searchQuery - Search query string
 * @param searchFields - Array of field names to search in
 * @returns Filtered data array
 */
export const filterDataBySearch = <T extends Record<string, unknown>>(
  data: T[],
  searchQuery: string,
  searchFields: (keyof T)[]
): T[] => {
  if (!searchQuery.trim()) {
    return data;
  }

  const query = searchQuery.toLowerCase();

  return data.filter((item) =>
    searchFields.some((field) => {
      const value = item[field];

      // Handle string fields
      if (typeof value === "string") {
        return value.toLowerCase().includes(query);
      }

      // Handle array fields
      if (Array.isArray(value)) {
        return value.some((v: unknown) =>
          String(v).toLowerCase().includes(query)
        );
      }

      // Handle other types by converting to string
      return String(value).toLowerCase().includes(query);
    })
  );
};

/**
 * Get paginated data slice
 * @param data - Array of data to paginate
 * @param currentPage - Current page number
 * @param itemsPerPage - Number of items per page
 * @returns Paginated data slice
 */
export const getPaginatedData = <T>(
  data: T[],
  currentPage: number,
  itemsPerPage: number
): T[] => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return data.slice(startIndex, endIndex);
};

/**
 * Calculate total pages
 * @param totalItems - Total number of items
 * @param itemsPerPage - Number of items per page
 * @returns Total number of pages
 */
export const getTotalPages = (
  totalItems: number,
  itemsPerPage: number
): number => {
  return Math.ceil(totalItems / itemsPerPage);
};
