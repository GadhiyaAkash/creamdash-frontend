import React from "react";
import PropTypes from "prop-types";
import starFilledImage from "../../../assets/star-filled.png";
import starBlankImage from "../../../assets/star-blank.png";
import "./StarRating.scss";

// Star Rating Component
const StarRating = ({ rating, size = "20px", reviews = 0 }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars.push(
                <img
                    key={i}
                    src={starFilledImage}
                    alt="filled star"
                    style={{ width: size, height: size }}
                />
            );
        } else if (i === fullStars && hasHalfStar) {
            stars.push(
                <img
                    key={i}
                    src={starFilledImage}
                    alt="half star"
                    style={{ width: size, height: size, opacity: 0.5 }}
                />
            );
        } else {
            stars.push(
                <img
                    key={i}
                    src={starBlankImage}
                    alt="empty star"
                    style={{ width: size, height: size }}
                />
            );
        }
    }

    return (
        <div className="rating-section">
            <div className="star-rating d-flex align-items-center gap-1">{stars}</div>
            <span className="rating-text ms-2">
                {rating} ({reviews} reviews)
            </span>
        </div>
    );
};

StarRating.propTypes = {
    rating: PropTypes.number.isRequired,
    size: PropTypes.string,
    reviews: PropTypes.number
};

export default StarRating;