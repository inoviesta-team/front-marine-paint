// src/scripts/navigation.js

// This script adds event listeners for the Astro view transitions lifecycle events
document.addEventListener('astro:page-load', () => {
  console.log('Page loaded completely');
});

document.addEventListener('astro:after-swap', () => {
  console.log('New page content swapped in');
  
  // You could do any DOM updates here that should happen right after
  // the new page content is loaded
});

// This allows us to scroll to the top when navigating to a new page
document.addEventListener('astro:before-swap', () => {
  // You can store the scroll position or do any preparations
  // before the new page is swapped in
});

// Define a custom animation to use with transition:animate
const customSlide = {
  forwards: {
    old: [
      {
        name: 'slide-to-left',
        duration: '0.4s',
        easing: 'ease-out',
        fillMode: 'forwards'
      }
    ],
    new: [
      {
        name: 'slide-from-right',
        duration: '0.4s',
        easing: 'ease-out',
        fillMode: 'backwards'
      }
    ]
  },
  backwards: {
    old: [
      {
        name: 'slide-from-right', 
        duration: '0.4s',
        direction: 'reverse',
        easing: 'ease-in',
        fillMode: 'forwards'
      }
    ],
    new: [
      {
        name: 'slide-to-left',
        duration: '0.4s',
        direction: 'reverse',
        easing: 'ease-in',
        fillMode: 'backwards'
      }
    ]
  }
};

// Make custom animations available globally
if (typeof window !== 'undefined') {
  window.customSlide = customSlide;
}
