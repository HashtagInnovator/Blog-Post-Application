import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar(props) {
  // Retrieve the user information from localStorage
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);

  return (
    <>
      <div className="nav">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              {props.title}
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    to="/posts"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Posts
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/about"
                    className="nav-link"
                    activeClassName="active"
                  >
                    About
                  </NavLink>
                </li>
                {user ? ( // Render "Add Posts" link if user is logged in
                  <li className="nav-item">
                    <NavLink
                      to="/add-posts"
                      className="nav-link"
                      activeClassName="active"
                    >
                      Add Posts
                    </NavLink>
                  </li>
                ) : null}
              </ul>
              <form className="d-flex" role="search">
                {user ? ( // Render user name and logout button if user is logged in
                  <>
                    <span className="navbar-text  primary">
                      Welcome, {user.name}
                    </span>
                    <button
                      className="btn btn-outline-danger logged"
                      onClick={() => {
                        // Clear user information from localStorage on logout
                        localStorage.removeItem("user");
                        // Reload the page to reflect the changes
                        window.location.reload();
                      }}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  // Render "Signup" button if user is not logged in
                  <Link to="/login" className="btn btn-outline-info login">
                    Login
                  </Link>
                )}
              </form>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

Navbar.defaultProps = {
  title: 'Blog Post',
};

Navbar.propTypes = {
  title: PropTypes.string,
};
