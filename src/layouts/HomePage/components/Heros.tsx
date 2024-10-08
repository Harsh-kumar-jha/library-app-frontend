import { useOktaAuth } from "@okta/okta-react";
import React from "react";
import { Link } from "react-router-dom";

const Heros = () => {
  const { authState } = useOktaAuth();
  return (
    <div>
      <div className="d-none d-lg-block">
        <div className="row g-0 mt-5">
          <div className="col-sm-6 col-md-6">
            <div className="col-image-left"></div>
          </div>
          <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
            <div className="ml-2">
              <h1>What have you been reading?</h1>
              <p className="lead">
                Library Team would love to know what you have been reading.
                Whether it is learning new skill or grow within one, We will be
                able to provide top content for you!
              </p>
              {authState?.isAuthenticated ? (
                <Link
                  type="button"
                  className="btn main-color btn-lg text-white"
                  to="/search"
                >
                  Explore
                </Link>
              ) : (
                <Link className="btn main-color btn-lg text-white" to="/login">
                  Sign Up
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="row g-0">
          <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
            <div className="ml-2">
              <h1>Our Collection is Always Changing...</h1>
              <p className="lead">
                Try to check in daily as our Collection is always changing. We
                work nonstop to provide the most accurate book selection
                possible for our readers! We are diligent about our book
                selection, and our books are always going to be our top
                priority.
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-md-6">
            <div className="col-image-right"></div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="d-lg-none">
        <div className="container">
          <div className="m-2">
            <div className="col-image-left"></div>
            <div className="mt-2">
              <h1>What have you been reading?</h1>
              <p className="lead">
                Library Team would love to know what you have been reading.
                Whether it is learning new skill or grow within one, We will be
                able to provide top content for you!
              </p>
              {authState?.isAuthenticated ? (
                <Link
                  type="button"
                  className="btn main-color btn-lg text-white"
                  to="/search"
                >
                  Explore
                </Link>
              ) : (
                <Link className="btn main-color btn-lg text-white" to="/login">
                  Sign Up
                </Link>
              )}
            </div>
          </div>
          <div className="m-2">
            <div className="mt-2">
              <h1>Our Collection is Always Changing...</h1>
              <p className="lead">
                Try to check in daily as our Collection is always changing. We
                work nonstop to provide the most accurate book selection
                possible for our readers! We are diligent about our book
                selection, and our books are always going to be our top
                priority.
              </p>
            </div>
            <div className="col-image-right"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heros;
