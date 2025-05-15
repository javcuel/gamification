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
        <div key={to} className="me-3">
          <LinkItem to={to} label={label} />
        </div>
      ))}

      <div className="me-3">
        {role === ROLES.ADMIN && (
          <LinkItem to={ROUTES.ADMIN_PANEL} label="Admin" />
        )}
      </div>
      <div className="me-3">
        {role === ROLES.DEV && <LinkItem to={ROUTES.DEV_PANEL} label="Dev" />}
        <LinkItem label="Logout" onClick={logoutRequest} />
      </div>
    </ul>
  );
};

export default NavLinkList;
