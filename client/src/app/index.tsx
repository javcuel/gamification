import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import '../styles/index.css';
import App from './App';

/**
 * Entry point for the React application.
 * @description This file initializes the React app and renders the root component (`App`) into the DOM.
 * It also sets up global context providers, such as `AuthProvider`, and applies `StrictMode` for debugging.
 */

const rootElement = document.getElementById('root');

if (rootElement) {
  /**
   * Create a React root and render the application.
   * - Wraps the app in `StrictMode` for highlighting potential issues in development.
   * - Wraps the app in `AuthProvider` to manage global authentication state.
   */
  createRoot(rootElement).render(
    <StrictMode>
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </StrictMode>,
  );
}
