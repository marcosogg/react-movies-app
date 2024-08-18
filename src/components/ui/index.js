// src/components/ui/index.js

export const Button = ({ children, variant = 'primary', ...props }) => {
  const baseClasses = 'font-semibold py-2 px-4 rounded transition-colors duration-300';
  const variantClasses = {
    primary: 'bg-accent-red text-white hover:bg-red-700',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
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

export const Card = ({ children, className, ...props }) => (
  <div className={`bg-hover-gray rounded-lg overflow-hidden shadow-lg ${className}`} {...props}>
    {children}
  </div>
);

export const Input = ({ ...props }) => {
  return (
    <input
      className="w-full px-3 py-2 border rounded text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-accent"
      {...props}
    />
  );
};