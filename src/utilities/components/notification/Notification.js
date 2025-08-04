import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'react-bootstrap';
import './Notification.scss';
import { hideNotification } from '../../../store/notificationSlice';

const Notification = () => {
  const dispatch = useDispatch();
  const { message, type, isVisible } = useSelector((state) => state.notification);
  
  if (!isVisible) {
    return null;
  }

  return (
    <Alert 
      variant={type} 
      onClose={() => dispatch(hideNotification())} 
      dismissible
      className="notification-popup"
    >
      {message}
    </Alert>
  );
};

export default Notification;
