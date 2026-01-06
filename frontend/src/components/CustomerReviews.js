import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaCheckCircle } from "react-icons/fa";
import "./CustomerReviews.css";

function CustomerReviews({ productId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/reviews/${productId}`)
      .then(res => setReviews(res.data));
  }, [productId]);

  return (
    <div className="reviews-section">
      <h2>Customer reviews</h2>

      {reviews.length === 0 && (
        <p>No reviews yet</p>
      )}

      {reviews.map(review => (
        <div className="review-card" key={review._id}>
          {/* ⭐ STARS */}
          <div className="review-stars">
            {[...Array(review.rating)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>

          {/* USER */}
          <p className="review-user">
            {review.userName}
          </p>

          {/* ✅ VERIFIED PURCHASE */}
          {review.verified && (
            <p className="verified">
              <FaCheckCircle /> Verified Purchase
            </p>
          )}

          {/* COMMENT */}
          <p className="review-comment">
            {review.comment}
          </p>

          <small className="review-date">
            Reviewed on{" "}
            {new Date(review.createdAt).toDateString()}
          </small>
        </div>
      ))}
    </div>
  );
}

export default CustomerReviews;


