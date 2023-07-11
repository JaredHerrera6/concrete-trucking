import React, { useEffect } from "react";
import { useContext } from "react";
import Baseurl from "../apis/Baseurl";
import { OrderContext } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";

const ManagerOrderList = (props) => {
  const { orders, setOrders } = useContext(OrderContext);
  let navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        //Baseurl is already an axios const, exports the base Url from Baseurl.js
        const response = await Baseurl.get("/orders");
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

  //This Allows us to navigate to update the driver of the Selected Order
  const handleOrderUpdateSelect = (id) => {
    navigate(`/manager/updateDriver/${id}`);
  };
  return (
    <div>
      <h1 className="mt-4 text-primary">Orders</h1>
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
                      Assign Driver
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
export default ManagerOrderList;
