import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Baseurl from "../apis/Baseurl";
import { OrderContext } from "../context/OrderContext";

const StatusUpdate = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const { selectedOrder, setSelectedOrder } = useContext(OrderContext);
  const [status, setStatus] = useState("");
  //useEffect to get the chosen order using the 'id' passed on in the url Parameters
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

  //This allows us to assign the new Status of the intended Order
  const handleStatusSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Baseurl.put(`/order/status/${id}`, {
        status: status,
      });
      alert(`Order #${id} status changed to ${status}`);
      navigate("/users/drivers");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    //Page Header That displays the current status of the Chosen order ID number
    <div>
      {selectedOrder && (
        <>
          <h1 className="text-center display-4">
            {/* Displays the Current Order Status and the order Number(ID)*/}
            Order <u>#{selectedOrder.order.id}</u> is currently{" "}
            <u>{selectedOrder.order.status}</u>
          </h1>
          <h1 className="display text-decoration-underline pt-3">
            <u>Update Order</u>
          </h1>
          {/*Input Select Option/Form to slect the new or intended order status*/}
          <form>
            <h2>
              <select
                class="form-select form-select-lg "
                aria-label=".form-select-lg example "
                data-style="btn-info"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                id="selectstatus"
                required
              >
                <option value="Delivered">Delivered</option>
                <option value="In Route">In Route</option>
                <option value="Ordered">Ordered</option>
              </select>
            </h2>
            <button
              //Button goes straight to the handleSubmit Function, nothing is passed through
              onClick={handleStatusSubmit}
              type="submit"
              class="btn btn-primary"
            >
              Submit Order Status
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default StatusUpdate;
