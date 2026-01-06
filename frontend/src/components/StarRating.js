import React from "react";
import "./StarRating.css";

function StarRating({ rating, setRating }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map(num => (
        <span
          key={num}
          className={num <= rating ? "star filled" : "star"}
          onClick={() => setRating(num)}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default StarRating;

