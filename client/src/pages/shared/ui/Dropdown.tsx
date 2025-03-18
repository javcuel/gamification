import React, { useState } from 'react';
import '../styles/Dropdown.css';

interface DropdownProps {
  options: string[];
  selected?: string;
  onSelect: (option: string) => void;
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selected,
  onSelect,
  placeholder = 'Select an option',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Botón principal */}
      <button onClick={() => setIsOpen(!isOpen)} className="dropdown">
        {selected || placeholder}
        <span className="ml-2">▼</span>
      </button>

      {/* Opciones desplegables */}
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option) => (
            <li
              className="dropdown-list-item"
              key={option}
              onClick={() => handleSelect(option)}
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
