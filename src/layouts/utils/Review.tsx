import React from "react";
import ReviewModels from "../../models/ReviewModels";
import StarReview from "./StarReview";

const Review: React.FC<{ review: ReviewModels }> = ({ review }) => {
  const date = new Date(review.date);
  const longMonths = date.toLocaleString("en-us", { month: "long" });
  const dateDay = date.getDay();
  const dateYear = date.getFullYear();

  const dateRender = `${longMonths} ${dateDay}, ${dateYear}`;
  return (
    <div>
      <div className="col-sm-8 col-md-8">
        <h5>{review.userEmail}</h5>
        <div className="row">
          <div className="col">{dateRender}</div>
          <div className="col">
            <StarReview rating={review.rating} size={16} />
          </div>
        </div>
        <div className="mt-2">
          <p>{review.reviewDescription}</p>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Review;
