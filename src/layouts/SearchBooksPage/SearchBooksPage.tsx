import React, { useEffect, useState } from "react";
import BookModel from "../../models/BookModels";
import Spinner from "../utils/Spinner";
import ErrorMessage from "../utils/ErrorMessages";
import SearchBook from "./components/SearchBook";
import Pagination from "../utils/Pagination";

const SearchBooksPage = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookPerPage] = useState(5);
  const [totalAmountOfBook, setTotalAmountOfBook] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchBook = async () => {
      // const url: string = `${process.env.BASE_URL}?page=0&size=9`;
      const base_url = "http://localhost:8080/api/books";
      const url: string = `${base_url}?page=${
        currentPage - 1
      }&size=${bookPerPage}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong!!");
      }

      const responseJson = await response.json();
      const responseData = responseJson._embedded.books;

      setTotalAmountOfBook(responseJson.page.totalElements);
      setTotalPages(responseJson.page.totalPages);

      const loadedBook: BookModel[] = [];

      for (const key in responseData) {
        loadedBook.push({
          id: responseData[key].id,
          title: responseData[key].title,
          author: responseData[key].author,
          description: responseData[key].description,
          copies: responseData[key].copies,
          copiesAvailable: responseData[key].copiesAvailable,
          category: responseData[key].category,
          img: responseData[key].img,
        });
      }
      setBooks(loadedBook);
      setIsLoading(false);
    };
    fetchBook().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
    window.scrollTo(0, 0);
  }, [currentPage]);

  if (isLoading) {
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

  const indexOfLastBook: number = currentPage * bookPerPage;
  const indexOfFirstBook: number = indexOfLastBook - bookPerPage;
  let lastItem =
    bookPerPage * currentPage <= totalAmountOfBook
      ? bookPerPage * currentPage
      : totalAmountOfBook;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <div>
      <div className="container">
        <div className="">
          <div className="row mt-5">
            <div className="col-6">
              <div className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search Books Here!!"
                  aria-labelledby="search"
                />
                <button className="btn btn-outline-success">Search</button>
              </div>
            </div>
            <div className="col-4">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      All
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Front-end
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Back-end
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Database
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      DevOps
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <h5>Number of Results : ({totalAmountOfBook})</h5>
          </div>
          <p>
            {indexOfFirstBook + 1} of {lastItem} of {totalAmountOfBook} items:{" "}
          </p>
          {books.map((book) => (
            <SearchBook book={book} key={book.id} />
          ))}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBooksPage;
