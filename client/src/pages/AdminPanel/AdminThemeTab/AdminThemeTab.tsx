import React, { useContext, useState } from 'react';
import Button from '../../../components/ui/Button';
import { ThemeContext } from '../../../context/ThemeContext'; // Asegúrate de importar el ThemeContext
import ColorPicker from './ColorPicker';

const AdminThemeTab: React.FC = () => {
  const themeContext = useContext(ThemeContext); // Obtener el contexto

  // Asegurarnos de que el contexto esté definido
  if (!themeContext) {
    throw new Error(
      'ThemeContext is undefined, make sure you are inside the ThemeProvider',
    );
  }

  const { updateTheme } = themeContext; // Extraer setTheme y updateTheme de themeContext
  const [colors, setColors] = useState({
    primary: '#2a2d3d',
    secondary: '#4f5be5',
    text: '#d2d7e1',
  });

  // Función para manejar el guardado del tema
  const handleSave = async () => {
    try {
      // Solo llamamos a updateTheme para actualizar y guardar el tema
      await updateTheme({
        primary: colors.primary,
        secondary: colors.secondary,
        text: colors.text,
      });

      console.log('Colores guardados y aplicados');
    } catch (error) {
      console.error('Error al guardar los colores:', error);
    }
  };

  return (
    <div className="container min-vh-100 d-flex flex-column align-items-center text-center py-4">
      <div className="row w-100">
        <div className="col-md-8">
          <div className="row g-3">
            <div className="col-12 col-sm-4 d-flex flex-column align-items-center">
              <ColorPicker
                initialColor={colors.primary}
                onChange={(c) => setColors({ ...colors, primary: c })}
              />
              <p className="mt-2">Primario</p>
            </div>
            <div className="col-12 col-sm-4 d-flex flex-column align-items-center">
              <ColorPicker
                initialColor={colors.secondary}
                onChange={(c) => setColors({ ...colors, secondary: c })}
              />
              <p className="mt-2">Secundario</p>
            </div>
            <div className="col-12 col-sm-4 d-flex flex-column align-items-center">
              <ColorPicker
                initialColor={colors.text}
                onChange={(c) => setColors({ ...colors, text: c })}
              />
              <p className="mt-2">Texto</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 d-flex flex-column align-items-center">
          <h2>Vista previa</h2>
          <div
            className="w-100 rounded shadow p-4 mt-3 d-flex flex-column align-items-center"
            style={{ backgroundColor: colors.primary, color: colors.text }}
          >
            <p className="mb-2">Ejemplo de tema</p>
            <button
              className="px-4 py-2 rounded border-0"
              style={{ backgroundColor: colors.secondary, color: colors.text }}
            >
              Botón de ejemplo
            </button>
          </div>
        </div>

        <div>
          <Button text="Guardar" onClick={handleSave}></Button>
        </div>
      </div>
    </div>
  );
};

export default AdminThemeTab;
