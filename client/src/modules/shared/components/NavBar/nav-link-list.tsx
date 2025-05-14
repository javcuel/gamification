import React from 'react';
import { ROLES } from '../../../../constants/roles';
import { ROUTES } from '../../../../constants/routes';
import { useAuth } from '../../../../context/auth-context';
import LinkItem from '../ui/link-item';

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
        <LinkItem key={to} to={to} label={label} />
      ))}

      {role === ROLES.ADMIN && (
        <LinkItem to={ROUTES.ADMIN_PANEL} label="Admin" />
      )}

      {role === ROLES.DEV && <LinkItem to={ROUTES.DEV_PANEL} label="Dev" />}

      <LinkItem label="Logout" onClick={logoutRequest} />
    </ul>
  );
};

export default NavLinkList;
