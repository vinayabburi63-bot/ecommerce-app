import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OrderHistory.css";

function OrderHistory({ setPage }) {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setOrders(res.data))
      .catch(() => alert("Failed to load orders"));
  }, [token]);

  return (
    <div className="orders-page">
      {/* ✅ FIXED BACK BUTTON */}
      <button className="back-btn" onClick={() => setPage("products")}>
        ← Back to Products
      </button>

      <h2>Your Orders</h2>

      {orders.length === 0 && (
        <p className="no-orders">You haven’t placed any orders yet.</p>
      )}

      {orders.map(order => (
        <div className="order-card" key={order._id}>
          {/* ORDER HEADER */}
          <div className="order-header">
            <div>
              <small>ORDER PLACED</small>
              <p>{new Date(order.createdAt).toDateString()}</p>
            </div>

            <div>
              <small>TOTAL</small>
              <p>₹{order.totalAmount}</p>
            </div>

            <div>
              <small>STATUS</small>
              <span className={`status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>

            <div>
              <small>ORDER #</small>
              <p>{order._id.slice(-6)}</p>
            </div>
          </div>

          {/* ORDER ITEMS */}
          <div className="order-items">
            {order.items.map((item, idx) => (
              <div className="order-item" key={idx}>
                <img src={item.image} alt={item.name} />
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>Qty: {item.qty}</p>
                  <p className="price">₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ORDER ACTIONS */}
          <div className="order-actions">
            <button className="action-btn">Buy again</button>

            <button
              className="action-btn secondary"
              onClick={() =>
                window.open(
                  `http://localhost:5000/api/orders/${order._id}`,
                  "_blank"
                )
              }
            >
              Download Invoice
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderHistory;














