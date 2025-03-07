import React from 'react';
import useUserInfo from '../../hooks/useUserInfo';
import '../../styles/NavBar.css';
import NavLinksList from './NavLinkList';
import NavUserInfo from './NavUserInfo';

interface NavBarProps {
  webName?: string;
}

//TODO: REalizar la llamada a fetchuserinfo
const NavBar: React.FC<NavBarProps> = ({ webName = 'Gamispace' }) => {
  const { name, type, totalScore, completedSubjects } = useUserInfo();

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
          {/* TODO: Aqui habria que poner esto
          
          <NavLinks userType={type}/> */}

          <NavLinksList userType="Admin" />
          <NavUserInfo
            name={name}
            type={type}
            totalScore={totalScore}
            completedSubjects={completedSubjects}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
