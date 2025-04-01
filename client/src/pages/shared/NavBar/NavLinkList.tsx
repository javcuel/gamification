import React from 'react';
import { ROLES } from '../../../constants/roles';
import { ROUTES } from '../../../constants/routes';
import { useAuth } from '../../../context/AuthContext';
import NavLinkItem from './NavLinkItem';

interface NavLinkProps {
  role: string;
}

const NAV_LINKS = [
  { to: ROUTES.HOME, label: 'Home' },
  { to: ROUTES.RANKING, label: 'Ranking' },
];

const NavLinkList: React.FC<NavLinkProps> = ({ role }) => {
  const { logoutRequest } = useAuth();

  return (
    <ul className="navbar-nav">
      {NAV_LINKS.map(({ to, label }) => (
        <NavLinkItem key={to} to={to} label={label} />
      ))}

      {role === ROLES.ADMIN && (
        <NavLinkItem to={ROUTES.ADMIN_PANEL} label="Admin" />
      )}

      {role === ROLES.DEV && <NavLinkItem to={ROUTES.DEV_PANEL} label="Dev" />}

      <NavLinkItem label="Logout" onClick={logoutRequest} />
    </ul>
  );
};

export default NavLinkList;
