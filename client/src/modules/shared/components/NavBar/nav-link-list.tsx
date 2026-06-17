import React from 'react';
import { ROLES } from '../../../../constants/roles';
import { ROUTES } from '../../../../constants/routes';
import { useAuth } from '../../../../context/auth-context';
import LinkItem from '../ui/link-item';

// Props expected by the NavLinkList component.
interface NavLinkProps {
	role: string;
}

// Static list of default navigation links available to all users.
const NAV_LINKS = [
	{ to: ROUTES.HOME, label: 'Home' },
	{ to: ROUTES.RANKING, label: 'Ranking' }
];

/**
 * Renders a list of navigation links based on the user's role.
 * Includes conditional links for admin, teacher, and developer users, as well as a logout option.
 *
 * @param role - The current user's role used to determine access to role-specific links.
 */
const NavLinkList: React.FC<NavLinkProps> = ({ role }) => {
	const { logoutRequest } = useAuth();

	return (
		<ul className='navbar-nav'>
			{/* Render common navigation links */}
			{NAV_LINKS.map(({ to, label }) => (
				<div key={to} className='me-3'>
					<LinkItem to={to} label={label} />
				</div>
			))}

			{/* Render admin-only navigation link */}
			{role === ROLES.ADMIN && (
				<div className='me-3'>
					<LinkItem to={ROUTES.ADMIN_OR_TEACH_PANEL} label='Admin' />
				</div>
			)}

            {/* Render teacher-only navigation link */}
			{role === ROLES.TEACHER && (
				<div className='me-3'>
					<LinkItem to={ROUTES.ADMIN_OR_TEACH_PANEL} label='Management' />
				</div>
			)}

			{/* Render developer-only navigation link */}
			{role === ROLES.DEV && (
				<div className='me-3'>
					<LinkItem to={ROUTES.DEV_PANEL} label='Dev' />
				</div>
			)}

			{/* Logout link */}
			<div className='me-3'>
				<LinkItem label='Logout' onClick={logoutRequest} />
			</div>
		</ul>
	);
};

export default NavLinkList;