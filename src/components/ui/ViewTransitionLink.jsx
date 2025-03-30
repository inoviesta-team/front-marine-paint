import React from 'react';
import { navigate } from '@utils/navigation';

/**
 * A component that uses Astro's View Transitions API for smooth navigation
 */
export default function ViewTransitionLink({ 
  href, 
  children, 
  className = '',
  replace = false,
  onClick,
  ...props 
}) {
  const handleClick = (e) => {
    e.preventDefault();
    
    // Call any additional onClick handler if provided
    if (onClick) onClick(e);
    
    // Use view transitions API to navigate
    navigate(href, { 
      history: replace ? 'replace' : 'push' 
    });
  };

  return (
    <a 
      href={href} 
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}
