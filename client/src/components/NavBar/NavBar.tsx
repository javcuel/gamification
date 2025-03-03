import React from 'react';
import useUserInfo from '../../hooks/useUserInfo';
import '../../styles/NavBar.css';
import NavLinks from './NavLinkList';
import NavUserInfo from './NavUserInfo';

interface NavBarProps {
  webName?: string;
  userName: string;
  userType: string;
  userTotalScore: number;
  userCompletedSubjects: number;
}

//TODO: REalizar la llamada a fetchuserinfo
const NavBar: React.FC<NavBarProps> = ({
  webName = 'Gamispace',
  userName,
  userType,
  userTotalScore,
  userCompletedSubjects,
}) => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand">{webName}</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <NavLinks />
          <NavUserInfo
            name={userName}
            type={userType}
            totalScore={userTotalScore}
            completedSubjects={userCompletedSubjects}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
