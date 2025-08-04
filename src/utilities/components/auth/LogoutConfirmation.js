import React, { useCallback } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './LogoutConfirmation.scss';

const LogoutConfirmation = ({ show, onHide, onConfirm, userName = 'User' }) => {
  const handleConfirm = useCallback(() => {
    onConfirm();
    onHide();
  }, [onConfirm, onHide]);

  const handleCancel = useCallback(() => {
    onHide();
  }, [onHide]);

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      centered 
      className="logout-modal"
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="w-100 text-center">
          <div className="logout-icon">
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h5 className="logout-title">Confirm Logout</h5>
        <p className="logout-message">
          Are you sure you want to sign out, <strong>{userName}</strong>?
        </p>
        <p className="logout-subtitle">
          You'll need to sign in again to access your account.
        </p>

        <div className="d-flex gap-3 justify-content-center mt-4">
          <Button
            variant="outline-secondary"
            onClick={handleCancel}
          >
            <i className="fas fa-times me-2"></i>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirm}
          >
            <i className="fas fa-sign-out-alt me-2"></i>
            Sign Out
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

LogoutConfirmation.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  userName: PropTypes.string,
};

LogoutConfirmation.defaultProps = {
  userName: 'User',
};

export default LogoutConfirmation;
