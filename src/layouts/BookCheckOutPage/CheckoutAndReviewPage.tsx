import React from "react";
import BookModel from "../../models/BookModels";
import { Link } from "react-router-dom";

const CheckoutAndReviewPage: React.FC<{
  book: BookModel | undefined;
  mobile: boolean;
}> = ({ book, mobile }) => {
  return (
    <div
      className={
        mobile ? "card d-flex mt-5" : "card container col-3 d-flex mb-5"
      }
    >
      <div className="card-body container">
        <div className="mt-3">
          <p>
            <b>0/5 </b>
            books Checked out
          </p>
          <hr />
          {book && book.copiesAvailable && book.copiesAvailable > 0 ? (
            <h4 className="text-success">Available</h4>
          ) : (
            <h4 className="text-danger">Wait List</h4>
          )}
          <div className="row">
            <p className="col-6 lead">
              <b>{book?.copies} </b>
              copies
            </p>
            <p className="col-6 lead">
              <b>{book?.copiesAvailable} </b>
              Available
            </p>
          </div>
        </div>
        <Link to="/#" className="btn btn-success btn-lg">
          Sign In
        </Link>
        <hr />
        <p className="mt-3">
          This number can change until placing order has been complete.
        </p>
        <p>Sign-in to be able to leave review.</p>
      </div>
    </div>
  );
};

export default CheckoutAndReviewPage;
