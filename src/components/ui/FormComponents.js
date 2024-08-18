import React from 'react';

export const FormInput = ({ label, id, ...props }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">
      {label}
    </label>
    <input
      id={id}
      className="w-full px-3 py-2 bg-secondary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
      {...props}
    />
  </div>
);

export const FormTextArea = ({ label, id, ...props }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">
      {label}
    </label>
    <textarea
      id={id}
      className="w-full px-3 py-2 bg-secondary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
      {...props}
    />
  </div>
);

export const FormButton = ({ children, variant = 'primary', ...props }) => {
  const baseClasses = "w-full font-bold py-2 px-4 rounded-lg transition duration-300";
  const variantClasses = {
    primary: "bg-accent-red hover:bg-red-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};