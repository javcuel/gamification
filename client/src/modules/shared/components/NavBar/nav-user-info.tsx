import React, { useContext } from 'react';
import { ROLES } from '../../../../constants/roles';
import { ThemeContext } from '../../../../context/theme-context';
import Icon from '../ui/icon';

interface NavUserInfoProps {
  name: string;
  role: string;
  totalScore: number;
  completedSubjects: number;
}

const NavUserInfo: React.FC<NavUserInfoProps> = ({
  name,
  role,
  totalScore,
  completedSubjects,
}) => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return null;
  }

  const { theme } = themeContext;

  const roleLabels: Record<string, string> = {
    [ROLES.TEACHER]: 'Teacher',
    [ROLES.ADMIN]: 'Admin',
    [ROLES.DEV]: 'Dev',
    [ROLES.PLAYER]: 'Player',
    [ROLES.GUEST]: 'Guest',
  };

  const displayRole = roleLabels[role] || role;

  return (
    <span className="ms-auto">
      {displayRole} : {name}
      <span className="ms-3 me-3">{totalScore}</span>
      <Icon img={theme.pointsIcon} />
      <span className="ms-3 me-3">{completedSubjects}</span>
      <Icon img={theme.completedSubjectsIcon} />
    </span>
  );
};

export default NavUserInfo;
