import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  paginate,
}) => {
  const pageNumber: number[] = [];

  // Generate page numbers
  if (currentPage === 1) {
    pageNumber.push(currentPage);
    if (totalPages >= currentPage + 1) {
      pageNumber.push(currentPage + 1);
    }
    if (totalPages >= currentPage + 2) {
      pageNumber.push(currentPage + 2);
    }
  } else if (currentPage > 1) {
    if (currentPage >= 3) {
      pageNumber.push(currentPage - 2);
      pageNumber.push(currentPage - 1);
    } else {
      pageNumber.push(currentPage - 1);
    }

    pageNumber.push(currentPage);
    if (totalPages >= currentPage + 1) {
      pageNumber.push(currentPage + 1);
    }
    if (totalPages >= currentPage + 2) {
      pageNumber.push(currentPage + 2);
    }
  }

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => paginate(1)}
            disabled={currentPage === 1}
          >
            First
          </button>
        </li>
        {pageNumber.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
            onClick={() => paginate(number)}
          >
            <button className="page-link">{number}</button>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => paginate(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
