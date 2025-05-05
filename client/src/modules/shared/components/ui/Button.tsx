import {
  faEye,
  faEyeSlash,
  faLock,
  faPencilAlt,
  faTimes,
  faUnlock,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import '../../styles/button.css';

interface ButtonProps {
  text?: string;
  onClick?: () => void;
  type?: 'edit' | 'delete' | 'lock' | 'unlock' | 'visible' | 'hidden';
  disabled?: boolean;
}

/**
 * A flexible button component that can render either text or an icon based on the `type` prop.
 *
 * @component
 * @example
 * <Button type="edit" onClick={handleEdit} />
 * <Button text="Click me" onClick={handleClick} />
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
        return faEyeSlash;
      default:
        return null;
    }
  };

  const icon = getIcon();

  return (
    <button className="button" onClick={onClick} disabled={disabled}>
      {icon ? <FontAwesomeIcon icon={icon} /> : text}
    </button>
  );
};

export default Button;
