import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/api/orders/${id}`)
      .then(res => setOrder(res.data))
      .catch(() => alert("Unauthorized"));
  }, [id]);

  if (!order) return <h3>Loading...</h3>;

  return (
    <div style={{ padding: 30 }}>
      <h1>✅ Order Successful</h1>
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Total:</strong> ₹{order.totalAmount}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Payment:</strong> {order.paymentStatus}</p>
    </div>
  );
}

export default OrderSuccess;
