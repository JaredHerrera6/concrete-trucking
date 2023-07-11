import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Baseurl from "../apis/Baseurl";
import { OrderContext } from "../context/OrderContext";

const DriverDetailPage = () => {
  const { id } = useParams();
  const [selectedDriver, setSelectedDriver] = useState(null);
  const { orders, setOrders } = useContext(OrderContext);
  let navigate = useNavigate();
  //This use effect will fetch the driver of the id given/provided
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Baseurl.get(`/users/${id}`);
        console.log(response);
        setSelectedDriver(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  //This use Effect will get the orders assigned to the driver
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Baseurl.get(`/orders/driver/${id}`);
        setOrders(response.data.data.orders);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  //This Allows us to navigate to the selected Order
  const handleOrderSelect = (id) => {
    navigate(`/orders/${id}`);
  };

  //This allows us to Navigate to update the Status of the Selected Order
  const handleOrderUpdateSelect = (id) => {
    navigate(`/driver/updateStatus/${id}`);
  };
  return (
    <div>
      <h1 className="display text-decoration-underline">
        <u>Driver Information</u>
      </h1>
      {selectedDriver && (
        <>
          {/*LIst/Table to show the Details of the Chosen Customer */}
          <ul className="list-group w-25 pb-3">
            <li className="list-group-item d-flex justify-content-between align-items-center bg-info">
              Driver First Name:
              <span className="badge  badge-pill">
                {selectedDriver.user.first_name.toUpperCase()}
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center bg-secondary text-white">
              Driver Last Name:
              <span className="badge badge-secondary badge-pill">
                {selectedDriver.user.last_name.toUpperCase()}
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center bg-info">
              ID
              <span className="badge badge-pill">{selectedDriver.user.id}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center bg-secondary text-white">
              Driver UserName:
              <span className="badge badge-secondary badge-pill">
                {selectedDriver.user.username}
              </span>
            </li>
          </ul>
        </>
      )}
      <table className="table table-striped table-dark rounded">
        <thead className="text-primary">
          <tr>
            <th scope="col">Customer</th>
            <th scope="col">Address</th>
            <th scope="col">Yards</th>
            <th scope="col">Status</th>
            <th scope="col">Driver</th>
            <th scope="col">Details</th>
            <th scope="col">Updates</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => {
              return (
                <tr key={order.id}>
                  <td>{order.customer_name}</td>
                  <td>{order.address}</td>
                  <td>{order.yards}</td>
                  <td>{order.status}</td>
                  <td>{order.driver_id}</td>
                  <td>
                    <button
                      onClick={() => handleOrderSelect(order.id)}
                      key={order.id}
                      className="btn btn-primary "
                    >
                      View Order
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleOrderUpdateSelect(order.id)}
                      key={order.id}
                      className="btn btn-primary"
                    >
                      Update Status
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
export default DriverDetailPage;
