import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddressManager.css";

function AddressManager({ setPage }) {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const loadAddresses = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/addresses",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAddresses(res.data || []);
    } catch (err) {
      console.error("Failed to load addresses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const setDefault = async (id) => {
    await axios.patch(
      `http://localhost:5000/api/addresses/${id}/default`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    loadAddresses();
  };

  const deleteAddress = async (id) => {
    if (!window.confirm("Delete this address?")) return;

    await axios.delete(
      `http://localhost:5000/api/addresses/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    loadAddresses();
  };

  return (
    <div className="address-page">
      {/* HEADER */}
      <div className="address-header">
        <h2>Your Addresses</h2>
        <button
          className="back-btn"
          onClick={() => setPage("products")}
        >
          ← Back
        </button>
      </div>

      {/* ADD ADDRESS */}
      <button
        className="add-address-btn"
        onClick={() => setPage("addAddress")}
      >
        + Add Address
      </button>

      {/* ADDRESS LIST */}
      {loading ? (
        <p>Loading addresses...</p>
      ) : addresses.length === 0 ? (
        <p>No addresses added yet.</p>
      ) : (
        <div className="address-grid">
          {addresses.map(addr => (
            <div
              key={addr._id}
              className={`address-card ${
                addr.isDefault ? "default" : ""
              }`}
            >
              {addr.isDefault && (
                <span className="default-badge">Default</span>
              )}

              <p className="name">{addr.name}</p>

              <p>
                {addr.address}, {addr.city}
              </p>
              <p>
                {addr.state} - {addr.pincode}
              </p>

              <p className="phone">📞 {addr.phone}</p>

              <div className="address-actions">
                <button
                  onClick={() =>
                    setPage({ page: "editAddress", data: addr })
                  }
                >
                  Edit
                </button>

                {!addr.isDefault && (
                  <button
                    onClick={() => setDefault(addr._id)}
                  >
                    Set Default
                  </button>
                )}

                <button
                  className="danger"
                  onClick={() => deleteAddress(addr._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AddressManager;











