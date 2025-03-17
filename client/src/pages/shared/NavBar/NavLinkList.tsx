import React from 'react';
import useLogout from '../../../hooks/useLogout';
import NavLinkItem from './NavLinkItem';

interface NavLinkProps {
  userType: string;
}

const NAV_LINKS = [
  { to: '/Home', label: 'Home' },
  { to: '/Ranking', label: 'Ranking' },
];

const NavLinkList: React.FC<NavLinkProps> = ({ userType }) => {
  const logout = useLogout();
  return (
    <ul className="navbar-nav">
      {NAV_LINKS.map(({ to, label }) => (
        <NavLinkItem key={to} to={to} label={label} />
      ))}

      {userType === 'Admin' && <NavLinkItem to="/AdminPanel" label="Admin" />}

      <NavLinkItem label="Logout" onClick={logout} />
    </ul>
  );
};

export default NavLinkList;
