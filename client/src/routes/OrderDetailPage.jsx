import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { OrderContext } from "../context/OrderContext";
import Baseurl from "../apis/Baseurl";

const OrderDetailPage = () => {
  const { id } = useParams();
  const { selectedOrder, setSelectedOrder } = useContext(OrderContext);

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

  return (
    <div>
      {/*Check first to see if selectedOrder is true or exists , 
      Then the element after ,selectedOrder.order, will then appear in the output,
      if flase or if it doesn't exist, react will ignore and skip the selected option*/}
      {selectedOrder && (
        <>
          <h1 className="display text-decoration-underline pt-3">
            <u>Order #{selectedOrder.order.id} Details</u>
          </h1>
          {/*LIst/Table to show the Details of the Chosen Order */}
          <ul class="list-group w-50 pb-3">
            <li class="list-group-item d-flex justify-content-between align-items-center bg-info">
              Customer Name:
              <span class="badge  badge-pill">
                {selectedOrder.order.customer_name.toUpperCase()}
              </span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center bg-secondary text-white">
              Address:
              <span class="badge badge-secondary badge-pill">
                {selectedOrder.order.address.toUpperCase()}
              </span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center bg-info">
              Yards
              <span class="badge badge-pill">{selectedOrder.order.yards}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center bg-secondary text-white">
              PSI
              <span class="badge badge-secondary badge-pill">
                {selectedOrder.order.psi}
              </span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center bg-info">
              Stone:
              <span class="badge badge-pill">
                {selectedOrder.order.stone.toUpperCase()}
              </span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center bg-secondary text-white">
              Accelerator
              <span class="badge badge-secondary badge-pill">
                {selectedOrder.order.accelerator}
              </span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center bg-info">
              Retarder
              <span class="badge badge-pill">
                {selectedOrder.order.retarder}
              </span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center bg-secondary text-white">
              Slump
              <span class="badge badge-secondary badge-pill">
                {selectedOrder.order.slump}
              </span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center bg-info">
              Unload Method
              <span class="badge badge-pill">
                {selectedOrder.order.unload_method.toUpperCase()}
              </span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center bg-secondary text-white">
              Special Instructions
              <span class="badge badge-secondary badge-pill">
                {selectedOrder.order.special_in === null
                  ? "N/A"
                  : selectedOrder.order.special_in}
              </span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center bg-info">
              Status
              <span class="badge badge-pill">
                {selectedOrder.order.status.toUpperCase()}
              </span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center bg-secondary text-white">
              Driver_ID
              <span class="badge badge-secondary badge-pill">
                {selectedOrder.order.driver_id === null
                  ? "N/A"
                  : selectedOrder.order.driver_id}
              </span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center bg-info">
              Customer ID
              <span class="badge badge-pill">
                {selectedOrder.order.customer_id}
              </span>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default OrderDetailPage;
