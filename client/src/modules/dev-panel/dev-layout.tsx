import React, { useEffect, useState } from 'react';
import '../admin-panel/styles/admin-panel.css';
import Dropdown from '../shared/components/ui/Dropdown';
import AddGameTab from '../admin-panel/create-game-tab/create-game-tab';

/**
 * DevLayout component
 *
 * Renders the main layout of the admin panel with tab-based navigation.
 * - Supports both desktop and mobile views.
 * - Displays a sidebar for tab navigation (or a dropdown on mobile).
 * - Each tab renders a specific administrative panel (e.g., users, subjects, etc.).
 *
 * @returns A React element representing the admin panel layout and its tabbed content.
 */
const DevLayout: React.FC = () => {
	const [activeTab, setActiveTab] = useState('tab1');
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
	const [menuOpen, setMenuOpen] = useState(false);

	/**
	 * Sets up a window resize listener to toggle mobile layout mode.
	 */
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
			if (window.innerWidth >= 768) {
				setMenuOpen(false);
			}
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	/**
	 * Updates the currently active tab and closes the menu on mobile.
	 *
	 * @param tab - The ID of the selected tab
	 */
	const handleTabChange = (tab: string) => {
		setActiveTab(tab);
		setMenuOpen(false);
	};

	// Available admin panel tabs
	const tabs = [{ id: 'tab1', label: 'Add Game' }];

	return (
		<div className='admin-container'>
			{/* Sidebar navigation (collapsible on mobile) */}
			<div
				className={`sidebar ${isMobile ? (menuOpen ? 'open' : 'collapsed') : ''}`}
			>
				<div className='sidebar-nav'>
					{tabs.map(({ id, label }) => (
						<li key={id}>
							<button
								className={`sidebar-nav-link ${activeTab === id ? 'active' : ''}`}
								onClick={() => handleTabChange(id)}
							>
								{label}
							</button>
						</li>
					))}
				</div>
			</div>

			{/* Main content panel */}
			<div className='panel'>
				{/* Mobile view dropdown for tab selection */}
				{isMobile && (
					<div className='mobile-dropdown-wrapper'>
						<Dropdown
							options={tabs.map(tab => tab.label)}
							placeholder='Select a tab'
							onChange={label => {
								const selectedTab = tabs.find(tab => tab.label === label);
								if (selectedTab) handleTabChange(selectedTab.id);
							}}
						/>
					</div>
				)}

				{/* Tab-specific content */}
				<div className='panel-content'>
					{activeTab === 'tab1' && <AddGameTab />}
				</div>
			</div>
		</div>
	);
};

export default DevLayout;
