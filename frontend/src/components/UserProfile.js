function UserProfile({ goBack, goToOrders, goToAddresses, goToPayments }) {
  return (
    <div className="profile-page">
      <h2>Your Account</h2>

      <div className="profile-grid">
        {/* ORDERS */}
        <div className="profile-card" onClick={goToOrders}>
          <h3>Your Orders</h3>
          <p>Track, return, or buy things again</p>
        </div>

        {/* ADDRESSES */}
        <div className="profile-card" onClick={goToAddresses}>
          <h3>Your Addresses</h3>
          <p>Edit addresses for orders and gifts</p>
        </div>

        {/* PAYMENTS */}
        <div className="profile-card" onClick={goToPayments}>
          <h3>Payment options</h3>
          <p>Edit or add payment methods</p>
        </div>

        {/* LOGIN & SECURITY (optional) */}
        <div className="profile-card disabled">
          <h3>Login & Security</h3>
          <p>Edit login, name, and mobile number</p>
        </div>
      </div>

      <button className="back-btn" onClick={goBack}>
        ← Back to Products
      </button>
    </div>
  );
}

export default UserProfile;






