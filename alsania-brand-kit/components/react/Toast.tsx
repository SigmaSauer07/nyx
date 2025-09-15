import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './Toast.css';

export interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
  action,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(id), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(id), 300);
  };

  const toastContent = (
    <div
      className={`alsania-toast alsania-toast--${type} ${
        isVisible ? 'alsania-toast--visible' : ''
      }`}
    >
      <div className="alsania-toast__icon">
        <span className={`alsania-ui-icon alsania-ui-icon--${type}`}></span>
      </div>
      <div className="alsania-toast__content">
        <h4 className="alsania-toast__title">{title}</h4>
        {message && <p className="alsania-toast__message">{message}</p>}
        {action && (
          <button
            className="alsania-toast__action"
            onClick={action.onClick}
          >
            {action.label}
          </button>
        )}
      </div>
      <button
        className="alsania-toast__close"
        onClick={handleClose}
        aria-label="Close toast"
      >
        <span className="alsania-ui-icon alsania-ui-icon--close"></span>
      </button>
    </div>
  );

  return createPortal(toastContent, document.body);
}; 