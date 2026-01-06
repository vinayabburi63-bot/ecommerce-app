import React from "react";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaTruck,
  FaUndo,
  FaAward
} from "react-icons/fa";

import "./ProductDetails.css";
import CustomerReviews from "./CustomerReviews";
import RatingBreakdown from "./RatingBreakdown";

function ProductDetails({ product, addToCart, buyNow, goBack }) {
  // 🔢 Ratings (fallback safe)
  const rating = product.avgRating || product.rating || 4.2;
  const reviewsCount = product.reviewCount || product.reviews || 0;

  /* ⭐ Render stars */
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) stars.push(<FaStar key={i} />);
      else if (rating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} />);
      else stars.push(<FaRegStar key={i} />);
    }
    return stars;
  };

  /* 💰 Pricing */
  const mrp = product.mrp || product.price + 1200;
  const discount = Math.round(((mrp - product.price) / mrp) * 100);

  return (
    <div className="product-page">
      <button className="back-btn" onClick={goBack}>
        ← Back
      </button>

      <div className="product-layout">
        {/* LEFT IMAGE */}
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>

        {/* MIDDLE DETAILS */}
        <div className="product-info">
          <p className="brand">
            Visit the {product.brand || "Brand"} Store
          </p>

          <h1>{product.name}</h1>

          {/* ⭐ RATING ROW */}
          <div className="rating-row">
            <span className="stars">{renderStars()}</span>
            <span className="rating-text">
              {rating.toFixed(1)} ({reviewsCount.toLocaleString()})
            </span>
          </div>

          <hr />

          {/* PRICE */}
          <div className="price-section">
            <span className="discount">-{discount}%</span>
            <span className="price">₹{product.price}</span>
          </div>

          <p className="mrp">
            M.R.P.: <span>₹{mrp}</span>
          </p>

          <p className="tax">Inclusive of all taxes</p>

          <p className="emi">
            EMI starts at ₹112. No Cost EMI available
          </p>

          {/* OFFERS */}
          <div className="offers">
            <div className="offer-card">
              <strong>Cashback</strong>
              <p>Upto ₹95.00 cashback on Amazon Pay</p>
            </div>
            <div className="offer-card">
              <strong>No Cost EMI</strong>
              <p>Upto ₹83.34 EMI interest savings</p>
            </div>
          </div>

          {/* ICON ROW */}
          <div className="icon-row">
            <div>
              <FaUndo />
              <p>10 Days Return</p>
            </div>
            <div>
              <FaTruck />
              <p>Free Delivery</p>
            </div>
            <div>
              <FaAward />
              <p>Top Brand</p>
            </div>
          </div>
        </div>

        {/* RIGHT BUY BOX */}
        <div className="buy-box">
          <p className="buy-price">₹{product.price}</p>
          <p className="stock">In stock</p>

          <button
            className="buy-now"
            onClick={() => buyNow(product)}
          >
            Buy Now
          </button>

          <button
            className="add-cart"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>

          <p className="secure">🔒 Secure transaction</p>
        </div>
      </div>

      {/* ================= RATING BREAKDOWN ================= */}
      <RatingBreakdown
        productId={product._id}
        avgRating={rating.toFixed(1)}
        reviewCount={reviewsCount}
      />

      {/* ================= CUSTOMER REVIEWS ================= */}
      <CustomerReviews productId={product._id} />
    </div>
  );
}

export default ProductDetails;



