import React, { useEffect, useState, useCallback } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import api from "../api/axios";
import "./AdminAnalytics.css";

function AdminAnalytics() {
  const [sales, setSales] = useState(null);
  const [products, setProducts] = useState({});
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  /* ✅ MEMOIZED FUNCTION */
  const loadData = useCallback(async () => {
    try {
      const s = await api.get("/api/admin/analytics/sales", {
        params: { from, to },
      });
      const p = await api.get("/api/admin/analytics/products");

      setSales(s.data);
      setProducts(p.data);
    } catch {
      alert("Failed to load analytics");
    }
  }, [from, to]);

  /* ✅ NO ESLINT WARNING */
  useEffect(() => {
    loadData();
  }, [loadData]);

  if (!sales) return <h3>Loading analytics...</h3>;

  return (
    <div className="analytics-page">
      <h2>📊 Seller Analytics</h2>

      {/* DATE FILTER */}
      <div className="filter">
        <input
          type="date"
          value={from}
          onChange={e => setFrom(e.target.value)}
        />
        <input
          type="date"
          value={to}
          onChange={e => setTo(e.target.value)}
        />
        <button onClick={loadData}>Apply</button>
      </div>

      {/* PROFIT vs REVENUE */}
      <Bar
        data={{
          labels: ["Revenue", "Profit"],
          datasets: [
            {
              label: "₹ Amount",
              data: [sales.revenue, sales.profit],
              backgroundColor: ["#f0c14b", "#4caf50"],
            },
          ],
        }}
      />

      {/* ORDERS PER PRODUCT */}
      <Doughnut
        data={{
          labels: Object.keys(products),
          datasets: [
            {
              data: Object.values(products),
              backgroundColor: [
                "#f0c14b",
                "#ff9800",
                "#4caf50",
                "#2196f3",
              ],
            },
          ],
        }}
      />

      {/* CSV DOWNLOAD */}
      <button
        className="download-btn"
        onClick={() =>
          window.open(
            "http://localhost:5000/api/admin/analytics/export/csv",
            "_blank"
          )
        }
      >
        📥 Download CSV
      </button>
    </div>
  );
}

export default AdminAnalytics;

