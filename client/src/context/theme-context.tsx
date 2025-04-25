import React, { createContext, useEffect, useState } from 'react';
import { Theme } from '../api/domain/theme';
import { themeRepository } from '../api/repository/theme.repository';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  createTheme: (newTheme: Theme) => Promise<void>;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [error, setError] = useState<string | null>(null);

  const applyTheme = (newTheme: Theme) => {
    document.documentElement.style.setProperty('--primary', newTheme.primary);
    document.documentElement.style.setProperty(
      '--secondary',
      newTheme.secondary
    );
    document.documentElement.style.setProperty('--text', newTheme.text);
  };

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

  const handleCreateTheme = async (newTheme: Theme) => {
    try {
      await themeRepository.create(newTheme);
      setTheme(newTheme);
      applyTheme(newTheme);
    } catch (error) {
      console.error('Error creating theme:', error);
    }
  };

  if (!theme) return null; //TODO: meter un loader aqui

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, createTheme: handleCreateTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
