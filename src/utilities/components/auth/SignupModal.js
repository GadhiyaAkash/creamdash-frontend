import React, { useState, useCallback } from 'react';
import { Modal, Form, Button, Alert, InputGroup, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './SignupModal.scss';

const SignupModal = ({ show, onHide, onSignup, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: '',
    agreeToTerms: false,
    subscribeNewsletter: true
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      isValid: hasMinLength && hasUpperCase && hasLowerCase && hasNumbers,
      requirements: {
        minLength: hasMinLength,
        upperCase: hasUpperCase,
        lowerCase: hasLowerCase,
        numbers: hasNumbers,
        specialChar: hasSpecialChar
      }
    };
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = 'Password does not meet requirements';
      }
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    return newErrors;
  };

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  const handleNextStep = useCallback(() => {
    const stepErrors = validateStep1();
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    
    setErrors({});
    setCurrentStep(2);
  }, [formData]);

  const handlePrevStep = useCallback(() => {
    setCurrentStep(1);
    setErrors({});
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    const stepErrors = validateStep2();
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check if email already exists (simulate)
      const existingEmails = ['admin@creamdash.com', 'user@creamdash.com', 'demo@creamdash.com'];
      if (existingEmails.includes(formData.email.toLowerCase())) {
        setErrors({ email: 'An account with this email already exists' });
        setCurrentStep(1);
        setIsLoading(false);
        return;
      }

      // Create user object
      const newUser = {
        id: Date.now().toString(),
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        email: formData.email.toLowerCase().trim(),
        phone: formData.phone.trim(),
        dateOfBirth: formData.dateOfBirth,
        role: 'customer',
        subscribeNewsletter: formData.subscribeNewsletter,
        createdAt: new Date().toISOString(),
        isVerified: false
      };

      // Call parent signup handler
      onSignup(newUser);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        dateOfBirth: '',
        agreeToTerms: false,
        subscribeNewsletter: true
      });
      setCurrentStep(1);
      
    } catch (error) {
      setErrors({ general: 'Failed to create account. Please try again.' });
    }
    
    setIsLoading(false);
  }, [formData, onSignup]);

  const handleClose = useCallback(() => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      dateOfBirth: '',
      agreeToTerms: false,
      subscribeNewsletter: true
    });
    setErrors({});
    setCurrentStep(1);
    setIsLoading(false);
    onHide();
  }, [onHide]);

  const passwordValidation = validatePassword(formData.password);

  return (
    <Modal show={show} onHide={handleClose} centered className="signup-modal">
      <Modal.Header closeButton className="border-0 pb-2">
        <Modal.Title className="w-100 text-center">
          <div className="signup-header">
            <i className="fas fa-user-plus signup-icon"></i>
            <h3 className="mb-0">Create Account</h3>
            <p className="text-muted mb-0">Join CreamDash today!</p>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4 pb-4">
        {/* Progress Indicator */}
        <div className="signup-progress mb-4">
          <div className="progress-steps">
            <div className={`step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
              <div className="step-number">
                {currentStep > 1 ? <i className="fas fa-check"></i> : '1'}
              </div>
              <span className="step-label">Personal Info</span>
            </div>
            <div className="progress-line"></div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
              <div className="step-number">2</div>
              <span className="step-label">Security</span>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {errors.general && (
          <Alert variant="danger" className="mb-3">
            <i className="fas fa-exclamation-triangle me-2"></i>
            {errors.general}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="signup-step">
              <h5 className="step-title mb-3">
                <i className="fas fa-user me-2"></i>
                Personal Information
              </h5>
              
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      isInvalid={!!errors.firstName}
                      placeholder="Enter your first name"
                      disabled={isLoading}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.firstName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      isInvalid={!!errors.lastName}
                      placeholder="Enter your last name"
                      disabled={isLoading}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lastName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Email Address *</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-envelope"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    isInvalid={!!errors.email}
                    placeholder="Enter your email address"
                    disabled={isLoading}
                  />
                </InputGroup>
                {errors.email && (
                  <div className="invalid-feedback d-block">
                    {errors.email}
                  </div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number *</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-phone"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    isInvalid={!!errors.phone}
                    placeholder="Enter your phone number"
                    disabled={isLoading}
                  />
                </InputGroup>
                {errors.phone && (
                  <div className="invalid-feedback d-block">
                    {errors.phone}
                  </div>
                )}
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  max={new Date().toISOString().split('T')[0]}
                />
                <Form.Text className="text-muted">
                  Optional - helps us provide age-appropriate content
                </Form.Text>
              </Form.Group>

              <div className="step-actions">
                <Button
                  variant="primary"
                  onClick={handleNextStep}
                  disabled={isLoading}
                  className="w-100"
                  size="lg"
                >
                  Next Step
                  <i className="fas fa-arrow-right ms-2"></i>
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Security & Terms */}
          {currentStep === 2 && (
            <div className="signup-step">
              <h5 className="step-title mb-3">
                <i className="fas fa-shield-alt me-2"></i>
                Security & Terms
              </h5>

              <Form.Group className="mb-3">
                <Form.Label>Password *</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    isInvalid={!!errors.password}
                    placeholder="Create a strong password"
                    disabled={isLoading}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    <i className={`fas fa-${showPassword ? 'eye-slash' : 'eye'}`}></i>
                  </Button>
                </InputGroup>
                {errors.password && (
                  <div className="invalid-feedback d-block">
                    {errors.password}
                  </div>
                )}
                
                {/* Password Requirements */}
                {formData.password && (
                  <div className="password-requirements mt-2">
                    <small className="text-muted">Password must contain:</small>
                    <ul className="requirement-list">
                      <li className={passwordValidation.requirements.minLength ? 'valid' : 'invalid'}>
                        <i className={`fas fa-${passwordValidation.requirements.minLength ? 'check' : 'times'}`}></i>
                        At least 8 characters
                      </li>
                      <li className={passwordValidation.requirements.upperCase ? 'valid' : 'invalid'}>
                        <i className={`fas fa-${passwordValidation.requirements.upperCase ? 'check' : 'times'}`}></i>
                        One uppercase letter
                      </li>
                      <li className={passwordValidation.requirements.lowerCase ? 'valid' : 'invalid'}>
                        <i className={`fas fa-${passwordValidation.requirements.lowerCase ? 'check' : 'times'}`}></i>
                        One lowercase letter
                      </li>
                      <li className={passwordValidation.requirements.numbers ? 'valid' : 'invalid'}>
                        <i className={`fas fa-${passwordValidation.requirements.numbers ? 'check' : 'times'}`}></i>
                        One number
                      </li>
                    </ul>
                  </div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirm Password *</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    isInvalid={!!errors.confirmPassword}
                    placeholder="Confirm your password"
                    disabled={isLoading}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                  >
                    <i className={`fas fa-${showConfirmPassword ? 'eye-slash' : 'eye'}`}></i>
                  </Button>
                </InputGroup>
                {errors.confirmPassword && (
                  <div className="invalid-feedback d-block">
                    {errors.confirmPassword}
                  </div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  name="subscribeNewsletter"
                  checked={formData.subscribeNewsletter}
                  onChange={handleInputChange}
                  label="Subscribe to our newsletter for special offers and updates"
                  disabled={isLoading}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Check
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  isInvalid={!!errors.agreeToTerms}
                  disabled={isLoading}
                  label={
                    <span>
                      I agree to the{' '}
                      <a href="/terms" target="_blank" rel="noopener noreferrer">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="/privacy" target="_blank" rel="noopener noreferrer">
                        Privacy Policy
                      </a>
                      {' *'}
                    </span>
                  }
                />
                {errors.agreeToTerms && (
                  <div className="invalid-feedback d-block">
                    {errors.agreeToTerms}
                  </div>
                )}
              </Form.Group>

              <div className="step-actions">
                <Row>
                  <Col>
                    <Button
                      variant="outline-secondary"
                      onClick={handlePrevStep}
                      disabled={isLoading}
                      className="w-100"
                    >
                      <i className="fas fa-arrow-left me-2"></i>
                      Back
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isLoading}
                      className="w-100"
                      size="lg"
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-user-plus me-2"></i>
                          Create Account
                        </>
                      )}
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          )}
        </Form>

        {/* Switch to Login */}
        <div className="text-center mt-4 pt-3 border-top">
          <p className="mb-0">
            Already have an account?{' '}
            <Button
              variant="link"
              onClick={onSwitchToLogin}
              disabled={isLoading}
              className="p-0 text-decoration-none fw-bold"
            >
              Sign In
            </Button>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

SignupModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onSignup: PropTypes.func.isRequired,
  onSwitchToLogin: PropTypes.func.isRequired
};

export default SignupModal;
