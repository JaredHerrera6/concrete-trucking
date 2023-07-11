import React, { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { OrderContext } from "../context/OrderContext";
import Baseurl from "../apis/Baseurl";
import { useNavigate } from "react-router-dom";

const DriverUpdate = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const { selectedOrder, setSelectedOrder } = useContext(OrderContext);
  const [drivers, setDrivers] = useState(null);
  //useEffect to get the chosen order using the passes on id in the url Parameters
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Baseurl.get(`/orders/${id}`);
        setSelectedOrder(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  //useEffect to ge the list of drivers
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Baseurl.get("users/drivers");
        console.log(response);
        setDrivers(response.data.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  //This allows us to assign the driver to the Order
  const handleDriverSubmit = async (driver_id) => {
    try {
      const response = await Baseurl.put(`/order/driver/${id}`, {
        driver_id: driver_id,
      });
      alert(`Driver Assigned to Order #${id}`);
      navigate("/users/managers");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    //Page Header thats displays the Driver Update along with the selected order number
    <div>
      {selectedOrder && (
        <>
          <h1 className="text-center display-4">
            {/*Displays the Order Number*/}
            Order <u>#{selectedOrder.order.id}</u> Driver Update
          </h1>
        </>
      )}

      {/*Table or list that will show the 
        avaible drivers that the manager can pick*/}
      <h1 className="display text-decoration-underline pt-3">
        <u>Available Drivers</u>
      </h1>
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
          {/*Displays the Drivers that are available
           along with a submit selection Button to assign Driver to the order
           on each row*/}
          {drivers &&
            drivers.map((driver) => {
              return (
                <tr>
                  <td>{driver.first_name.toUpperCase()}</td>
                  <td>{driver.last_name.toUpperCase()}</td>
                  <td>{driver._role.toUpperCase()}</td>
                  <td>
                    <button
                      onClick={() => handleDriverSubmit(driver.id)}
                      key={driver.id}
                      className="btn btn-primary"
                    >
                      Submit Driver
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default DriverUpdate;
