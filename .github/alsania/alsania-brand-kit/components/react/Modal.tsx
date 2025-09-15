import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  className = '',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscape) {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        closeOnOverlayClick
      ) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, closeOnEscape, closeOnOverlayClick]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="alsania-modal-overlay">
      <div
        ref={modalRef}
        className={`alsania-modal alsania-modal--${size} ${className}`}
      >
        <div className="alsania-modal__header">
          {title && <h2 className="alsania-modal__title">{title}</h2>}
          {showCloseButton && (
            <button
              className="alsania-modal__close"
              onClick={onClose}
              aria-label="Close modal"
            >
              <span className="alsania-ui-icon alsania-ui-icon--close"></span>
            </button>
          )}
        </div>
        <div className="alsania-modal__body">{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}; 