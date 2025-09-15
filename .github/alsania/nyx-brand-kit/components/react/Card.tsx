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
  const baseClass = 'Nyx-card';
  const hoverClass = hover ? 'Nyx-card--hover' : '';
  const clickableClass = onClick ? 'Nyx-card--clickable' : '';
  
  const classes = [
    baseClass,
    hoverClass,
    clickableClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} onClick={onClick}>
      {image && (
        <div className="Nyx-card__image">
          <img src={image} alt={imageAlt || title} />
        </div>
      )}
      
      {(title || subtitle) && (
        <div className="Nyx-card__header">
          {title && <h3 className="Nyx-card__title">{title}</h3>}
          {subtitle && <p className="Nyx-card__subtitle">{subtitle}</p>}
        </div>
      )}
      
      <div className="Nyx-card__body">
        {children}
      </div>
      
      {footer && (
        <div className="Nyx-card__footer">
          {footer}
        </div>
      )}
    </div>
  );
}; 