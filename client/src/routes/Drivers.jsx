import React, { useEffect, useState } from "react";
import Baseurl from "../apis/Baseurl";
import { GrStatusInfo } from "react-icons/gr";
import { FaEdit } from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
function Drivers() {
  const [drivers, setDrivers] = useState(null);
  let navigate = useNavigate();
  //UseEffect to fetch the list of drivers
  useEffect(() => {
    const fetchData = async () => {
      try {
        //Baseurl is already an axios const, exports the base Url form the Baseurl.js
        const response = await Baseurl.get("users/drivers");
        console.log(response);
        setDrivers(response.data.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  //This Allows us to Navigate to the Selected Driver Page
  const handleDriverSelect = (id) => {
    navigate(`/users/${id}`);
  };
  return (
    <div>
      <h1 className="text-center display-3">Drivers</h1>
      <h1 className="display text-decoration-underline">
        <u>Responsabilities / Roles</u>
      </h1>
      {/*List/Table to shpw Roles/Responsabilities of the Drivers in our Database */}
      {/*See assigned orders and change the status of the order*/}
      <ul class="list-group w-25">
        <li class="list-group-item d-flex justify-content-between align-items-center bg-info">
          View Drivers Assigned Orders
          <span class="badge badge-info badge-pill">
            <GrStatusInfo />
          </span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center bg-secondary text-white">
          Update Order Status
          <span class="badge badge-secondary badge-pill">
            <FaEdit />
          </span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center bg-info">
          View Order Details
          <span class="badge badge-info badge-pill">
            <FcViewDetails />
          </span>
        </li>
      </ul>

      {/*Table shows the Drivers in the Database, allows user to click a driver
        and view the assigned orders,
        also gives option to edit the status of the order,
        also allows the driver to view the order details*/}
      <h1 className="mt-4 text-primary">Drivers</h1>
      <table className="table table-striped table-dark rounded w-75">
        <thead className="text-primary">
          <tr>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          {drivers &&
            drivers.map((driver) => {
              return (
                <tr>
                  <td>{driver.first_name.toUpperCase()}</td>
                  <td>{driver.last_name.toUpperCase()}</td>
                   <td>{driver._role.toUpperCase()}</td>
                  <td>
                    <button
                      onClick={() => handleDriverSelect(driver.id)}
                      key={driver.id}
                      className="btn btn-primary "
                    >
                      View Driver
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
export default Drivers;
