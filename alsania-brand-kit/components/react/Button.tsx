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
  const baseClass = 'alsania-btn';
  const variantClass = `alsania-btn--${variant}`;
  const sizeClass = `alsania-btn--${size}`;
  const widthClass = fullWidth ? 'alsania-btn--full-width' : '';
  const loadingClass = loading ? 'alsania-btn--loading' : '';
  
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
        <span className="alsania-btn__icon alsania-btn__icon--left">
          {icon}
        </span>
      )}
      <span className="alsania-btn__content">
        {children}
      </span>
      {icon && iconPosition === 'right' && !loading && (
        <span className="alsania-btn__icon alsania-btn__icon--right">
          {icon}
        </span>
      )}
    </button>
  );
}; 