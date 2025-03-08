import React, { useContext, useState } from 'react';
import Button from '../../../components/ui/Button';
import { ThemeContext } from '../../../context/ThemeContext'; // Asegúrate de importar el ThemeContext
import ColorPicker from './ColorPicker';

const AdminThemeTab: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error(
      'ThemeContext is undefined, make sure you are inside the ThemeProvider',
    );
  }

  const { updateTheme } = themeContext;
  const [colors, setColors] = useState({
    primary: '#2a2d3d',
    secondary: '#4f5be5',
    text: '#d2d7e1',
  });

  const handleSave = async () => {
    try {
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
    <div className="container-fluid" style={{ minHeight: '100%' }}>
      <div className="row d-flex flex-wrap justify-content-center">
        {/* Color Pickers */}
        <div className="col-12 col-md-4 d-flex flex-column align-items-center">
          <ColorPicker
            initialColor={colors.primary}
            onChange={(c) => setColors({ ...colors, primary: c })}
          />
          <p className="mt-2">Primary</p>
        </div>
        <div className="col-12 col-md-4 d-flex flex-column align-items-center">
          <ColorPicker
            initialColor={colors.secondary}
            onChange={(c) => setColors({ ...colors, secondary: c })}
          />
          <p className="mt-2">Secondary</p>
        </div>
        <div className="col-12 col-md-4 d-flex flex-column align-items-center">
          <ColorPicker
            initialColor={colors.text}
            onChange={(c) => setColors({ ...colors, text: c })}
          />
          <p className="mt-2">Text</p>
        </div>

        {/* Vista previa */}
        <div className="col-12 col-md-6 d-flex flex-column align-items-center mt-4">
          <h2>Preview</h2>
          <div
            className="rounded shadow p-4 mt-3 d-flex flex-column align-items-center"
            style={{
              backgroundColor: colors.primary,
              color: colors.text,
              maxWidth: '400px', // Define el ancho máximo
              width: '100%', // Mantiene la responsividad
            }}
          >
            <p className="mb-2">Gamispace</p>
            <button
              className="px-4 py-2 rounded border-0"
              style={{ backgroundColor: colors.secondary, color: colors.text }}
            >
              Button
            </button>
          </div>
        </div>
      </div>

      {/* Botón Guardar */}
      <div className="row d-flex justify-content-center mt-4">
        <div className="col-auto">
          <Button text="Guardar" onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default AdminThemeTab;
