import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

function OrderSuccess() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/api/orders/${id}`)
      .then((res) => setOrder(res.data))
      .catch(() => alert("Unauthorized"));
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/orders");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  if (!order) return <h3>Loading...</h3>;

  return (
    <div>
      <h1>✅ Order Successful</h1>
      <p>Order ID: {order._id}</p>
      <p>Total: ₹{order.totalAmount}</p>
      <p>Status: {order.status}</p>
      <p>Payment: {order.paymentStatus}</p>
      <p>Redirecting to orders page...</p>
    </div>
  );
}

export default OrderSuccess;


