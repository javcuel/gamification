import React from 'react';

import '../../styles/input.css';

export type InputType = 'text' | 'password';

/**
 * Props for a input component.
 *
 * @property {string} placeholder - Placeholder of the input.
 * @property {InputType} type - Input type.
 * @property {string | number} - The current value of the input.
 * @property {(e: React.ChangeEvent<HTMLInputElement>) => void} onChange - Callback function triggered when the input value changes.
 */
type InputProps = {
  placeholder: string;
  type: InputType;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

/**
 * Input is a functional component that can handle text or password input types.
 * It accepts a `placeholder`, `value`, and `onChange` callback to manage the state of the input.
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
