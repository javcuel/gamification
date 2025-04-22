import React, { useContext } from 'react';
import { ThemeContext } from '../../../../context/theme-context';
import Icon from '../ui/Icon';

interface NavUserInfoProps {
  name: string;
  role: string;
  totalScore: number;
  completedSubjects: number;
}

const UserInfoDisplay: React.FC<NavUserInfoProps> = ({
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

  return (
    <span className="ms-auto">
      {role} : {name}
      <span className="ms-3 me-3">{totalScore}</span>
      <Icon img={theme.pointsIcon} />
      <span className="ms-3 me-3">{completedSubjects}</span>
      <Icon img={theme.completedSubjectsIcon} />
    </span>
  );
};

export default UserInfoDisplay;
