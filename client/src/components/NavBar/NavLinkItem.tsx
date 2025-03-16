import React from 'react';
import { Link } from 'react-router-dom';

import '../../styles/NavLinkItem.css';

interface NavLinkItemProps {
  to?: string;
  label: string;
  onClick?: () => void;
}

const NavLinkItem: React.FC<NavLinkItemProps> = ({ to, label, onClick }) => {
  return (
    <li className="nav-item">
      {to ? (
        <Link className="nav-link" to={to}>
          {label}
        </Link>
      ) : (
        <span
          className="nav-link"
          onClick={onClick}
          style={{ cursor: 'pointer' }}
        >
          {label}
        </span>
      )}
    </li>
  );
};

export default NavLinkItem;
