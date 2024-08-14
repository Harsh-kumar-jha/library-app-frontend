import React, { useEffect, useState } from "react";
import BookModel from "../../models/BookModels";
import Spinner from "../utils/Spinner";
import ErrorMessage from "../utils/ErrorMessages";
import StarReview from "../utils/StarReview";
import CheckoutAndReviewPage from "./CheckoutAndReviewPage";
import ReviewModels from "../../models/ReviewModels";
import LatestReviewPage from "./LatestReviewPage";

const BookCheckOutPage = () => {
  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [review, setReview] = useState<ReviewModels[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [isLoadingReview, setIsLoadingReview] = useState(true);

  const bookId = window.location.pathname.split("/")[2];

  useEffect(() => {
    const fetchBook = async () => {
      // const url: string = `${process.env.BASE_URL}?page=0&size=9`;
      const base_url = `http://localhost:8080/api/books/${bookId}`;

      const response = await fetch(base_url);
      if (!response.ok) {
        throw new Error("Something went wrong!!");
      }

      const responseJson = await response.json();

      const loadedBook: BookModel = {
        id: responseJson.id,
        title: responseJson.title,
        author: responseJson.author,
        description: responseJson.description,
        copies: responseJson.copies,
        copiesAvailable: responseJson.copiesAvailable,
        category: responseJson.category,
        img: responseJson.img,
      };

      setBook(loadedBook);
      setIsLoading(false);
    };
    fetchBook().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [bookId]);

  useEffect(() => {
    const fetchBookReviews = async () => {
      const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;
      const responseReview = await fetch(reviewUrl);

      if (!responseReview.ok) {
        throw new Error("Something went wrong...");
      }

      const responseJsonReview = await responseReview.json();
      const responseData = responseJsonReview._embedded.reviews;

      const loadedReviews: ReviewModels[] = [];
      let waitedStarReviews: number = 0;

      for (const key in responseData) {
        loadedReviews.push({
          id: responseData[key].id,
          userEmail: responseData[key].userEmail,
          date: responseData[key].date,
          rating: responseData[key].rating,
          bookId: responseData[key].bookId,
          reviewDescription: responseData[key].reviewDescription,
        });
        waitedStarReviews = waitedStarReviews + responseData[key].rating;
      }
      if (loadedReviews) {
        const rounded = (
          Math.round((waitedStarReviews / loadedReviews.length) * 2) / 2
        ).toFixed(1);

        setTotalStars(Number(rounded));
      }
      setReview(loadedReviews);
      setIsLoadingReview(false);
    };
    fetchBookReviews().catch((error: any) => {
      setIsLoadingReview(false);
      setHttpError(error.message);
    });
  }, [bookId]);

  if (isLoading || isLoadingReview) {
    return (
      <div className="container m-5">
        <Spinner />
      </div>
    );
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <ErrorMessage message={httpError} />
      </div>
    );
  }

  return (
    <div>
      <div className="container d-none d-lg-block">
        <div className="row mt-5">
          <div className="col-sm-2 col-md-2">
            {book?.img ? (
              <img src={book?.img} width="226" height="349" alt={book?.title} />
            ) : (
              <img
                src={require("../../Images/BooksImages/book-luv2code-1000.png")}
                width="226"
                height="349"
                alt="book-luv2Code"
              />
            )}
          </div>
          <div className="col-4 col-md-4 container">
            <div className="ml-2">
              <h2>{book?.title}</h2>
              <h5 className="text-primary">{book?.author}</h5>
              <p className="lead">{book?.description}</p>
              <StarReview rating={totalStars} size={32} />
            </div>
          </div>
          <CheckoutAndReviewPage book={book} mobile={false} />
        </div>
        <hr />
        <LatestReviewPage review={review} bookId={book?.id} mobile={false} />
      </div>
      <div className="container d-lg-none mt-5">
        <div className="d-flex justify-content-center align-items-center">
          {book?.img ? (
            <img src={book?.img} width="226" height="349" alt={book?.title} />
          ) : (
            <img
              src={require("../../Images/BooksImages/book-luv2code-1000.png")}
              width="226"
              height="349"
              alt="book-luv2Code"
            />
          )}
        </div>
        <div className="mt-4">
          <div className="ml-2">
            <h2>{book?.title}</h2>
            <h5 className="text-primary">{book?.author}</h5>
            <p className="lead">{book?.description}</p>
            <StarReview rating={totalStars} size={32} />
          </div>
        </div>
        <CheckoutAndReviewPage book={book} mobile={true} />
        <hr />
        <LatestReviewPage review={review} bookId={book?.id} mobile={true} />
      </div>
    </div>
  );
};

export default BookCheckOutPage;
