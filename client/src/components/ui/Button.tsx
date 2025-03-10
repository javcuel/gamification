import '../../styles/Button.css';
import React from 'react';

//TODO: QUE DIFENCIA HAY ENTRE ESTAS DOS OPCIONES
type ButtonProps = {
  text: string;
  onClick?: () => void;
};

/* interface ButtonProps {
  text: String;
} */

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button className="button" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
