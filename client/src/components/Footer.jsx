import React from "react";
import { Link } from "react-router-dom";
import {
  FcAbout,
  FcCustomerSupport,
  FcManager,
  FcHome,
  FcShipped,
} from "react-icons/fc";
function Footer() {
  return (
    //Footer
    <footer className="page-footer font-small bg-dark text-white pt-3 ">
      {/*Footer Links*/}
      <div className="container text-center">
        {/*Grid Row*/}
        <div className="row">
          {/*Grid Column*/}
          <div className="col-md-4 mt-md-0 mt-3">
            {/*Content*/}
            <h5 className="text-uppercase text-primary">
              Concrete Trucking Company
            </h5>
            <p>
              The Concrete Trucking Company management System's main goal is to
              efficiently track the Orders, drivers, and customers of a Concrete
              mix trucking company. For further details, please visit the About
              Page.
            </p>
          </div>
          {/*Grid Column*/}
          <hr className="clearfix w-100 d-md-none pb-3" />
          {/*Grid Column*/}
          <div className="col-md mb-md-0 mb-3">
            {/*Links*/}
            <h5 className="text-uppercase text-primary">Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/">
                  <FcHome />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/users/managers">
                  <FcManager />
                  Managers
                </Link>
              </li>
              <li>
                <Link to="/users/drivers">
                  <FcShipped />
                  Drivers
                </Link>
              </li>
              <li>
                <Link to="/users/customers">
                  <FcCustomerSupport />
                  Customers
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <FcAbout />
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright text-center py-3">
        @2023 Copyright Jared Herrera
      </div>
    </footer>
  );
}

export default Footer;
