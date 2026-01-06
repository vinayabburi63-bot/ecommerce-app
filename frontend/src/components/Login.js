import React, { useState } from "react";
import axios from "axios";
import "../Auth.css";

function Login({ onLogin, goToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password }
      );

      // ✅ SAVE JWT TOKEN
      localStorage.setItem("token", res.data.token);

      // ✅ SET USER
      onLogin(res.data.user);
    } catch (err) {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Sign in</h2>

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="auth-btn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <p style={{ marginTop: "10px", fontSize: "13px" }}>
          New user?{" "}
          <span
            className="auth-link"
            style={{ color: "#0066c0", cursor: "pointer" }}
            onClick={goToSignup}
          >
            Create your account
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;


