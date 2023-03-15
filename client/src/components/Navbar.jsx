import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark ">
      <div className="container-fluid ">
        <div>
          <Link to="/">
            <span className="navbar-brand mb-0 h1">Concrete Trucking</span>
          </Link>
        </div>
        <div>
          <Link to="/" className="mx-3 text-decoration-none text-light">
            <span>Home</span>
          </Link>
          <Link
            to="/users/managers"
            className="mx-3 text-decoration-none text-light"
          >
            <span>Managers</span>
          </Link>
          <Link
            to="/users/drivers"
            className="mx-3 text-decoration-none text-light"
          >
            <span>Drivers</span>
          </Link>
          <Link
            to="/users/customers"
            className="mx-3 text-decoration-none text-light"
          >
            <span>Customers</span>
          </Link>
          <Link to="/about" className="mx-3 text-decoration-none text-light">
            <span>About</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
