import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./AdminAnalytics.css";

function AdminAnalytics({ setPage }) {
  const [sales, setSales] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/admin/analytics/sales",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSales(res.data);
      setError("");
    } catch (err) {
      console.error("Analytics error:", err);
      setError("Failed to load analytics (backend error)");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const chartData = {
    labels: ["Today", "This Week", "This Month"],
    datasets: [
      {
        label: "Sales ₹",
        data: [
          sales?.today || 0,
          sales?.week || 0,
          sales?.month || 0,
        ],
        backgroundColor: "#f0c14b",
      },
    ],
  };

  return (
    <div className="analytics-page">
      {/* ✅ BACK BUTTON — FIXED */}
      <button className="back-btn" onClick={() => setPage("products")}>
        ← Back to Products
      </button>

      <h2>📊 Sales Analytics</h2>

      {/* ✅ LOADING STATE */}
      {loading && <p>Loading analytics...</p>}

      {/* ✅ ERROR STATE (NO CRASH) */}
      {error && <p className="error-text">{error}</p>}

      {/* ✅ CHART SAFE RENDER */}
      {!loading && !error && <Bar data={chartData} />}
    </div>
  );
}

export default AdminAnalytics;





