import React, { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import Input from '../../../shared/components/ui/input';

interface ColorPickerInputProps {
  label: string;
  initialColor?: string;
  onChange?: (color: string) => void;
}

const ColorPickerInput: React.FC<ColorPickerInputProps> = ({
  label,
  initialColor = '#ffffff',
  onChange,
}) => {
  const [color, setColor] = useState(initialColor);

  useEffect(() => {
    setColor(initialColor);
  }, [initialColor]);

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    onChange?.(newColor);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    onChange?.(newColor);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="mb-3">
        <HexColorPicker color={color} onChange={handleColorChange} />
      </div>
      <Input
        placeholder={`#${label}`}
        type="text"
        value={color}
        onChange={handleInputChange}
      />
      <p className="mt-2">{label}</p>
    </div>
  );
};

export default ColorPickerInput;
