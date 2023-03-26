import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Baseurl from "../apis/Baseurl";
import { OrderContext } from "../context/OrderContext";
import { GrUserNew } from "react-icons/gr";

const CustomerDetailPage = () => {
  const { id } = useParams();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const { orders, setOrders } = useContext(OrderContext);
  const [name, setName] = useState(null);
  let navigate = useNavigate();
  //This use effect will fetch the customer with the given id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Baseurl.get(`/users/customers/${id}`);
        setSelectedCustomer(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  //This use effect will fetch the orders that have been ordered by the customer
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Baseurl.get(`/orders/customer/${id}`);
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
  //This Allows us to Navigate to the New Order Form Page
  const handleNewOrder = (id, firstname, lastname) => {
    navigate(`/customer/newOrder/${id}/${firstname}/${lastname}`);
  };
  return (
    <div>
      <h1 className="display text-decoration-underline">
        <u>Driver Information</u>
      </h1>
      {selectedCustomer && (
        <>
          {/*LIst/Table to show the Details of the Chosen Customer */}
          <ul className="list-group w-25 pb-3">
            <li className="list-group-item d-flex justify-content-between align-items-center bg-info">
              Customer First Name:
              <span className="badge  badge-pill">
                {selectedCustomer.user.first_name.toUpperCase()}
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center bg-secondary text-white">
              Customer Last Name:
              <span className="badge badge-secondary badge-pill">
                {selectedCustomer.user.last_name.toUpperCase()}
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center bg-info">
              ID
              <span className="badge badge-pill">
                {selectedCustomer.user.id}
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center bg-secondary text-white">
              Customer UserName:
              <span className="badge badge-secondary badge-pill">
                {selectedCustomer.user.username}
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
                </tr>
              );
            })}
        </tbody>
      </table>

      <button
        onClick={() =>
          handleNewOrder(
            selectedCustomer.user.id,
            selectedCustomer.user.first_name,
            selectedCustomer.user.last_name
          )
        }
        type="button"
        className="btn-lg btn-dark btn-outline-info"
      >
        <GrUserNew />
        Create New Order
      </button>
    </div>
  );
};
export default CustomerDetailPage;
