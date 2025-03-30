import { useEffect } from 'react';

/**
 * Custom hook that resets state when navigating between pages
 * @param {Function} resetFunction Function to run when navigation occurs
 */
export function useResetOnNavigate(resetFunction) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    // Function to run when navigation is about to happen
    const handleBeforeSwap = () => {
      if (typeof resetFunction === 'function') {
        resetFunction();
      }
    };

    // Add event listener
    document.addEventListener('astro:before-swap', handleBeforeSwap);

    // Cleanup
    return () => {
      document.removeEventListener('astro:before-swap', handleBeforeSwap);
    };
  }, [resetFunction]);
}
