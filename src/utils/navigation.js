/**
 * Utility function to navigate to a new page using Astro's View Transitions API
 * @param {string} href The URL to navigate to
 * @param {Object} options Optional configuration
 * @param {string} options.history 'push' | 'replace' | 'auto' - How to update browser history
 */
export function navigate(href, options = {}) {
  // Only available in the browser
  if (typeof window === 'undefined' || !window.navigate) {
    console.warn('Navigation function not available');
    
    // Fallback to regular navigation if Astro's navigate is not available
    if (typeof window !== 'undefined') {
      window.location.href = href;
    }
    return;
  }
  
  try {
    // Use Astro's built-in navigate function from the View Transitions API
    window.navigate(href, options);
  } catch (error) {
    console.error('Error navigating:', error);
    
    // Fallback to regular navigation if Astro's navigate throws an error
    window.location.href = href;
  }
}

/**
 * Utility function to check if Astro View Transitions API is available
 * @returns {boolean} Whether the API is available
 */
export function isViewTransitionsSupported() {
  return typeof window !== 'undefined' && 'navigate' in window;
}
