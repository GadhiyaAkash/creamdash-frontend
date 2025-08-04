import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Card, Button, Badge, Spinner } from "react-bootstrap";
import StarRating from "../start-rating/StarRating";
import "./ProductCard.scss";

// Product Card Component
const ProductCard = ({ product, onAddToCart, onQuantityChange, productQuantities, isLoading, variant = "default" }) => {
    const quantity = productQuantities[product.id] || 0;

    const handleQuantityChange = useCallback((newQuantity) => {
        if (newQuantity >= 0) {
            onQuantityChange(product.id, newQuantity);
        }
    }, [product.id, onQuantityChange]);

    const handleAddToCart = useCallback(() => {
        const productWithQuantity = {
            ...product,
            quantity: Math.max(1, quantity)
        };
        onAddToCart(productWithQuantity);
    }, [product, quantity, onAddToCart]);

    return (
        <Card className="shopping-product-card h-100 shadow-sm">
            <div className="card-image-container">
                <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                />
                {product.isPopular && (
                    <Badge bg="danger" className="popular-badge">
                        Popular
                    </Badge>
                )}
                {product.discount && (
                    <Badge bg="success" className="discount-badge">
                        {product.discount}% OFF
                    </Badge>
                )}
            </div>

            <Card.Body className="d-flex flex-column">
                <div className="product-header mb-2">
                    <Card.Title className="product-title">{product.name}</Card.Title>
                    <StarRating rating={product.rating} reviews={product.reviews} size="16px" />
                </div>

                <Card.Text className="product-description text-muted">
                    {product.description}
                </Card.Text>

                <div className="product-details mb-3">
                    <div className="price-section">
                        {product.originalPrice && (
                            <span className="original-price me-2">
                                ${product.originalPrice.toFixed(2)}
                            </span>
                        )}
                        <span className="current-price">
                            ${product.price.toFixed(2)}
                        </span>
                    </div>

                    <div className="product-meta">
                        <small className="text-muted">
                            <i className="bi bi-clock me-1"></i>
                            {product.prepTime} • {product.size}
                        </small>
                    </div>
                </div>

                <div className="mt-auto">
                    {/* Quantity Selection Section */}
                    <div className="quantity-section mb-3">
                        <label className="quantity-label">Quantity:</label>
                        <div className="quantity-controls">
                            <Button
                                variant="outline-primary"
                                size="sm"
                                className="quantity-btn"
                                onClick={() => handleQuantityChange(quantity - 1)}
                                disabled={quantity <= 0}
                            >
                                -
                            </Button>
                            <span className="quantity-display">{quantity}</span>
                            <Button
                                variant="outline-primary"
                                size="sm"
                                className="quantity-btn"
                                onClick={() => handleQuantityChange(quantity + 1)}
                            >
                                +
                            </Button>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="add-to-cart-section">
                        <Button
                            variant="primary"
                            className="add-to-cart-btn w-100"
                            onClick={handleAddToCart}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Spinner size="sm" className="me-2" />
                                    Adding...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-cart-plus me-2"></i>
                                    Add to Cart ${(product.price * Math.max(1, quantity)).toFixed(2)}
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        originalPrice: PropTypes.number,
        image: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        reviews: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        isPopular: PropTypes.bool,
        discount: PropTypes.number,
        prepTime: PropTypes.string.isRequired,
        size: PropTypes.string.isRequired,
    }).isRequired,
    onAddToCart: PropTypes.func.isRequired,
    onQuantityChange: PropTypes.func.isRequired,
    productQuantities: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    variant: PropTypes.oneOf(["default", "shopping"]),
};

export default ProductCard;
