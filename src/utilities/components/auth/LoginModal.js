import React, { useState, useCallback } from 'react';
import { Modal, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './LoginModal.scss';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/userSlice';

// Dummy credentials for demo purposes
const DUMMY_CREDENTIALS = [
  { email: 'admin@creamdash.com', password: 'admin123', name: 'Admin User', role: 'admin' },
  { email: 'user@creamdash.com', password: 'user123', name: 'John Doe', role: 'customer' },
  { email: 'demo@creamdash.com', password: 'demo123', name: 'Demo User', role: 'customer' },
];

const LoginModal = ({ show, onHide, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDemoCredentials, setShowDemoCredentials] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  }, [error]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check credentials against dummy data
    const user = DUMMY_CREDENTIALS.find(
      cred => cred.email === formData.email && cred.password === formData.password
    );

    if (user) {
      // Successful login
      const userData = {
        id: user.email,
        name: user.name,
        email: user.email,
        role: user.role,
        rememberMe: formData.rememberMe
      };
      dispatch(setUser(userData));
      localStorage.setItem('creamDashUser', JSON.stringify(userData));
      // if (userData.rememberMe) {
      //   localStorage.setItem('creamDashUser', JSON.stringify(userData));
      // }
      onHide();
      // Clear form and close modal
      setFormData({
        email: '',
        password: '',
        rememberMe: false
      });
      setError('');
      setShowPassword(false);
      setShowDemoCredentials(false);
      onHide();
    } else {
      setError('Invalid email or password. Please try again.');
    }

    setIsLoading(false);
  }, [formData, onHide]);

  const handleClose = useCallback(() => {
    setFormData({
      email: '',
      password: '',
      rememberMe: false
    });
    setError('');
    setShowPassword(false);
    setShowDemoCredentials(false);
    onHide();
  }, [onHide]);

  const handleDemoLogin = useCallback((credentials) => {
    setFormData(prev => ({
      ...prev,
      email: credentials.email,
      password: credentials.password
    }));
    setError('');
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const toggleDemoCredentials = useCallback(() => {
    setShowDemoCredentials(prev => !prev);
  }, []);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="login-modal"
      backdrop="static"
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="w-100 text-center">
          <div className="login-title">
            <i className="fas fa-sign-in-alt"></i>
            <h4 className="mb-0">Welcome Back!</h4>
            <p className="text-muted mb-0">Sign in to your CreamDash account</p>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4 pb-4">
        {error && (
          <Alert variant="danger" className="mb-3">
            <i className="fas fa-exclamation-triangle me-2"></i>
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <i className="fas fa-envelope"></i>
              </InputGroup.Text>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <i className="fas fa-lock"></i>
              </InputGroup.Text>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
              <Button
                variant="outline-secondary"
                onClick={togglePasswordVisibility}
                disabled={isLoading}
              >
                <i className={`fas fa-eye${showPassword ? '-slash' : ''}`}></i>
              </Button>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              label="Remember me"
              disabled={isLoading}
            />
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-100 mb-3"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Signing In...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt me-2"></i>
                Sign In
              </>
            )}
          </Button>
        </Form>

        {/* Demo Credentials Section */}
        <div className="demo-section">
          <div className="divider">
            <span>Demo Accounts</span>
          </div>

          <Button
            variant="link"
            size="sm"
            className="demo-toggle-btn"
            onClick={toggleDemoCredentials}
          >
            <i className={`fas fa-chevron-${showDemoCredentials ? 'up' : 'down'} me-1`}></i>
            {showDemoCredentials ? 'Hide' : 'Show'} Demo Credentials
          </Button>

          {showDemoCredentials && (
            <div className="demo-credentials">
              {DUMMY_CREDENTIALS.map((cred, index) => (
                <div key={index} className="demo-account">
                  <div className="demo-info">
                    <strong>{cred.name}</strong> ({cred.role})
                    <br />
                    <small className="text-muted">
                      {cred.email} / {cred.password}
                    </small>
                  </div>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleDemoLogin(cred)}
                    disabled={isLoading}
                  >
                    Use Account
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Additional Links */}
        <div className="text-center mt-3">
          <p className="mb-0">
            <Button variant="link" size="sm" className="p-0">
              Forgot your password?
            </Button>
          </p>
          <p className="mb-0">
            Don't have an account?{' '}
            <Button
              variant="link"
              size="sm"
              className="p-0"
              onClick={onSwitchToSignup}
              disabled={isLoading}
            >
              Sign up here
            </Button>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

LoginModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onSwitchToSignup: PropTypes.func.isRequired,
};

export default LoginModal;
