import React, { useContext } from 'react';
import { ROLES } from '../../../../constants/roles';
import { ThemeContext } from '../../../../context/theme-context';
import Icon from '../ui/Icon';

// Props expected by the NavUserInfo component.
interface NavUserInfoProps {
	name: string;
	role: string;
	totalScore: number;
	completedSubjects: number;
}

/**
 * Displays user information in the navigation bar,
 * including role, name, total score, and completed subjects.
 * Icons are rendered using the current theme context.
 *
 * @param name - The user's name.
 * @param role - The user's role (used to determine label).
 * @param totalScore - The user's total score.
 * @param completedSubjects - The number of subjects completed by the user.
 */
const NavUserInfo: React.FC<NavUserInfoProps> = ({
	name,
	role,
	totalScore,
	completedSubjects
}) => {
	const themeContext = useContext(ThemeContext);

	// Do not render anything if theme context is unavailable.
	if (!themeContext) {
		return null;
	}

	const { theme } = themeContext;

	// Mapping of internal role values to display labels.
	const roleLabels: Record<string, string> = {
		[ROLES.TEACHER]: 'Teacher',
		[ROLES.ADMIN]: 'Admin',
		[ROLES.DEV]: 'Dev',
		[ROLES.PLAYER]: 'Player',
		[ROLES.GUEST]: 'Guest'
	};

	// Fallback to raw role string if no label mapping is found.
	const displayRole = roleLabels[role] || role;

	return (
		<span className='ms-auto'>
			{/* Display user role and name */}
			{displayRole} : {name}
			{/* Display total score with corresponding themed icon */}
			<span className='ms-3 me-3'>{totalScore}</span>
			<Icon img={theme.pointsIcon} />
			{/* Display completed subjects count with icon */}
			<span className='ms-3 me-3'>{completedSubjects}</span>
			<Icon img={theme.completedSubjectsIcon} />
		</span>
	);
};

export default NavUserInfo;
