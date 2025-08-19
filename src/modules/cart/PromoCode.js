import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, InputGroup, Form, Alert } from 'react-bootstrap';
import './Cart.scss';

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
      const code = promoCode.toUpperCase();
      let discount = 10; // default
      if (code === 'WELCOME20') discount = 20;
      else if (code === 'ICECREAM15') discount = 15;
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
          <span>Have a Promo Code?</span>
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
              <output className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></output>
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

export default PromoCode;

PromoCode.propTypes = {
  onApplyPromo: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};