import { PaginationProps } from "@/types/auditLog";

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const maxVisiblePages = 5;
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    // Calculate the range of page numbers to display
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const visiblePages = pageNumbers.slice(startPage - 1, endPage);

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
            </div>

            <div className="flex items-center space-x-1">
                {/* First Page Button */}
                <button
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                    className="p-2 border border-gray-300 rounded-md text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    aria-label="First page"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                </button>

                {/* Previous Page Button */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    aria-label="Previous page"
                >
                    Previous
                </button>

                {/* Show ellipsis if needed at the start */}
                {startPage > 1 && (
                    <span className="px-2 py-1 text-gray-500">...</span>
                )}

                {/* Page Number Buttons */}
                {visiblePages.map(number => (
                    <button
                        key={number}
                        onClick={() => onPageChange(number)}
                        className={`px-3 py-1 border rounded-md transition-colors ${currentPage === number
                                ? 'bg-blue-500 text-white border-blue-500'
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                        aria-label={`Page ${number}`}
                        aria-current={currentPage === number ? 'page' : undefined}
                    >
                        {number}
                    </button>
                ))}

                {/* Show ellipsis if needed at the end */}
                {endPage < totalPages && (
                    <span className="px-2 py-1 text-gray-500">...</span>
                )}

                {/* Next Page Button */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    aria-label="Next page"
                >
                    Next
                </button>

                {/* Last Page Button */}
                <button
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-gray-300 rounded-md text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    aria-label="Last page"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Page Size Selector (optional) */}
            <div className="flex items-center space-x-2 text-sm">
                <label htmlFor="itemsPerPage" className="text-gray-600">
                    Items per page:
                </label>
                <select
                    id="itemsPerPage"
                    className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                // You would need to implement items per page functionality
                // onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
        </div>
    );
};

export default Pagination;