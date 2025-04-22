import React from 'react';

import '../styles/Button.css';

void React;

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

/**
 * A simple button component that accepts a `text` prop to display the button's label
 * and an optional `onClick` handler to define the button's click behavior.
 *
 * @component
 * @example
 * // Example usage
 * <Button text="Click me" onClick={() => console.log('Button clicked')} />
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.text - The label of the button.
 * @param {Function} [props.onClick] - Optional function that is called when the button is clicked.
 *
 * @returns {JSX.Element} A button element with the specified text and click handler.
 */
const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
