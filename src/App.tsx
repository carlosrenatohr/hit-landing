import React from 'react';
import { useDarkMode } from './hooks/useDarkMode';
import HomePage from './pages/HomePage';
import TrackingPage from './pages/TrackingPage';

function App() {
  useDarkMode(); // Initialize dark mode (enabled by default)
  
  const path = window.location.hash.replace('#', '') || '/';
  
  let currentPage;
  
  switch(path) {
    case '/track':
      currentPage = <TrackingPage />;
      break;
    case '/':
    default:
      currentPage = <HomePage />;
      break;
  }
  
  return currentPage;
}

export default App;