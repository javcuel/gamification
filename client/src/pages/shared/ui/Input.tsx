import React from 'react';

import '../styles/Input.css';

type InputProps = {
  placeholder: string;
  type: 'text' | 'password';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

/**
 * A controlled input component that can handle text or password input types.
 * It accepts a `placeholder`, `value`, and `onChange` callback to manage the state of the input.
 *
 * @component
 * @example
 * // Example usage:
 * <Input
 *   placeholder="Enter your username"
 *   type="text"
 *   value={username}
 *   onChange={(e) => setUsername(e.target.value)}
 * />
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.placeholder - The placeholder text to display in the input field.
 * @param {'text' | 'password'} props.type - The type of the input, either 'text' or 'password'.
 * @param {string} props.value - The current value of the input field.
 * @param {Function} props.onChange - A callback function that is called when the input value changes.
 *
 * @returns {JSX.Element} An `input` element with the specified properties.
 */
const Input: React.FC<InputProps> = ({
  placeholder,
  type,
  value,
  onChange,
}) => {
  return (
    <>
      <input
        type={type}
        className="input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
    </>
  );
};

export default Input;
