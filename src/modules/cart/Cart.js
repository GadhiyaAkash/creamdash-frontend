import React, { useState, useCallback, useMemo } from 'react';
import { Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addCartItem, clearCart } from '../../store/cartSlice';
import { notify } from '../../store/notificationSlice';
import './Cart.scss';

// Import assets
import noItemImage from '../../assets/no-item.png';
import CartItem from './CartItem';
import PromoCode from './PromoCode';
import OrderSummary from './OrderSummary';

// Main Cart Component
const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.user);

  const [isLoading, setIsLoading] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(0);

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
    const item = cartItems.find(i => i.id === itemId);
    if (item) {
      dispatch(addCartItem({ ...item, quantity: newQuantity, isUpdating: true }));
    }
  }, [dispatch, cartItems]);

  const handleRemoveItem = useCallback(async (itemId) => {
    setIsLoading(true);
    try {
      // To remove, we dispatch addCartItem with quantity 0
      const item = cartItems.find(i => i.id === itemId);
      if (item) {
        dispatch(addCartItem({ ...item, quantity: 0 }));
        dispatch(notify({ message: 'Item removed from cart', type: 'success' }));
      }
    } catch (error) {
      dispatch(notify({ message: 'Failed to remove item', type: 'error' }));
    }
    setIsLoading(false);
  }, [dispatch, cartItems]);

  const handleClearCart = useCallback(async () => {
    setIsLoading(true);
    try {
      dispatch(clearCart());
      setAppliedDiscount(0);
      dispatch(notify({ message: 'Cart cleared successfully', type: 'success' }));
    } catch (error) {
      dispatch(notify({ message: 'Failed to clear cart', type: 'error' }));
    }
    setIsLoading(false);
  }, [dispatch]);

  const handleApplyPromo = useCallback((discountPercent) => {
    setAppliedDiscount(discountPercent);
    dispatch(notify({ message: `Promo code applied! You get ${discountPercent}% off.`, type: 'success' }));
  }, [dispatch]);

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
      <Container className='py-4'>
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
                  disabled={isLoading || cartItems.length === 0}
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

export default Cart;
