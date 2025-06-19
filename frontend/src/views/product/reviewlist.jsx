import React, { useState } from "react";
import "./listReview.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const ReviewList = ({ reviews }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!reviews || reviews.length === 0) {
    return <p>Chưa có đánh giá nào.</p>;
  }

  const images = reviews
    .map(r => r.imageUrl)
    .filter(url => url);

  return (
    <div className="review-list">
      <h3 className="review-title">Đánh Giá ({reviews.length})</h3>
      {reviews.map((r, i) => (
        <div key={r.id} className="single-review">
          <div className="review-header">
            <div className="avatar">
              {r.name ? r.name.charAt(0).toUpperCase() : "K"}
            </div>
            <div className="review-meta">
              <div className="review-author">
                {r.name || "Khách"} -{" "}
                <span className="review-stars">
                  {Array(r.rating).fill("⭐").join("")} ({r.rating}/5)
                </span>
              </div>
              <div className="review-title-text">{r.title}</div>
            </div>
          </div>

          <p className="review-comment">{r.comment}</p>

          {r.imageUrl && (
            <img
              src={r.imageUrl}
              alt="Ảnh đánh giá"
              className="review-image"
              style={{ cursor: "pointer" }}
              onClick={() => {
                const imgIndex = images.indexOf(r.imageUrl);
                setIndex(imgIndex);
                setOpen(true);
              }}
            />
          )}
        </div>
      ))}

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={images.map((url) => ({ src: url }))}
        index={index}
      // Các props khác nếu muốn tuỳ chỉnh
      />
    </div>
  );
};

export default ReviewList;