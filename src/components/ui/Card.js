// src/components/ui/Card.js
import React from 'react';

export const Card = ({ children, className, ...props }) => (
  <div className={`bg-hover-gray rounded-lg overflow-hidden shadow-lg ${className}`} {...props}>
    {children}
  </div>
);

export default Card;