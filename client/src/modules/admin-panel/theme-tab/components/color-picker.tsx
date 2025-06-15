import React, { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

interface ColorPickerProps {
	initialColor?: string;
	onChange?: (color: string) => void;
}

/**
 * ColorPicker component
 *
 * A reusable hex colour picker component built with `react-colorful`.
 * It allows users to select a colour and optionally propagates the selected value via a callback.
 *
 * @param initialColor - Optional initial hex colour (defaults to white)
 * @param onChange - Optional callback invoked when the colour changes
 */
const ColorPicker: React.FC<ColorPickerProps> = ({
	initialColor = '#ffffff',
	onChange
}) => {
	const [color, setColor] = useState(initialColor);

	// Update internal state when `initialColor` prop changes
	useEffect(() => {
		setColor(initialColor);
	}, [initialColor]);

	/**
	 * Handles updates from the colour picker and notifies parent component if needed
	 *
	 * @param newColor - The new selected hex colour string
	 */
	const handleChange = (newColor: string) => {
		setColor(newColor);
		if (onChange) onChange(newColor);
	};

	return <HexColorPicker color={color} onChange={handleChange} />;
};

export default ColorPicker;
