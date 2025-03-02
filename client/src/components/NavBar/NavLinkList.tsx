import React from 'react';
import { Link } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import NavLinkItem from './NavLinkItem';

const NAV_LINKS = [
  { to: '/Home', label: 'Home' },
  { to: '/Ranking', label: 'Ranking' },
];

const NavLinkList: React.FC = () => {
  const logout = useLogout();
  return (
    <ul className="navbar-nav">
      {NAV_LINKS.map(({ to, label }) => (
        <NavLinkItem key={to} to={to} label={label} />
      ))}
      <NavLinkItem label="Logout" onClick={logout} />
    </ul>
  );
};

export default NavLinkList;
