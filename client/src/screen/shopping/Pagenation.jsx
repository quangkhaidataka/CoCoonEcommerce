import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomPagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const pageItems = [];

  // Create page items for each page number
  for (let i = 1; i <= totalPages; i++) {
    // Display the first page, current page, pages within 1 of the current page, and last page
    if (
      i === 1 ||
      i === totalPages ||
      i === currentPage ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pageItems.push(
        <li className={`page-item ${i === currentPage ? 'active' : ''}`} key={i}>
          <button className="page-link" onClick={() => setCurrentPage(i)}>
            {i}
          </button>
        </li>
      );
    }
    // Add ellipsis (...) before and after a gap in pagination
    else if (i === currentPage - 2 || i === currentPage + 2) {
      pageItems.push(
        <li className="page-item disabled" key={`ellipsis-${i}`}>
          <span className="page-link">...</span>
        </li>
      );
    }
  }

  return (
    <div className="mypage">
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)} aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        {pageItems}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)} aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
    </div>

  );
};

export default CustomPagination;
