// Initialize dark mode from localStorage
// This script must run immediately to prevent flash of wrong theme
(function() {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } else {
    // Default to dark as per original design
    document.documentElement.classList.add('dark');
  }
})();
