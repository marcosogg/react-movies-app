// src/components/ui/Button.js
import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'font-semibold py-2 px-4 rounded transition-colors duration-300';
  const variantClasses = {
    primary: 'bg-accent-red text-white hover:bg-red-700',
    secondary: 'bg-gray-700 text-white hover:bg-gray-600',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <button
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;