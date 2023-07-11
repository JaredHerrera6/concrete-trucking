import React, { useEffect, useState } from "react";
import { FaFileInvoice } from "react-icons/fa";
import { IoIosPersonAdd } from "react-icons/io";
import { GrDocumentUpdate, GrView } from "react-icons/gr";
import Baseurl from "../apis/Baseurl";
import ManagerOrderList from "../components/ManagerOrderList";
import { useNavigate } from "react-router-dom";
function Managers() {
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
      <h1 className="text-center display-3">Management</h1>
      <h1 className="display text-decoration-underline">
        <u>Responsabilities / Roles</u>
      </h1>
      {/*LIst/Table to show the Roles/Responsabilities of the Manager in our system */}
      <ul className="list-group w-25">
        <li className="list-group-item d-flex justify-content-between align-items-center bg-info">
          View Orders
          <span class="badge badge-info badge-pill">
            <FaFileInvoice />
          </span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center bg-secondary text-white">
          Update Orders
          <span class="badge badge-secondary badge-pill">
            <GrDocumentUpdate />
          </span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center bg-info">
          View Drivers Orders
          <span class="badge badge-info badge-pill">
            <GrView />
          </span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center bg-secondary text-white">
          Assign Drivers
          <span class="badge badge-secondary badge-pill">
            <IoIosPersonAdd />
          </span>
        </li>
      </ul>

      {/*Table to show the Drivers in the Database*/}
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
                <tr key={driver.id}>
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
      <ManagerOrderList />
    </div>
  );
}
export default Managers;
