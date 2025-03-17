import React from 'react';

import BoltIcon from '../ui/BoltIcon';
import StarIcon from '../ui/StarIcon';

interface NavUserInfoProps {
  name: string;
  type: string;
  totalScore: number;
  completedSubjects: number;
}

const UserInfoDisplay: React.FC<NavUserInfoProps> = ({
  name,
  type,
  totalScore,
  completedSubjects,
}) => {
  return (
    <span className="ms-auto">
      {type} : {name}
      <span className=" ms-3">
        <BoltIcon className="me-1" />
        {totalScore}
      </span>
      <span className=" ms-3 ">
        <StarIcon className="me-1" />
        {completedSubjects}
      </span>
    </span>
  );
};

export default UserInfoDisplay;
