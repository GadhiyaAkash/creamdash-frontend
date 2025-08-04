import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Modal, Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './Profile.scss';

const Profile = ({ user, onUpdateUser }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    preferences: {
      newsletter: true,
      promotions: true,
      orderUpdates: true
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});

  // Initialize form data with user data
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || user.name?.split(' ')[0] || '',
        lastName: user.lastName || user.name?.split(' ')[1] || '',
        email: user.email || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth || '',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          zipCode: user.address?.zipCode || '',
          country: user.address?.country || 'United States'
        },
        preferences: {
          newsletter: user.preferences?.newsletter ?? true,
          promotions: user.preferences?.promotions ?? true,
          orderUpdates: user.preferences?.orderUpdates ?? true
        }
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validatePasswordForm = () => {
    const errors = {};

    if (!passwordData.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }

    if (!passwordData.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      errors.newPassword = 'Password must be at least 6 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordData.newPassword)) {
      errors.newPassword = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (!passwordData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your new password';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create updated user object
      const updatedUser = {
        ...user,
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        address: formData.address,
        preferences: formData.preferences,
        updatedAt: new Date().toISOString()
      };

      // Update localStorage
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

      // Call parent callback to update user state
      if (onUpdateUser) {
        onUpdateUser(updatedUser);
      }

      setIsEditing(false);
      setShowSuccessAlert(true);

      // Hide success alert after 3 seconds
      setTimeout(() => setShowSuccessAlert(false), 3000);

    } catch (error) {
      console.error('Profile update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validatePasswordForm();
    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call for password change
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real app, you would validate current password against server
      console.log('Password changed successfully');

      setShowPasswordModal(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setPasswordErrors({});
      setShowSuccessAlert(true);

      // Hide success alert after 3 seconds
      setTimeout(() => setShowSuccessAlert(false), 3000);

    } catch (error) {
      console.error('Password change error:', error);
      setPasswordErrors({ general: 'Failed to change password. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form data to original user data
    if (user) {
      setFormData({
        firstName: user.firstName || user.name?.split(' ')[0] || '',
        lastName: user.lastName || user.name?.split(' ')[1] || '',
        email: user.email || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth || '',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          zipCode: user.address?.zipCode || '',
          country: user.address?.country || 'United States'
        },
        preferences: {
          newsletter: user.preferences?.newsletter ?? true,
          promotions: user.preferences?.promotions ?? true,
          orderUpdates: user.preferences?.orderUpdates ?? true
        }
      });
    }
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString();
  };

  if (!user) {
    return (
      <div className="profile-page">
        <Container className="py-5">
          <div className="text-center">
            <h2>Please log in to view your profile</h2>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Container className="py-5">
        <Row>
          <Col lg={8} className="mx-auto">
            {showSuccessAlert && (
              <Alert variant="success" className="mb-4">
                <i className="fas fa-check-circle me-2"></i>
                Profile updated successfully!
              </Alert>
            )}

            <Card className="profile-card">
              <Card.Header className="profile-header">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="profile-avatar">
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="ms-3">
                      <h3 className="mb-1">
                        {formData.firstName} {formData.lastName}
                        {user.role === 'admin' && (
                          <Badge bg="warning" className="ms-2">
                            <i className="fas fa-crown me-1"></i>
                            Admin
                          </Badge>
                        )}
                      </h3>
                      <p className="text-muted mb-0">{formData.email}</p>
                    </div>
                  </div>
                  <div>
                    {!isEditing ? (
                      <Button
                        variant="outline-primary"
                        onClick={() => setIsEditing(true)}
                      >
                        <i className="fas fa-edit me-2"></i>
                        Edit Profile
                      </Button>
                    ) : (
                      <div>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={handleCancel}
                          className="me-2"
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={handleSubmit}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Saving...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-save me-2"></i>
                              Save Changes
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card.Header>

              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  {/* Personal Information */}
                  <div className="profile-section">
                    <h5 className="section-title">
                      <i className="fas fa-user me-2"></i>
                      Personal Information
                    </h5>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="Enter your first name"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="Enter your last name"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="Enter your email"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="Enter your phone number"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Date of Birth</Form.Label>
                          <Form.Control
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>

                  {/* Address Information */}
                  <div className="profile-section">
                    <h5 className="section-title">
                      <i className="fas fa-map-marker-alt me-2"></i>
                      Address Information
                    </h5>
                    <Row>
                      <Col md={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Street Address</Form.Label>
                          <Form.Control
                            type="text"
                            name="address.street"
                            value={formData.address.street}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="Enter your street address"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>City</Form.Label>
                          <Form.Control
                            type="text"
                            name="address.city"
                            value={formData.address.city}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="Enter your city"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group className="mb-3">
                          <Form.Label>State</Form.Label>
                          <Form.Control
                            type="text"
                            name="address.state"
                            value={formData.address.state}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="State"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group className="mb-3">
                          <Form.Label>ZIP Code</Form.Label>
                          <Form.Control
                            type="text"
                            name="address.zipCode"
                            value={formData.address.zipCode}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="ZIP"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Country</Form.Label>
                          <Form.Select
                            name="address.country"
                            value={formData.address.country}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          >
                            <option value="United States">United States</option>
                            <option value="Canada">Canada</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Australia">Australia</option>
                            <option value="Germany">Germany</option>
                            <option value="France">France</option>
                            <option value="Other">Other</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>

                  {/* Preferences */}
                  <div className="profile-section">
                    <h5 className="section-title">
                      <i className="fas fa-cog me-2"></i>
                      Preferences
                    </h5>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="checkbox"
                        name="preferences.newsletter"
                        checked={formData.preferences.newsletter}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        label="Subscribe to newsletter for latest updates and offers"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="checkbox"
                        name="preferences.promotions"
                        checked={formData.preferences.promotions}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        label="Receive promotional emails and special offers"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="checkbox"
                        name="preferences.orderUpdates"
                        checked={formData.preferences.orderUpdates}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        label="Receive order status updates and shipping notifications"
                      />
                    </Form.Group>
                  </div>

                  {/* Security */}
                  <div className="profile-section">
                    <h5 className="section-title">
                      <i className="fas fa-shield-alt me-2"></i>
                      Security
                    </h5>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <p className="mb-1"><strong>Password</strong></p>
                        <p className="text-muted mb-0">Last updated: {formatDate(user.createdAt)}</p>
                      </div>
                      <Button
                        variant="outline-secondary"
                        onClick={() => setShowPasswordModal(true)}
                      >
                        <i className="fas fa-key me-2"></i>
                        Change Password
                      </Button>
                    </div>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Password Change Modal */}
        <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              <i className="fas fa-key me-2"></i>
              Change Password
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handlePasswordSubmit}>
            <Modal.Body>
              {passwordErrors.general && (
                <Alert variant="danger">
                  {passwordErrors.general}
                </Alert>
              )}
              
              <Form.Group className="mb-3">
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  isInvalid={!!passwordErrors.currentPassword}
                  placeholder="Enter your current password"
                />
                <Form.Control.Feedback type="invalid">
                  {passwordErrors.currentPassword}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  isInvalid={!!passwordErrors.newPassword}
                  placeholder="Enter your new password"
                />
                <Form.Control.Feedback type="invalid">
                  {passwordErrors.newPassword}
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                  Password must contain at least one uppercase letter, one lowercase letter, and one number.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  isInvalid={!!passwordErrors.confirmPassword}
                  placeholder="Confirm your new password"
                />
                <Form.Control.Feedback type="invalid">
                  {passwordErrors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="outline-secondary"
                onClick={() => setShowPasswordModal(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Changing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save me-2"></i>
                    Change Password
                  </>
                )}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.object,
  onUpdateUser: PropTypes.func
};

export default Profile;
