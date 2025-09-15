import React, { forwardRef } from 'react';
import './Input.css';

export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'url' | 'tel';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  label?: string;
  error?: string;
  success?: string;
  disabled?: boolean;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  type = 'text',
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  label,
  error,
  success,
  disabled = false,
  required = false,
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
}, ref) => {
  const baseClass = 'alsania-input';
  const sizeClass = `alsania-input--${size}`;
  const widthClass = fullWidth ? 'alsania-input--full-width' : '';
  const errorClass = error ? 'alsania-input--error' : '';
  const successClass = success ? 'alsania-input--success' : '';
  const iconClass = icon ? `alsania-input--icon-${iconPosition}` : '';
  
  const classes = [
    baseClass,
    sizeClass,
    widthClass,
    errorClass,
    successClass,
    iconClass,
    className
  ].filter(Boolean).join(' ');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className="alsania-input-wrapper">
      {label && (
        <label className="alsania-input__label">
          {label}
          {required && <span className="alsania-input__required">*</span>}
        </label>
      )}
      
      <div className="alsania-input__container">
        {icon && iconPosition === 'left' && (
          <span className="alsania-input__icon alsania-input__icon--left">
            {icon}
          </span>
        )}
        
        <input
          ref={ref}
          type={type}
          className={classes}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
        />
        
        {icon && iconPosition === 'right' && (
          <span className="alsania-input__icon alsania-input__icon--right">
            {icon}
          </span>
        )}
      </div>
      
      {(error || success) && (
        <div className={`alsania-input__feedback ${error ? 'alsania-input__feedback--error' : 'alsania-input__feedback--success'}`}>
          {error || success}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input'; 