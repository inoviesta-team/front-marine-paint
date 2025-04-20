import React from 'react';

const variants = {
  primary: 'bg-marine-blue text-white hover:bg-marine-darkBlue',
  secondary: 'border border-marine-blue text-marine-blue hover:bg-gray-50'
};

const sizes = {
  sm: 'py-1 px-4 text-sm',
  md: 'py-2 px-8 text-base',
  lg: 'py-3 px-12 text-lg'
};

export default function MarineButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  as = 'button',
  href,
  ...props
}) {
  const variantClass = variants[variant] || variants.primary;
  const sizeClass = sizes[size] || sizes.md;
  const baseClasses = `font-mono font-bold rounded ${variantClass} ${sizeClass} ${className}`;
  
  // If the button should be rendered as a link
  if (as === 'a') {
    return (
      <a
        href={href}
        className={`inline-block ${baseClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        {...props}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {children}
          </div>
        ) : children}
      </a>
    );
  }

  // Default button rendering
  return (
    <button
      type={type}
      className={`${baseClasses} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {children}
        </div>
      ) : children}
    </button>
  );
}
