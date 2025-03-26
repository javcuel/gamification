import React from 'react';
import { logout } from '../../../api/user';
import { ROLES } from '../../../constants/roles';
import { ROUTES } from '../../../constants/routes';
import NavLinkItem from './NavLinkItem';

interface NavLinkProps {
  role: string;
}

const NAV_LINKS = [
  { to: ROUTES.HOME, label: 'Home' },
  { to: ROUTES.RANKING, label: 'Ranking' },
];

const NavLinkList: React.FC<NavLinkProps> = ({ role }) => {
  return (
    <ul className="navbar-nav">
      {NAV_LINKS.map(({ to, label }) => (
        <NavLinkItem key={to} to={to} label={label} />
      ))}

      {role === ROLES.ADMIN && (
        <NavLinkItem to={ROUTES.ADMIN_PANEL} label="Admin" />
      )}

      {role === ROLES.DEV && <NavLinkItem to={ROUTES.DEV_PANEL} label="Dev" />}

      <NavLinkItem label="Logout" onClick={() => logout()} />
    </ul>
  );
};

export default NavLinkList;
