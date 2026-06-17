import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { AuthProvider } from '../context/auth-context';
import { ThemeProvider } from '../context/theme-context';
import SpaceBackground from '../modules/shared/components/ui/space-background';
import routes from './Routes';

/**
 * AppRoutes component
 *
 * Handles the route matching using `useRoutes` based on the provided routes configuration.
 * This is separated for clarity and to allow composition with other providers or UI elements.
 *
 * @returns React element representing the current route based on the route definitions.
 */
const AppRoutes = () => {
	const element = useRoutes(routes);
	return element;
};

/**
 * App component
 *
 * Root-level component that sets up global providers and routing.
 * - Wraps the application in `BrowserRouter` to enable client-side routing.
 * - Includes `AuthProvider` to supply authentication context across the app.
 * - Includes `ThemeProvider` to manage and provide theme-related state.
 * - Renders a background UI component for consistent visual design.
 * - Renders the application's route-based content via `AppRoutes`.
 *
 * @returns The top-level React component of the application.
 */
const App: React.FC = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<ThemeProvider>
					<SpaceBackground />
					<AppRoutes />
				</ThemeProvider>
			</AuthProvider>
		</BrowserRouter>
	);
};

export default App;
