import React, { useState } from 'react';
import '../../styles/dropdown.css';

/**
 * Props for the Dropdown component.
 *
 * @property {string[]} options - List of selectable string options.
 * @property {string} placeholder - Text to display when no option is selected.
 * @property {(value: string) => void} onChange - Callback executed when an option is selected.
 */
interface DropdownProps {
  options: string[];
  placeholder: string;
  onChange: (value: string) => void;
}

/**
 * Dropdown is a functional component that allows the user to choose one option from a list.
 * It displays a button showing the selected value or a placeholder when no value is selected.
 * When the user clicks the button, a dropdown list of options appears.
 */
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
        {selectedOption || placeholder} ▼
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
