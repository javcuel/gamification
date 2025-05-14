import React, { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

interface ColorPickerProps {
  initialColor?: string;
  onChange?: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  initialColor = '#ffffff',
  onChange,
}) => {
  const [color, setColor] = useState(initialColor);

  useEffect(() => {
    setColor(initialColor);
  }, [initialColor]);

  const handleChange = (newColor: string) => {
    setColor(newColor);
    if (onChange) onChange(newColor);
  };

  return <HexColorPicker color={color} onChange={handleChange} />;
};

export default ColorPicker;
