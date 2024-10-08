import React from "react";
import { Link } from "react-router-dom";

const ExploreTopBooks = () => {
  return (
    <div className="p-5 mb-4 bg-dark header">
      <div className="container-fluid py-5 d-flex text-white justify-content-center align-item-center">
        <div>
          <h1 className="display-5 fw-bold">Find Your next Adventure</h1>
          <p className="col-md-8 fs-4">Where would you like to go next?</p>
          <Link
            type="button"
            className="btn btn-lg text-white"
            to="/search"
            style={{ backgroundColor: "#cc462a" }}
          >
            Explore Top Books
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExploreTopBooks;
