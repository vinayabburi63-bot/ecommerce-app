import axios from "axios";

function RazorpayButton({ amount, onSuccess }) {
  const token = localStorage.getItem("token");

  const payNow = async () => {
    try {
      // 1️⃣ Create order on backend
      const { data } = await axios.post(
        "http://localhost:5000/api/payments/create-order",
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 2️⃣ Razorpay options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        amount: data.amount,
        currency: "INR",
        name: "MyStore",
        description: "Order Payment",
        order_id: data.id,

        handler: async function (response) {
          try {
            // 3️⃣ VERIFY PAYMENT (IMPORTANT)
            const verifyRes = await axios.post(
              "http://localhost:5000/api/payments/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            // 4️⃣ Only if verified
            if (verifyRes.data.success) {
              onSuccess(response); // place order here
            } else {
              alert("Payment verification failed");
            }
          } catch {
            alert("Payment verification error");
          }
        },

        theme: { color: "#f0c14b" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      alert("Payment initiation failed");
    }
  };

  return (
    <button className="place-btn" onClick={payNow}>
      Pay ₹{amount}
    </button>
  );
}

export default RazorpayButton;

