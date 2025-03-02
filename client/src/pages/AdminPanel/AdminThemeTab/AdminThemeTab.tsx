import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import ColorPicker from './ColorPicker';

//TODO: CAMBIAR BOTON TEMPORAL POR BOTON ERSONALIZADO DE UI COMPONENTES
const AdminThemeTab: React.FC = () => {
  const [colors, setColors] = useState({
    primary: '#ff0000',
    secondary: '#00ff00',
    text: '#0000ff',
  });

  const handleSave = () => {
    // Cambiar las variables CSS en el documento
    document.documentElement.style.setProperty('--primary', colors.primary);
    document.documentElement.style.setProperty('--secondary', colors.secondary);
    document.documentElement.style.setProperty('--text', colors.text);

    // Aquí puedes hacer la llamada a tu backend para guardar estos colores
    // y asegurarte de que persistan en futuras sesiones de los usuarios.
    // Ejemplo con fetch:
    /*
      fetch('/api/save-colors', {
        method: 'POST',
        body: JSON.stringify(colors),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    */
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
            <div
              className="col-12 col-sm-4 d-flex flex-column align-items-center
            "
            >
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
