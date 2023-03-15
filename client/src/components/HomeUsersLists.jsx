import React, { useEffect, useState } from "react";
import Baseurl from "../apis/Baseurl";

const HomeUserLists = (props) => {
  const [managers, setManagers] = useState(null);
  const [drivers, setDrivers] = useState(null);
  const [customers, setCustomers] = useState(null);
  //UseEffect to fetch the list of managers
  useEffect(() => {
    const fetchData = async () => {
      try {
        //Baseurl is already an axios const, exports the base Url form the Baseurl.js
        const response = await Baseurl.get("users/managers");
        setManagers(response.data.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  //UseEffect to fetch the list of drivers
  useEffect(() => {
    const fetchData = async () => {
      try {
        //Baseurl is already an axios const, exports the base Url form the Baseurl.js
        const response = await Baseurl.get("users/drivers");
        setDrivers(response.data.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  //UseEffect to fetch the list of Customers
  useEffect(() => {
    const fetchData = async () => {
      try {
        //Baseurl is already an axios const, exports the base Url form the Baseurl.js
        const response = await Baseurl.get("users/customers");
        setCustomers(response.data.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/*Table to Show the Managers in the Database*/}
      <h1 className="mt-4 text-primary">Managers</h1>
      <table className="table table-striped table-dark rounded">
        <thead className="text-primary">
          <tr>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          {managers &&
            managers.map((manager) => {
              return (
                <tr key={manager.id}>
                  <td>{manager.first_name.toUpperCase()}</td>
                  <td>{manager.last_name.toUpperCase()}</td>
                  <td>{manager._role.toUpperCase()}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {/*Table to show the Drivers in the Database*/}
      <h1 className="mt-4 text-primary">Drivers</h1>
      <table className="table table-striped table-dark rounded">
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
                </tr>
              );
            })}
        </tbody>
      </table>
      {/*Table to show the Customers in the Database*/}
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
                <tr key={customer.id}>
                  <td>{customer.first_name.toUpperCase()}</td>
                  <td>{customer.last_name.toUpperCase()}</td>
                  <td>{customer._role.toUpperCase()}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default HomeUserLists;
