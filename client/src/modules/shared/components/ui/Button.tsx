import {
	faEye,
	faEyeSlash,
	faLock,
	faPencilAlt,
	faTimes,
	faUnlock,
	faPlus
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import '../../styles/Button.css';

/**
 * Posible button types:
 *
 * - `'edit'`: Shows pencil icon.
 * - `'delete'`: Shows delete icon (X).
 * - `'lock'`: Shows closed lock icon.
 * - `'unlock'`: Shows open lock icon.
 * - `'visible'`: Shows open eye icon.
 * - `'hidden'`: Shows closed eye icon.
 * - `'add'`: Shows plus icon (+)
 */
export type ButtonType =
	| 'edit'
	| 'delete'
	| 'lock'
	| 'unlock'
	| 'visible'
	| 'hidden'
	| 'add';

/**
 * Props for the Button component.
 *
 * @property {string} [text] - Text to display inside the button. Ignored if a `type` with an icon is provided.
 * @property {() => void} [onClick] - Function to call when the button is clicked.
 * @property {ButtonType} [type] - Button type that determines which icon to show.
 * @property {boolean} [disabled] - Whether the button is disabled.
 */
export interface ButtonProps {
	text?: string;
	onClick?: () => void;
	type?: ButtonType;
	disabled?: boolean;
}

/**
 * Button is a functional component that can display text or an icon depending on the type.
 * Uses icons from FontAwesome.
 */
const Button: React.FC<ButtonProps> = ({ text, onClick, type, disabled }) => {
	const getIcon = () => {
		switch (type) {
			case 'edit':
				return faPencilAlt;
			case 'delete':
				return faTimes;
			case 'lock':
				return faLock;
			case 'unlock':
				return faUnlock;
			case 'visible':
				return faEye;
			case 'hidden':
				return faEyeSlash
			case 'add':
				return faPlus;
			default:
				return null;
		}
	};

	const icon = getIcon();

	return (
		<button
			className={`button ${icon ? 'button-icon' : ''}`}
			onClick={onClick}
			disabled={disabled}
		>
			{icon ? <FontAwesomeIcon icon={icon} /> : text}
		</button>
	);
};

export default Button;
