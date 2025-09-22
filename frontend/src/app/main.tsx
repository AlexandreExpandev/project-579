import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import '@/assets/styles/globals.css';

/**
 * @entry main
 * @summary Main React application entry point.
 * Initializes React and mounts application to DOM.
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
