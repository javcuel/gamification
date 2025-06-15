import React, { createContext, useEffect, useState } from 'react';
import { Theme } from '../api/domain/theme';
import { themeRepository } from '../api/repository/theme.repository';

/**
 * ThemeContextType interface
 *
 * Describes the shape of the theme context object:
 * - `theme`: The currently active theme.
 * - `setTheme`: Function to update the local theme state.
 * - `createTheme`: Function to persist a new theme and apply it.
 */
interface ThemeContextType {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	createTheme: (newTheme: Theme) => Promise<void>;
}

// Create the ThemeContext with an undefined default value.
export const ThemeContext = createContext<ThemeContextType | undefined>(
	undefined
);

/**
 * ThemeProvider component
 *
 * Provides the current theme and related operations to the component tree.
 * - Loads the theme from an API on mount.
 * - Applies theme properties as CSS variables.
 * - Supports theme creation and updates.
 *
 * @param children - Child components that will have access to the theme context.
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [theme, setTheme] = useState<Theme | null>(null);
	const [error, setError] = useState<string | null>(null);

	/**
	 * applyTheme function
	 *
	 * Updates the CSS variables on the root document element
	 * to reflect the active theme's colour properties.
	 *
	 * @param newTheme - The theme to be applied.
	 */
	const applyTheme = (newTheme: Theme) => {
		document.documentElement.style.setProperty('--primary', newTheme.primary);
		document.documentElement.style.setProperty(
			'--secondary',
			newTheme.secondary
		);
		document.documentElement.style.setProperty('--text', newTheme.text);
	};

	/**
	 * useEffect hook
	 *
	 * Loads the theme on initial mount by calling the theme repository.
	 * Applies the theme to the document once retrieved.
	 * Sets an error message in case of failure.
	 */
	useEffect(() => {
		const loadTheme = async () => {
			try {
				const newTheme = await themeRepository.get();
				setTheme(newTheme);
				applyTheme(newTheme);
			} catch (error: unknown) {
				if (error instanceof Error) {
					setError(error.message);
				} else {
					setError('An unknown error occurred');
				}
			}
		};

		loadTheme();
	}, []);

	/**
	 * handleCreateTheme function
	 *
	 * Persists a new theme to the backend and applies it locally.
	 *
	 * @param newTheme - The theme to be created and applied.
	 */
	const handleCreateTheme = async (newTheme: Theme) => {
		try {
			await themeRepository.create(newTheme);
			setTheme(newTheme);
			applyTheme(newTheme);
		} catch (error) {
			console.error('Error creating theme:', error);
		}
	};

	// Display an error message if the theme fails to load
	if (error) {
		return <div style={{ color: 'red' }}>Error: {error}</div>;
	}

	// Avoid rendering children until the theme is successfully loaded
	if (!theme) return null;

	return (
		<ThemeContext.Provider
			value={{ theme, setTheme, createTheme: handleCreateTheme }}
		>
			{children}
		</ThemeContext.Provider>
	);
};
