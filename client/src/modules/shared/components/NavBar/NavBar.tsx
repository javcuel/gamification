import React, { useEffect, useState } from 'react';
import { useUserInfo } from '../../hooks/use-user-info';
import '../../styles/NavBar.css';
import NavLinksList from './nav-link-list';
import NavUserInfo from './nav-user-info';

// Props accepted by the NavBar component.
interface NavBarProps {
	webName?: string;
}

/**
 * Main navigation bar component.
 * Displays the website name, collapsible navigation links, and user information.
 *
 * @param webName - Optional title to be displayed in the navbar (default: "Gamispace").
 */
const NavBar: React.FC<NavBarProps> = ({ webName = 'Gamispace' }) => {
	// Destructuring user data from custom hook.
	const { name, role, totalScore, completedSubjects } = useUserInfo();

	// Local state to manage whether the navbar is expanded on small screens.
	const [isExpanded, setIsExpanded] = useState(false);

	// Local state to track whether the user has scrolled the page.
	const [hasScrolled, setHasScrolled] = useState(false);

	// Effect to listen for scroll events and toggle 'hasScrolled' state.
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
			<div className='container-fluid'>
				{/* Website brand/logo name */}
				<a className='navbar-brand'>{webName}</a>

				{/* Toggle button for mobile view */}
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarNav'
					aria-controls='navbarNav'
					aria-expanded={isExpanded}
					aria-label='Toggle navigation'
					onClick={() => setIsExpanded(!isExpanded)}
				>
					<span className='navbar-button'> ☰ </span>
				</button>

				{/* Collapsible section for nav links and user info */}
				<div
					className='collapse navbar-collapse'
					id='navbarNav'
					onTransitionEnd={() => setIsExpanded(false)}
				>
					{/* Render navigation links based on user role */}
					<NavLinksList role={role} />

					{/* Display user role, name, score and completed subjects */}
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
