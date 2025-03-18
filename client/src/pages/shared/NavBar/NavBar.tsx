import React, { useState } from 'react';
import useUserInfo from '../../../hooks/useUserInfo';
import '../styles/NavBar.css';
import NavLinksList from './NavLinkList';
import NavUserInfo from './NavUserInfo';

interface NavBarProps {
  webName?: string;
}

const NavBar: React.FC<NavBarProps> = ({ webName = 'Gamispace' }) => {
  const { name, type, totalScore, completedSubjects } = useUserInfo();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <nav className={`navbar navbar-expand-lg ${isExpanded ? 'expanded' : ''}`}>
      <div className="container-fluid">
        <a className="navbar-brand">{webName}</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={isExpanded}
          aria-label="Toggle navigation"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
          onTransitionEnd={() => setIsExpanded(false)}
        >
          <NavLinksList userType={type} />
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
