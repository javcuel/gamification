import React, { createContext, useEffect, useState } from 'react';
import httpClient from '../adapters/api/httpClient';

interface Theme {
  primary: string;
  secondary: string;
  text: string;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  updateTheme: (newTheme: Theme) => Promise<void>;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>({
    primary: '#ffffff',
    secondary: '#000000',
    text: '#333333',
  });

  // Función para actualizar las variables CSS en el documento
  const applyTheme = (newTheme: Theme) => {
    document.documentElement.style.setProperty('--primary', newTheme.primary);
    document.documentElement.style.setProperty(
      '--secondary',
      newTheme.secondary,
    );
    document.documentElement.style.setProperty('--text', newTheme.text);
  };

  // Obtener el tema desde el backend al iniciar la app
  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const data = await httpClient.get('/theme'); // Usa httpClient en lugar de fetch
        if (data) {
          const newTheme = {
            primary: data.primary_color,
            secondary: data.secondary_color,
            text: data.text_color,
          };
          setTheme(newTheme);
          applyTheme(newTheme);
        }
      } catch (error) {
        console.error('Error al obtener el tema:', error);
      }
    };

    fetchTheme();
  }, []);

  // Función para actualizar el tema en el backend y aplicarlo en la app
  const updateTheme = async (newTheme: Theme) => {
    try {
      await httpClient.post('/theme/update', newTheme);
      setTheme(newTheme);
      applyTheme(newTheme);
    } catch (error) {
      console.error('Error al actualizar el tema:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
