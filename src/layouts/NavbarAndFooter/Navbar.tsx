import { useOktaAuth } from "@okta/okta-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import Spinner from "../utils/Spinner";

const Navbar = () => {
  const { oktaAuth, authState } = useOktaAuth();

  if (!authState) return <Spinner />;

  const handelLogout = async () => oktaAuth.signOut();

  console.log(authState);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark main-color py-3">
      <div className="container-fluid">
        <span className="navbar-brand">Ready To Read</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle Navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/search">
                Search Books
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {!authState.isAuthenticated ? (
              <li className="nav-item m-1">
                <Link className="btn btn-outline-light" to="/login">
                  Sign-in
                </Link>
              </li>
            ) : (
              <li className="nav-item m-1">
                <button
                  className="btn btn-outline-light"
                  onClick={handelLogout}
                >
                  Log-out
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
