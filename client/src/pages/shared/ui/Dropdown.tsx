import React, { useState } from 'react';
import '../styles/Dropdown.css';

interface DropdownProps {
  options: string[];
  placeholder: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false); // Cerrar el dropdown después de seleccionar una opción
  };

  return (
    <div className="custom-dropdown">
      <button
        type="button"
        className="custom-dropdown-btn"
        onClick={toggleDropdown}
      >
        {selectedOption || placeholder}
      </button>
      {isOpen && (
        <ul className="custom-dropdown-list">
          {options.map((option, index) => (
            <li
              key={index}
              className="custom-dropdown-item"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
