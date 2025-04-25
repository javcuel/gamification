import React, { useEffect, useState } from 'react';

import { useUserInfo } from '../../../../hooks/use-user-info';
import '../../styles/navbar.css';
import NavLinksList from './nav-link-list';
import NavUserInfo from './nav-user-info';

interface NavBarProps {
  webName?: string;
}

const NavBar: React.FC<NavBarProps> = ({ webName = 'Gamispace' }) => {
  const { name, role, totalScore, completedSubjects } = useUserInfo();
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setHasScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg ${hasScrolled ? 'navbar-scrolled' : ''}`}
    >
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
          <span className="navbar-button"> ☰ </span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
          onTransitionEnd={() => setIsExpanded(false)}
        >
          <NavLinksList role={role} />
          <NavUserInfo
            name={name}
            role={role}
            totalScore={totalScore}
            completedSubjects={completedSubjects}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
