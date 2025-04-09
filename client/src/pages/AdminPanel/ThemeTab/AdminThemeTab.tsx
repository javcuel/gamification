import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import Button from '../../shared/ui/Button';
import Input from '../../shared/ui/Input';
import ColorPicker from './ColorPicker';

const AdminThemeTab: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error(
      'ThemeContext is undefined, make sure you are inside the ThemeProvider'
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
        pointsIcon: '',
        completedSubjectsIcon: '',
      });
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  const handleColorChange = (colorType: string, newColor: string) => {
    setColors({ ...colors, [colorType]: newColor });
  };

  return (
    <div className="container-fluid" style={{ minHeight: '100%' }}>
      <div className="row d-flex flex-wrap justify-content-center">
        {/* Color Pickers */}
        <div className="col-12 col-md-4 d-flex flex-column align-items-center">
          <div className="d-flex flex-column align-items-center">
            <div className="mb-3">
              <ColorPicker
                initialColor={colors.primary}
                onChange={(c) => handleColorChange('primary', c)}
              />
            </div>

            <Input
              placeholder="#Primary"
              type="text"
              value={colors.primary}
              onChange={(e) => handleColorChange('primary', e.target.value)}
            />
            <p className="mt-2">Primary</p>
          </div>
        </div>
        <div className="col-12 col-md-4 d-flex flex-column align-items-center">
          <div className="d-flex flex-column align-items-center">
            <div className="mb-3">
              <ColorPicker
                initialColor={colors.secondary}
                onChange={(c) => handleColorChange('secondary', c)}
              />
            </div>

            <Input
              placeholder="#Secondary"
              type="text"
              value={colors.secondary}
              onChange={(e) => handleColorChange('secondary', e.target.value)}
            />
            <p className="mt-2">Secondary</p>
          </div>
        </div>
        <div className="col-12 col-md-4 d-flex flex-column align-items-center">
          <div className="d-flex flex-column align-items-center">
            <div className="mb-3">
              <ColorPicker
                initialColor={colors.text}
                onChange={(c) => handleColorChange('text', c)}
              />
            </div>

            <Input
              placeholder="#Text"
              type="text"
              value={colors.text}
              onChange={(e) => handleColorChange('text', e.target.value)}
            />
            <p className="mt-2">Text</p>
          </div>
        </div>

        {/* Vista previa TODO: QUIZA SACARLO A UN COMPONENTE EXTERNO?*/}
        <div className="col-12 col-md-6 d-flex flex-column align-items-center mt-4">
          <h2>Preview</h2>
          <div
            className="rounded shadow p-4 mt-3 d-flex flex-column align-items-center"
            style={{
              backgroundColor: colors.primary,
              color: colors.text,
              maxWidth: '400px',
              width: '100%',
            }}
          >
            <p className="mb-2">Gamispace</p>

            <button
              className="px-4 py-2 "
              style={{
                backgroundColor: colors.secondary,
                color: colors.text,
                border: 'none',
                borderRadius: '15px',
              }}
            >
              Button
            </button>
          </div>
        </div>
      </div>

      {/* Botón Guardar */}
      <div className="row d-flex justify-content-center mt-4">
        <div className="col-auto">
          <Button text="Save" onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default AdminThemeTab;
