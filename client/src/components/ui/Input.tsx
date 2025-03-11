import '../../styles/Input.css';
import React from 'react';

type InputProps = {
  placeholder: string;
  type: 'text' | 'password';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

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
