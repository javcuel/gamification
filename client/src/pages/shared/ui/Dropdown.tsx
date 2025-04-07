import React, { useState } from 'react';
import '../styles/Dropdown.css';

// 👇 Añadir prop onChange
interface DropdownProps {
  options: string[];
  placeholder: string;
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="custom-dropdown">
      <button
        type="button"
        className="custom-dropdown-btn"
        onClick={toggleDropdown}
      >
        {selectedOption || `${placeholder} ▼`}
      </button>

      <ul className={`custom-dropdown-list ${isOpen ? 'open' : ''}`}>
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
    </div>
  );
};

export default Dropdown;
