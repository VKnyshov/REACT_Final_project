"use client";

import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPreviousPage: () => void;
    onNextPage: () => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
                                                            currentPage,
                                                            totalPages,
                                                            onPreviousPage,
                                                            onNextPage,
                                                        }) => {
    return (
        <div className="pagination">
            <button
                onClick={onPreviousPage}
                disabled={currentPage === 1}
            >Back</button>

            <div>Page {currentPage} of {totalPages}</div>

            <button
                onClick={onNextPage}
                disabled={currentPage === totalPages}
            >Next</button>
        </div>
    );
};

export default PaginationComponent;
