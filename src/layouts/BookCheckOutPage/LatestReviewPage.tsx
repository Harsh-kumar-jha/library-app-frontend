import React from "react";
import ReviewModels from "../../models/ReviewModels";
import { Link } from "react-router-dom";
import Review from "../utils/Review";

const LatestReviewPage: React.FC<{
  review: ReviewModels[];
  bookId: Number | undefined;
  mobile: boolean;
}> = ({ review, bookId, mobile }) => {
  return (
    <div className={mobile ? "mt-3" : "row mt-5"}>
      <div className={mobile ? "" : "col-sm-2 col-md-2"}>
        <h2>Latest Reviews: </h2>
      </div>
      <div className="col-sm-10 col-md-10">
        {review.length > 0 ? (
          <>
            {review.slice(0, 3).map((eachReview) => (
              <Review review={eachReview} key={eachReview.id} />
            ))}
            <div className="m-3">
              <Link
                type="button"
                className="btn main-color btn-md text-white"
                to="#"
              >
                Read All Reviews
              </Link>
            </div>
          </>
        ) : (
          <div className="m-3">
            <p className="lead">
              Currently there is not review for this book...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestReviewPage;
