import React from 'react';
import './Card.css';

export interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  footer?: React.ReactNode;
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  image,
  imageAlt,
  footer,
  hover = false,
  className = '',
  onClick,
}) => {
  const baseClass = 'alsania-card';
  const hoverClass = hover ? 'alsania-card--hover' : '';
  const clickableClass = onClick ? 'alsania-card--clickable' : '';
  
  const classes = [
    baseClass,
    hoverClass,
    clickableClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} onClick={onClick}>
      {image && (
        <div className="alsania-card__image">
          <img src={image} alt={imageAlt || title} />
        </div>
      )}
      
      {(title || subtitle) && (
        <div className="alsania-card__header">
          {title && <h3 className="alsania-card__title">{title}</h3>}
          {subtitle && <p className="alsania-card__subtitle">{subtitle}</p>}
        </div>
      )}
      
      <div className="alsania-card__body">
        {children}
      </div>
      
      {footer && (
        <div className="alsania-card__footer">
          {footer}
        </div>
      )}
    </div>
  );
}; 