import React, { useState } from "react";
import api from "../api/axios";
import "./AddressModal.css";

function AddressModal({ onClose, onSaved, existing }) {
  /* ================= INITIAL STATE ================= */
  const [form, setForm] = useState(
    existing || {
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      isDefault: true,
    }
  );

  const [error, setError] = useState({});

  /* ================= PINCODE AUTO FILL ================= */
  const fetchPincode = async (pin) => {
    if (pin.length !== 6) return;

    try {
      const res = await fetch(
        `https://api.postalpincode.in/pincode/${pin}`
      );
      const data = await res.json();

      if (data[0].Status === "Success") {
        setForm((f) => ({
          ...f,
          city: data[0].PostOffice[0].District,
          state: data[0].PostOffice[0].State,
        }));
      }
    } catch {}
  };

  /* ================= VALIDATION ================= */
  const validate = () => {
    const err = {};
    if (!/^[6-9]\d{9}$/.test(form.phone)) err.phone = "Invalid phone number";
    if (!/^\d{6}$/.test(form.pincode)) err.pincode = "Invalid pincode";
    setError(err);
    return Object.keys(err).length === 0;
  };

  /* ================= SAVE ADDRESS ================= */
  const saveAddress = async () => {
    if (!validate()) return;

    try {
      if (existing) {
        // ✏️ EDIT
        await api.put(`/api/addresses/${existing._id}`, form);
      } else {
        // ➕ ADD
        await api.post("/api/addresses", form);
      }

      onSaved();
      onClose();
    } catch {
      alert("Failed to save address ❌");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{existing ? "Edit Address" : "Add New Address"}</h3>

        {/* NAME */}
        <input
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* PHONE */}
        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        {error.phone && <span className="err">{error.phone}</span>}

        {/* ADDRESS */}
        <input
          placeholder="Flat / Street / Area"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        {/* PINCODE */}
        <input
          placeholder="Pincode"
          value={form.pincode}
          onChange={(e) => {
            setForm({ ...form, pincode: e.target.value });
            fetchPincode(e.target.value);
          }}
        />
        {error.pincode && <span className="err">{error.pincode}</span>}

        {/* CITY + STATE */}
        <input placeholder="City" value={form.city} readOnly />
        <input placeholder="State" value={form.state} readOnly />

        {/* DEFAULT */}
        <label className="default-check">
          <input
            type="checkbox"
            checked={form.isDefault}
            onChange={(e) =>
              setForm({ ...form, isDefault: e.target.checked })
            }
          />
          Make default address
        </label>

        {/* ACTIONS */}
        <div className="modal-actions">
          <button className="save-btn" onClick={saveAddress}>
            {existing ? "Update Address" : "Save & Deliver Here"}
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default AddressModal;



