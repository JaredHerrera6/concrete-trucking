import React, { useEffect, useState } from "react";
import Baseurl from "../apis/Baseurl";
import { MdCreateNewFolder } from "react-icons/md";
import { GrView, GrUserNew } from "react-icons/gr";
import { FaEdit } from "react-icons/fa";

function Customers() {
  const [customers, setCustomers] = useState(null);

  //UseEffect to fetch the list of Customers
  useEffect(() => {
    const fetchData = async () => {
      try {
        //Baseurl is already an axios const, exports the base Url form the Baseurl.js
        const response = await Baseurl.get("users/customers");
        console.log(response);
        setCustomers(response.data.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1 className="text-center display-3">Customers</h1>
      <h1 className="display text-decoration-underline">
        <u>Responsabilities / Roles</u>
      </h1>
      {/*List/Table to show the Responsabilites and roles of the CUstomers in our System*/}
      <ul className="list-group w-25">
        <li class="list-group-item d-flex justify-content-between align-items-center bg-info">
          Insert a New Order as a Selected Customer
          <span class="badge badge-info badge-pill">
            <MdCreateNewFolder />
          </span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center bg-secondary text-white">
          View Previous and Current Orders of selected Customer
          <span class="badge badge-secondary badge-pill">
            <GrView />
          </span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center bg-info">
          Edit Order(If not in Transit or Deivered)
          <span class="badge badge-info badge-pill">
            <FaEdit />
          </span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center bg-secondary text-white">
          Create new Customer
          <span class="badge badge-secondary badge-pill">
            <GrUserNew />
          </span>
        </li>
      </ul>

      {/*Table to show the Customers in the Database*/}
      {/*The Customers are selectable to show the Orders*/}
      <h1 className="mt-4 text-primary">Customers</h1>
      <table className="table table-striped table-dark rounded">
        <thead className="text-primary">
          <tr>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          {customers &&
            customers.map((customer) => {
              return (
                <tr>
                  <td>{customer.first_name.toUpperCase()}</td>
                  <td>{customer.last_name.toUpperCase()}</td>
                  <td>{customer._role.toUpperCase()}</td>
                  <td>
                    <button className="btn btn-primary">View Customer</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <button type="button" className="btn-lg btn-dark btn-outline-info">
        <GrUserNew />
        Create New Customer
      </button>
    </div>
  );
}

export default Customers;
