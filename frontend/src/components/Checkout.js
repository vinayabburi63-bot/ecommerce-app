import React, { useEffect, useState } from "react";
import api from "../api/axios";

function Checkout({ cartItems, goBack }) {
  const [addresses, setAddresses] = useState([]);
  const [selected, setSelected] = useState(null);

  const totalAmount = cartItems.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  useEffect(() => {
    api.get("/api/addresses").then(res => {
      setAddresses(res.data);
      setSelected(res.data.find(a => a.isDefault));
    });
  }, []);

  const placeOrder = async () => {
    const { data: razor } = await api.post("/api/payments/create", {
      amount: totalAmount,
    });

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: razor.amount,
      currency: "INR",
      order_id: razor.id,
      handler: async (res) => {
        await api.post("/api/payments/verify", res);

        const { data: order } = await api.post(
          "/api/orders/place-after-payment",
          {
            items: cartItems,
            totalAmount,
            address: selected,
            paymentId: res.razorpay_payment_id,
          }
        );

        window.location.href = `/order-success/${order._id}`;
      },
    };

    new window.Razorpay(options).open();
  };

  return (
    <div>
      <h2>Select Delivery Address</h2>

      {addresses.map(a => (
        <div key={a._id} className="address-card">
          <input
            type="radio"
            checked={selected?._id === a._id}
            onChange={() => setSelected(a)}
          />
          <strong>{a.name}</strong>
          <p>{a.address}</p>
          <p>{a.city}, {a.state} - {a.pincode}</p>
          <button onClick={() => setSelected(a)}>
            Deliver to this address
          </button>
        </div>
      ))}

      <h3>Total: ₹{totalAmount}</h3>
      <button onClick={placeOrder}>Pay & Place Order</button>
      <button onClick={goBack}>Back</button>
    </div>
  );
}

export default Checkout;




