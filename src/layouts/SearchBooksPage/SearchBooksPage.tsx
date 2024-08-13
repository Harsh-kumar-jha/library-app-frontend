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
  const [search, setSearch] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
  const [categorySelection, setCategorySelection] = useState("Book category");

  useEffect(() => {
    const fetchBook = async () => {
      // const url: string = `${process.env.BASE_URL}?page=0&size=9`;
      const base_url = "http://localhost:8080/api/books";
      let url: string = "";

      if (searchUrl === "") {
        url = `${base_url}?page=${currentPage - 1}&size=${bookPerPage}`;
      } else {
        let searchWithPage = searchUrl.replace(
          "<pageNumber>",
          `${currentPage - 1}`
        );
        url = base_url + searchWithPage;
      }

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
  }, [currentPage, searchUrl]);

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

  const searchHandleChange = () => {
    setCurrentPage(1);
    if (search === "") {
      setSearchUrl("");
    } else {
      setSearchUrl(
        `/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${bookPerPage}`
      );
    }
    setCategorySelection("Book category");
  };

  const categoryField = (value: string) => {
    setCurrentPage(1);
    if (
      value.toLowerCase() === "fe" ||
      value.toLowerCase() === "be" ||
      value.toLowerCase() === "data" ||
      value.toLowerCase() === "devops"
    ) {
      setCategorySelection(value);
      setSearchUrl(
        `/search/findByCategory?category=${value}&page=<pageNumber>&size=${bookPerPage}`
      );
    } else {
      setCategorySelection("All");
      setSearchUrl(`?page=<pageNumber>&size=${bookPerPage}`);
    }
  };
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
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
                <button
                  className="btn btn-outline-success"
                  onClick={searchHandleChange}
                >
                  Search
                </button>
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
                  {categorySelection}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li onClick={() => categoryField("All")}>
                    <a className="dropdown-item" href="#">
                      All
                    </a>
                  </li>
                  <li onClick={() => categoryField("FE")}>
                    <a className="dropdown-item" href="#">
                      Front End
                    </a>
                  </li>
                  <li onClick={() => categoryField("BE")}>
                    <a className="dropdown-item" href="#">
                      Back End
                    </a>
                  </li>
                  <li onClick={() => categoryField("Data")}>
                    <a className="dropdown-item" href="#">
                      Data
                    </a>
                  </li>
                  <li onClick={() => categoryField("DevOps")}>
                    <a className="dropdown-item" href="#">
                      DevOps
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {totalAmountOfBook > 0 ? (
            <>
              <div className="mt-3">
                <h5>Number of Results : ({totalAmountOfBook})</h5>
              </div>
              <p>
                {indexOfFirstBook + 1} of {lastItem} of {totalAmountOfBook}{" "}
                items:{" "}
              </p>
              {books.map((book) => (
                <SearchBook book={book} key={book.id} />
              ))}
            </>
          ) : (
            <div className="m-5">
              <h3>Can't find what you are looking for ?</h3>
              <a
                type="button"
                className="btn btn-primary btn-md px-4 me-md-2 fw-bold text-white"
                href="#"
                style={{
                  backgroundColor: "#007bff", // Bootstrap primary color
                  borderColor: "#007bff",
                  transition: "background-color 0.3s, border-color 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#0056b3"; // Darker blue on hover
                  e.currentTarget.style.borderColor = "#0056b3";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#007bff"; // Original color
                  e.currentTarget.style.borderColor = "#007bff";
                }}
              >
                Library Services
              </a>
            </div>
          )}
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
