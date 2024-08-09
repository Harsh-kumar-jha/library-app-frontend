import React from "react";

const ExploreTopBooks = () => {
  return (
    <div className="p-5 mb-4 bg-dark header">
      <div className="container-fluid py-5 d-flex text-white justify-content-center align-item-center">
        <div>
          <h1 className="display-5 fw-bold">Find Your next Adventure</h1>
          <p className="col-md-8 fs-4">Where would you like to go next?</p>
          <a type="button" className="btn main-color btn-lg text-white" href="">
            Explore Top Books
          </a>
        </div>
      </div>
    </div>
  );
};

export default ExploreTopBooks;
