import React, { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import Input from '../../../shared/components/ui/Input';


interface ColorPickerInputProps {
	label: string;
	initialColor?: string;
	onChange?: (color: string) => void;
}

/**
 * ColorPickerInput component
 *
 * Renders a hex colour picker along with a text input, allowing the user to select
 * or enter a custom hex colour code. Updates are propagated through the `onChange` callback.
 *
 * @param label - A descriptive label displayed below the input
 * @param initialColor - The initial colour value (default is white)
 * @param onChange - Callback to propagate the selected colour
 */
const ColorPickerInput: React.FC<ColorPickerInputProps> = ({
	label,
	initialColor = '#ffffff',
	onChange
}) => {
	const [color, setColor] = useState(initialColor);

	// Sync internal state with prop when initial colour changes
	useEffect(() => {
		setColor(initialColor);
	}, [initialColor]);

	/**
	 * handleColorChange
	 *
	 * Updates internal state and calls the external onChange handler with the new colour.
	 *
	 * @param newColor - The hex colour string selected from the picker
	 */
	const handleColorChange = (newColor: string) => {
		setColor(newColor);
		onChange?.(newColor);
	};

	/**
	 * handleInputChange
	 *
	 * Handles user input from the text field and propagates the new colour.
	 *
	 * @param e - Input change event containing the new hex colour
	 */
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newColor = e.target.value;
		setColor(newColor);
		onChange?.(newColor);
	};

	return (
		<div className='d-flex flex-column align-items-center'>
			{/* Hex colour picker UI */}
			<div className='mb-3'>
				<HexColorPicker color={color} onChange={handleColorChange} />
			</div>

			{/* Manual hex input field */}
			<Input
				placeholder={`#${label}`}
				type='text'
				value={color}
				onChange={handleInputChange}
			/>

			{/* Descriptive label below input */}
			<p className='mt-2'>{label}</p>
		</div>
	);
};

export default ColorPickerInput;
