'use client';

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
    const handlePrev = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex justify-center mt-6">
            <button
                onClick={handlePrev}
                className="px-4 py-2 bg-gray-500 text-white disabled:opacity-50"
                disabled={currentPage === 1}
            >
                Previous
            </button>
            <span className="mx-4 text-lg">
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={handleNext}
                className="px-4 py-2 bg-gray-500 text-white disabled:opacity-50"
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
