import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import './Cart.scss';

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

export default OrderSummary;