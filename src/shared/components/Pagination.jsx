import React from 'react'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    if (!totalPages || totalPages < 1) return null;

    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        if (pageNumber === currentPage) return;
        onPageChange(pageNumber);
    }

    return (
        <div className="pagination">
            <button type="button" id='prev' disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
            {
                Array.from({ length: totalPages }, (_, i) => (
                    <button key={i} type="button" className={`${currentPage === i + 1 ? 'active' : ''}`} onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                ))
            }
            <button type="button" id='next' disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
        </div>
    )
}
