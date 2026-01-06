import React, { useEffect, useState } from "react";
import api from "../api/axios";

function AdminOrders({ setPage }) {
  const [orders, setOrders] = useState([]);

  const load = async () => {
    const res = await api.get("/api/orders/admin/all");
    setOrders(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="admin-dashboard">
      <button onClick={() => setPage("products")}>← Back</button>
      <h2>Seller Dashboard</h2>

      {orders.map(o => (
        <div key={o._id} className="admin-order-card">
          <p><b>ID:</b> {o._id}</p>
          <p><b>User:</b> {o.user?.email}</p>
          <p><b>Total:</b> ₹{o.totalAmount}</p>
          <p><b>Status:</b> {o.status}</p>
        </div>
      ))}
    </div>
  );
}

export default AdminOrders;













