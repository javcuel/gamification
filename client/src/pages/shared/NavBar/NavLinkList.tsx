import React from 'react';
import useLogout from '../../../hooks/useLogout';
import NavLinkItem from './NavLinkItem';
import { ROLES } from '../../../constants/roles';
import { ROUTES } from '../../../constants/routes';

interface NavLinkProps {
  userType: string;
}

const NAV_LINKS = [
  { to: ROUTES.HOME, label: 'Home' },
  { to: ROUTES.RANKING, label: 'Ranking' },
];

const NavLinkList: React.FC<NavLinkProps> = ({ userType }) => {
  const logout = useLogout();
  return (
    <ul className="navbar-nav">
      {NAV_LINKS.map(({ to, label }) => (
        <NavLinkItem key={to} to={to} label={label} />
      ))}

      {userType === ROLES.ADMIN && (
        <NavLinkItem to={ROUTES.ADMIN_PANEL} label="Admin" />
      )}

      {userType === ROLES.DEV && (
        <NavLinkItem to={ROUTES.DEV_PANEL} label="Dev" />
      )}

      <NavLinkItem label="Logout" onClick={logout} />
    </ul>
  );
};

export default NavLinkList;
