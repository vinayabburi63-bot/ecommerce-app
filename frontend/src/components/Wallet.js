function Wallet({ setPage }) {
  return (
    <div className="wallet-page">
      <h2>Your Wallet</h2>

      <p>Balance: ₹0</p>

      <button onClick={() => setPage("products")}>
        ← Back
      </button>
    </div>
  );
}

export default Wallet;



