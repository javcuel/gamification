import React, { createContext, useEffect, useState } from 'react';
import { createTheme, fetchTheme, Theme } from '../api/theme';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  updateTheme: (newTheme: Theme) => Promise<void>;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>({
    id: 1,
    primary: '#ffffff',
    secondary: '#000000',
    text: '#333333',
    pointsIcon: 'image/no_image.jpg',
    completedSubjectsIcon: 'image/no_image.jpg',
  });

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
      const newTheme = await fetchTheme();
      if (newTheme) {
        setTheme(newTheme);
        applyTheme(newTheme);
      }
    };

    loadTheme();
  }, []);

  const handleUpdateTheme = async (newTheme: Theme) => {
    try {
      await createTheme(newTheme);
      setTheme(newTheme);
      applyTheme(newTheme);
    } catch (error) {
      console.error('Error al actualizar el tema:', error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, updateTheme: handleUpdateTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
