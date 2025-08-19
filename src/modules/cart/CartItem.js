import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Badge, Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import './CartItem.scss';

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
                            <img src={item.image} alt={item.name} />
                            {item.isPopular && (
                                <Badge bg="warning" className="popular-badge">
                                    <i className="fas fa-fire me-1"></i>
                                    <span>Popular</span>
                                </Badge>
                            )}
                        </div>
                    </Col>

                    <Col xs={12} sm={6} md={4}>
                        <div className="item-details">
                            <h5 className="item-title">{item.name}</h5>
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
                                        <span>{item.discount}% OFF</span>
                                    </Badge>
                                </div>
                            )}
                        </div>
                    </Col>

                    <Col xs={6} sm={3} md={2}>
                        <div className="item-price">
                            {item.discount ? (
                                <>
                                    <span className="original-price">${item.originalPrice.toFixed(2)}</span>
                                    <span className="discounted-price">
                                        ${item.price.toFixed(2)}
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
                                    type="text"
                                    value={quantity}
                                    readOnly
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

                    <Col xs={6} sm={3} md={1} className="text-center">
                        <div className="item-total">
                            <strong>${itemTotal}</strong>
                        </div>
                    </Col>

                    <Col xs={6} sm={3} md={1} className="text-center">
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={handleRemove}
                            disabled={isUpdating || isLoading}
                            className="remove-btn"
                            title="Remove item"
                        >
                            {isUpdating ? (
                                <output className="spinner-border spinner-border-sm" aria-hidden="true"></output>
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
    item: PropTypes.object.isRequired,
    onUpdateQuantity: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    isLoading: PropTypes.bool
};

export default CartItem;