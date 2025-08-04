import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Row, Col, Card, Badge, Alert, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Cart.scss';

// Import assets
import noItemImage from '../../assets/no-item.png';

// Cart Item Component
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

// Order Summary Component
const OrderSummary = ({ subtotal, tax, shipping, discount, total, itemCount }) => (
  <Card className="order-summary">
    <Card.Header>
      <h5 className="mb-0">
        <i className="fas fa-receipt me-2"></i>
        Order Summary
      </h5>
    </Card.Header>
    <Card.Body>
      <div className="summary-row">
        <span>Subtotal ({itemCount} items):</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      
      {discount > 0 && (
        <div className="summary-row discount-row">
          <span>Discount:</span>
          <span className="discount-amount">-${discount.toFixed(2)}</span>
        </div>
      )}
      
      <div className="summary-row">
        <span>Tax:</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      
      <div className="summary-row">
        <span>Shipping:</span>
        <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
      </div>
      
      <hr />
      
      <div className="summary-row total-row">
        <strong>Total:</strong>
        <strong className="total-amount">${total.toFixed(2)}</strong>
      </div>
    </Card.Body>
  </Card>
);

OrderSummary.propTypes = {
  subtotal: PropTypes.number.isRequired,
  tax: PropTypes.number.isRequired,
  shipping: PropTypes.number.isRequired,
  discount: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  itemCount: PropTypes.number.isRequired
};

// Promo Code Component
const PromoCode = ({ onApplyPromo, isLoading }) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoStatus, setPromoStatus] = useState(null);

  const handleApplyPromo = useCallback(async () => {
    if (!promoCode.trim()) return;
    
    setPromoStatus({ type: 'loading' });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock promo validation
    const validCodes = ['SAVE10', 'WELCOME20', 'ICECREAM15'];
    if (validCodes.includes(promoCode.toUpperCase())) {
      const discount = promoCode.toUpperCase() === 'WELCOME20' ? 20 : 
                     promoCode.toUpperCase() === 'ICECREAM15' ? 15 : 10;
      setPromoStatus({ type: 'success', message: `Promo code applied! ${discount}% off` });
      onApplyPromo(discount);
    } else {
      setPromoStatus({ type: 'error', message: 'Invalid promo code' });
    }
  }, [promoCode, onApplyPromo]);

  return (
    <Card className="promo-code-card">
      <Card.Body>
        <h6 className="mb-3">
          <i className="fas fa-tag me-2"></i>
          Have a Promo Code?
        </h6>
        
        {promoStatus && (
          <Alert 
            variant={promoStatus.type === 'error' ? 'danger' : 'success'}
            className="mb-3"
            dismissible
            onClose={() => setPromoStatus(null)}
          >
            {promoStatus.message}
          </Alert>
        )}
        
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            disabled={isLoading || promoStatus?.type === 'loading'}
          />
          <Button
            variant="outline-primary"
            onClick={handleApplyPromo}
            disabled={!promoCode.trim() || isLoading || promoStatus?.type === 'loading'}
          >
            {promoStatus?.type === 'loading' ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              'Apply'
            )}
          </Button>
        </InputGroup>
        
        <small className="text-muted mt-2 d-block">
          Try: SAVE10, WELCOME20, or ICECREAM15
        </small>
      </Card.Body>
    </Card>
  );
};

