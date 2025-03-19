import React, { useState } from 'react';

import '../styles/Dropdown.css';

interface DropdownProps {
  options: string[];
  selected?: string;
  onSelect: (option: string) => void;
  placeholder?: string;
}

/**
 * A dropdown component that displays a list of options and allows the user to select one.
 * The selected option is passed to the `onSelect` callback, and the dropdown can display a
 * placeholder when no option is selected.
 *
 * @component
 * @example
 * // Example usage:
 * <Dropdown
 *   options={['Option 1', 'Option 2', 'Option 3']}
 *   selected="Option 1"
 *   onSelect={(option) => console.log(option)}
 * />
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string[]} props.options - An array of options to display in the dropdown.
 * @param {string} [props.selected] - The currently selected option, or undefined if no option is selected.
 * @param {Function} props.onSelect - A callback function that is called when an option is selected.
 * @param {string} [props.placeholder='Select an option'] - The placeholder text displayed when no option is selected.
 *
 * @returns {JSX.Element} A dropdown component that allows users to select an option.
 */
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
      <button onClick={() => setIsOpen(!isOpen)} className="dropdown">
        {selected || placeholder}
        <span className="ml-2">▼</span>
      </button>

      {isOpen && (
        <ul>
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
