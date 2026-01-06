import React, { useState } from "react";
import { FaStar, FaCamera } from "react-icons/fa";
import "./WriteReview.css";

function WriteReview({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map(file => URL.createObjectURL(file));
    setImages([...images, ...previews]);
  };

  const handleSubmit = () => {
    if (!rating || !comment) {
      alert("Please give rating and write a review");
      return;
    }

    onSubmit({
      user: "Verified Buyer",
      rating,
      title: title || "Customer Review",
      comment,
      images,
      date: new Date().toLocaleDateString(),
    });

    setRating(0);
    setTitle("");
    setComment("");
    setImages([]);
  };

  return (
    <div className="write-review">
      <h3>Write a review</h3>

      {/* STAR RATING */}
      <div className="star-input">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            size={22}
            className={star <= (hover || rating) ? "star active" : "star"}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          />
        ))}
      </div>

      <input
        type="text"
        placeholder="Review title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Write your review here"
        rows="4"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      {/* IMAGE UPLOAD */}
      <label className="upload-btn">
        <FaCamera /> Add photos
        <input
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={handleImageUpload}
        />
      </label>

      {/* IMAGE PREVIEW */}
      <div className="review-images-preview">
        {images.map((img, i) => (
          <img key={i} src={img} alt="review" />
        ))}
      </div>

      <button onClick={handleSubmit}>
        Submit Review
      </button>
    </div>
  );
}

export default WriteReview;

