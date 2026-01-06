import React, { useState } from "react";
import axios from "axios";
import "../Auth.css";

function Signup({ onSignup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/users/register",
        { name, email, password }
      );

      alert("Account created successfully ✅");
      onSignup(); // go to login
    } catch (err) {
      alert("Signup failed. Email may already exist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create account</h2>

        <label>Your name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="auth-btn"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create your Amazon account"}
        </button>

        <p style={{ fontSize: "12px", marginTop: "10px" }}>
          Already have an account?{" "}
          <span className="auth-link" onClick={onSignup}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