PromoCode.propTypes = {
  onApplyPromo: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

// Main Cart Component
const Cart = ({ 
  cartItems = [], 
  onRemoveFromCart, 
  onClearCart, 
  totalValue = 0, 
  user = null,
  onUpdateQuantity
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [notification, setNotification] = useState(null);

  // Calculate totals
  const calculations = useMemo(() => {
    const subtotal = cartItems.reduce((total, item) => 
      total + (item.price * item.quantity), 0
    );
    
    const discountAmount = (subtotal * appliedDiscount) / 100;
    const discountedSubtotal = subtotal - discountAmount;
    const tax = discountedSubtotal * 0.08; // 8% tax
    const shipping = discountedSubtotal > 50 ? 0 : 5.99; // Free shipping over $50
    const total = discountedSubtotal + tax + shipping;
    const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return {
      subtotal,
      discountAmount,
      tax,
      shipping,
      total,
      itemCount
    };
  }, [cartItems, appliedDiscount]);

  const handleUpdateQuantity = useCallback(async (itemId, newQuantity) => {
    if (onUpdateQuantity) {
      onUpdateQuantity(itemId, newQuantity);
    }
  }, [onUpdateQuantity]);

  const handleRemoveItem = useCallback(async (itemId) => {
    setIsLoading(true);
    
    try {
      onRemoveFromCart(itemId);
      setNotification({
        type: 'success',
        message: 'Item removed from cart'
      });
      
      // Clear notification after 3 seconds
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to remove item'
      });
    }
    
    setIsLoading(false);
  }, [onRemoveFromCart]);

  const handleClearCart = useCallback(async () => {
    setIsLoading(true);
    
    try {
      onClearCart();
      setAppliedDiscount(0);
      setNotification({
        type: 'success',
        message: 'Cart cleared successfully'
      });
      
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to clear cart'
      });
    }
    
    setIsLoading(false);
  }, [onClearCart]);

  const handleApplyPromo = useCallback((discountPercent) => {
    setAppliedDiscount(discountPercent);
  }, []);

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <Container fluid className="h-100">
          <div className="empty-cart">
            <div className="empty-cart-content">
              <div className="empty-cart-image-wrapper">
                <img 
                  src={noItemImage} 
                  alt="Empty cart" 
                  className="empty-cart-image"
                />
              </div>
              <h2>Your Cart is Empty</h2>
              <p>Looks like you haven't added any delicious ice cream to your cart yet.</p>
              <div className="empty-cart-actions">
                <Button as={Link} to="/shop" variant="primary" size="lg" className="mb-2 mb-sm-0 me-sm-3">
                  <i className="fas fa-shopping-bag me-2"></i>
                  Start Shopping
                </Button>
                <Button as={Link} to="/" variant="outline-primary" size="lg">
                  <i className="fas fa-home me-2"></i>
                  Go Home
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <Container>
        {/* Header */}
        <div className="cart-header">
          <Row className="align-items-center gy-3">
            <Col xs={12} lg={8}>
              {user && (
                <div className="user-greeting mb-2">
                  <span className="greeting-text">
                    <strong>{user.name}'s</strong> Shopping Cart
                  </span>
                </div>
              )}
              <h1>
                <i className="fas fa-shopping-cart me-3"></i>
                Shopping Cart
              </h1>
              <p className="cart-subtitle">
                {calculations.itemCount} item{calculations.itemCount !== 1 ? 's' : ''} in your cart
              </p>
            </Col>
            <Col xs={12} lg={4} className="text-lg-end">
              <Button
                variant="outline-danger"
                onClick={handleClearCart}
                disabled={isLoading}
                className="clear-cart-btn w-100 w-lg-auto"
              >
                <i className="fas fa-trash me-2"></i>
                Clear Cart
              </Button>
            </Col>
          </Row>
        </div>

        {/* Notifications */}
        {notification && (
          <Alert
            variant={notification.type === 'error' ? 'danger' : 'success'}
            dismissible
            onClose={() => setNotification(null)}
            className="mb-4"
          >
            <i className={`fas fa-${notification.type === 'error' ? 'exclamation-triangle' : 'check-circle'} me-2`}></i>
            {notification.message}
          </Alert>
        )}

        <Row className="gy-4">
          {/* Cart Items */}
          <Col xl={8} lg={7}>
            <div className="cart-items">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                  isLoading={isLoading}
                />
              ))}
            </div>
            
            {/* Continue Shopping */}
            <div className="continue-shopping">
              <Button as={Link} to="/shop" variant="outline-primary">
                <i className="fas fa-arrow-left me-2"></i>
                Continue Shopping
              </Button>
            </div>
          </Col>

          {/* Sidebar */}
          <Col xl={4} lg={5}>
            <div className="cart-sidebar">
              {/* Promo Code */}
              <PromoCode onApplyPromo={handleApplyPromo} isLoading={isLoading} />

              {/* Order Summary */}
              <OrderSummary
                subtotal={calculations.subtotal}
                tax={calculations.tax}
                shipping={calculations.shipping}
                discount={calculations.discountAmount}
                total={calculations.total}
                itemCount={calculations.itemCount}
              />

              {/* Checkout Actions */}
              <div className="checkout-actions">
                <Button
                  as={Link}
                  to="/checkout"
                  variant="primary"
                  size="lg"
                  className="w-100 checkout-btn"
                  disabled={isLoading}
                >
                  <i className="fas fa-credit-card me-2"></i>
                  Proceed to Checkout
                </Button>
                
                <div className="secure-checkout mt-2">
                  <small className="text-muted">
                    <i className="fas fa-lock me-1"></i>
                    Secure checkout powered by SSL encryption
                  </small>
                </div>
              </div>

              {/* Shipping Info */}
              <Card className="shipping-info mt-3">
                <Card.Body className="text-center">
                  <div className="shipping-icon">
                    <i className="fas fa-truck"></i>
                  </div>
                  <h6>Free Shipping</h6>
                  <p className="mb-0">
                    {calculations.subtotal >= 50 ? (
                      <span className="text-success">
                        <i className="fas fa-check me-1"></i>
                        You qualify for free shipping!
                      </span>
                    ) : (
                      <span>
                        Add ${(50 - calculations.subtotal).toFixed(2)} more for free shipping
                      </span>
                    )}
                  </p>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
  onRemoveFromCart: PropTypes.func.isRequired,
  onClearCart: PropTypes.func.isRequired,
  totalValue: PropTypes.number,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string
  }),
  onUpdateQuantity: PropTypes.func
};

Cart.defaultProps = {
  cartItems: [],
  totalValue: 0,
  user: null,
  onUpdateQuantity: () => {}
};

export default Cart;
