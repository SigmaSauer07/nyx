import React from 'react';
import './Button.css';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  type = 'button',
}) => {
  const baseClass = 'Nyx-btn';
  const variantClass = `Nyx-btn--${variant}`;
  const sizeClass = `Nyx-btn--${size}`;
  const widthClass = fullWidth ? 'Nyx-btn--full-width' : '';
  const loadingClass = loading ? 'Nyx-btn--loading' : '';
  
  const classes = [
    baseClass,
    variantClass,
    sizeClass,
    widthClass,
    loadingClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {icon && iconPosition === 'left' && !loading && (
        <span className="Nyx-btn__icon Nyx-btn__icon--left">
          {icon}
        </span>
      )}
      <span className="Nyx-btn__content">
        {children}
      </span>
      {icon && iconPosition === 'right' && !loading && (
        <span className="Nyx-btn__icon Nyx-btn__icon--right">
          {icon}
        </span>
      )}
    </button>
  );
}; 