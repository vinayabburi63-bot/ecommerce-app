import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import "./RatingBreakdown.css";

function RatingBreakdown({ productId, avgRating, reviewCount }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/reviews/${productId}/breakdown`)
      .then(res => setData(res.data))
      .catch(() => console.log("Failed to load breakdown"));
  }, [productId]);

  if (!data || data.total === 0) {
    return <p>No customer ratings yet</p>;
  }

  const percent = (count) =>
    Math.round((count / data.total) * 100);

  return (
    <div className="amazon-rating-box">
      <h3>Customer ratings</h3>

      {/* AVG RATING */}
      <div className="avg-row">
        <span className="avg-number">{avgRating}</span>

        <div className="avg-stars">
          {[1,2,3,4,5].map(i => (
            <FaStar
              key={i}
              className={i <= Math.round(avgRating) ? "star filled" : "star"}
            />
          ))}
        </div>
      </div>

      <p className="total-ratings">
        {reviewCount} global ratings
      </p>

      {/* BREAKDOWN */}
      {[5,4,3,2,1].map(star => (
        <div className="break-row" key={star}>
          <span className="label">{star} star</span>

          <div className="bar">
            <div
              className="fill"
              style={{ width: `${percent(data[star])}%` }}
            />
          </div>

          <span className="percent">
            {percent(data[star])}%
          </span>
        </div>
      ))}
    </div>
  );
}

export default RatingBreakdown;
