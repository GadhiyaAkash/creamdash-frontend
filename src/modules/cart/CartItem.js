import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Badge, Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";

const CartItem = ({ item, onUpdateQuantity, onRemove, isLoading }) => {
    const [quantity, setQuantity] = useState(item.quantity || 1);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleQuantityChange = useCallback(async (newQuantity) => {
        if (newQuantity < 1) return;

        setIsUpdating(true);
        setQuantity(newQuantity);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300));

        onUpdateQuantity(item.id, newQuantity);
        setIsUpdating(false);
    }, [item.id, onUpdateQuantity]);

    const handleRemove = useCallback(async () => {
        setIsUpdating(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300));

        onRemove(item.id);
    }, [item.id, onRemove]);

    const itemTotal = (item.price * quantity).toFixed(2);

    return (
        <Card className={`cart-item ${isUpdating ? 'updating' : ''}`}>
            <Card.Body>
                <Row className="align-items-center gy-3">
                    <Col xs={12} sm={6} md={2} className="text-center">
                        <div className="item-image">
                            <img src={item.image} alt={item.title || item.name} />
                            {item.isPopular && (
                                <Badge bg="warning" className="popular-badge">
                                    <i className="fas fa-fire me-1"></i>
                                    Popular
                                </Badge>
                            )}
                        </div>
                    </Col>

                    <Col xs={12} sm={6} md={4}>
                        <div className="item-details">
                            <h5 className="item-title">{item.title || item.name}</h5>
                            <p className="item-description">{item.description}</p>
                            <div className="item-meta">
                                <span className="item-size">
                                    <i className="fas fa-weight me-1"></i>
                                    {item.size}
                                </span>
                                {item.prepTime && (
                                    <span className="item-prep-time">
                                        <i className="fas fa-clock me-1"></i>
                                        {item.prepTime}
                                    </span>
                                )}
                            </div>
                            {item.discount && (
                                <div className="discount-info">
                                    <Badge bg="danger">
                                        {item.discount}% OFF
                                    </Badge>
                                </div>
                            )}
                        </div>
                    </Col>

                    <Col xs={6} sm={3} md={2}>
                        <div className="item-price">
                            {item.discount ? (
                                <>
                                    <span className="original-price">${item.price.toFixed(2)}</span>
                                    <span className="discounted-price">
                                        ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                                    </span>
                                </>
                            ) : (
                                <span className="current-price">${item.price.toFixed(2)}</span>
                            )}
                        </div>
                    </Col>

                    <Col xs={6} sm={3} md={2}>
                        <div className="quantity-controls">
                            <InputGroup size="sm">
                                <Button
                                    variant="outline-secondary"
                                    onClick={() => handleQuantityChange(quantity - 1)}
                                    disabled={quantity <= 1 || isUpdating || isLoading}
                                >
                                    <i className="fas fa-minus"></i>
                                </Button>
                                <Form.Control
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => {
                                        const newQty = parseInt(e.target.value) || 1;
                                        handleQuantityChange(newQty);
                                    }}
                                    min="1"
                                    max="99"
                                    disabled={isUpdating || isLoading}
                                    className="text-center quantity-input"
                                />
                                <Button
                                    variant="outline-secondary"
                                    onClick={() => handleQuantityChange(quantity + 1)}
                                    disabled={quantity >= 99 || isUpdating || isLoading}
                                >
                                    <i className="fas fa-plus"></i>
                                </Button>
                            </InputGroup>
                        </div>
                    </Col>

                    <Col xs={6} sm={3} md={1}>
                        <div className="item-total">
                            <strong>${itemTotal}</strong>
                        </div>
                    </Col>

                    <Col xs={6} sm={3} md={1}>
                        <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={handleRemove}
                            disabled={isUpdating || isLoading}
                            className="remove-btn"
                            title="Remove item"
                        >
                            {isUpdating ? (
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            ) : (
                                <i className="fas fa-trash"></i>
                            )}
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

CartItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string,
        name: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        size: PropTypes.string,
        prepTime: PropTypes.string,
        isPopular: PropTypes.bool,
        discount: PropTypes.number
    }).isRequired,
    onUpdateQuantity: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    isLoading: PropTypes.bool
};

export default CartItem;