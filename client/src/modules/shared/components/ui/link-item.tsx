import React from 'react';
import { Link } from 'react-router-dom';

import '../../styles/link-item.css';

/**
 * Props for the LinkItem component.
 *
 * @property {string} [to] - Optional path to navigate. If provided, renders a React Router Link.
 * @property {string} label - Text to be displayed inside the navigation item.
 * @property {() => void} [onClick] - Optional click handler. Used when `to` is not provided.
 */
interface LinkItemProps {
  to?: string;
  label: string;
  onClick?: () => void;
}

/**
 * LinkItem is a reusable component that renders a list item
 * as either a navigation link (if `to` is provided) or a clickable span.
 *
 * Useful for building navigation menus that combine routing and actions.
 */
const LinkItem: React.FC<LinkItemProps> = ({ to, label, onClick }) => {
  return (
    <li>
      {to ? (
        <Link className="link-item" to={to}>
          {label}
        </Link>
      ) : (
        <span
          className="link-item"
          onClick={onClick}
          style={{ cursor: 'pointer' }}
        >
          {label}
        </span>
      )}
    </li>
  );
};

export default LinkItem;
