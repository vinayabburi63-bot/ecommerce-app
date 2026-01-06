import React, { useState } from "react";
import "./PaymentManager.css";

function PaymentManager({ setPage }) {
  const [method, setMethod] = useState("COD");

  return (
    <div className="payment-page">
      <h2>Payment Method</h2>

      <div className="payment-box">
        <label>
          <input
            type="radio"
            checked={method === "CARD"}
            onChange={() => setMethod("CARD")}
          />
          <b> Credit / Debit Card</b>
          <p>Visa, Mastercard, RuPay, Amex</p>
        </label>

        <label>
          <input
            type="radio"
            checked={method === "UPI"}
            onChange={() => setMethod("UPI")}
          />
          <b> UPI</b>
          <p>Google Pay, PhonePe, Paytm</p>
        </label>

        <label>
          <input
            type="radio"
            checked={method === "NET"}
            onChange={() => setMethod("NET")}
          />
          <b> Net Banking</b>
          <p>All major banks supported</p>
        </label>

        <label className="cod">
          <input
            type="radio"
            checked={method === "COD"}
            onChange={() => setMethod("COD")}
          />
          <b> Cash on Delivery</b>
          <p>Pay when item is delivered</p>
        </label>
      </div>

      <div className="payment-actions">
        <button className="save-btn">Save Payment Method</button>

        {/* ✅ FIXED BACK BUTTON */}
        <button className="back-btn" onClick={() => setPage("products")}>
          ← Back
        </button>
      </div>
    </div>
  );
}

export default PaymentManager;






