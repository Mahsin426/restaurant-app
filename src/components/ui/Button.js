import React from 'react';

export const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button', ...props }) => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30',
    success: 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30',
    outline: 'border-2 border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
  };

  return (
    <button 
      type={type}
      onClick={onClick} 
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
