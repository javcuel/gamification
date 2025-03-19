import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';

import '../styles/index.css';

void React;

/**
 * Main entry point for the React application.
 * This file initializes the component tree and sets up authentication
 * and theme context, while also enabling React's Strict Mode.
 *
 * @file
 * @module index
 */

/**
 * Root DOM element where the application is mounted.
 * @type {HTMLElement | null}
 */
const rootElement = document.getElementById('root');

if (rootElement) {
  /**
   * Creates the root of the application in the DOM element with id 'root'.
   * StrictMode is used to enable additional checks during development.
   * The components are wrapped with authentication and theme context providers.
   *
   * @returns {void}
   */
  createRoot(rootElement).render(
    <StrictMode>
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </StrictMode>
  );
}
