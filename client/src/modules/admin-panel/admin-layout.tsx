import React, { useEffect, useState } from 'react';
import Dropdown from '../shared/components/ui/Dropdown';
// import AddGameTab from './create-game-tab/create-game-tab';
import AddSubjectTab from './create-subject-tab/create-subject-tab';
import AddUserTab from './create-user-tab/create-user-tab';
import './styles/admin-panel.css';
import SubjectsTab from './subjects-tab/subjects-tab';
import ThemeTab from './theme-tab/admin-theme-tab';
import UsersTab from './users-tab/users-tab';
import GamesTab from './games-tab/games-tab';

/**
 * AdminLayout component
 *
 * Renders the main layout of the admin panel with tab-based navigation.
 */
const AdminLayout: React.FC = () => {
	const [activeTab, setActiveTab] = useState('tab1');
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
	const [menuOpen, setMenuOpen] = useState(false);

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

	const handleTabChange = (tab: string) => {
		setActiveTab(tab);
		setMenuOpen(false);
	};

	// 2. Añadimos la nueva pestaña 'tab8'
	const tabs = [
		{ id: 'tab1', label: 'Subjects' },
		{ id: 'tab7', label: 'Games' },
		{ id: 'tab2', label: 'Users' },
		{ id: 'tab3', label: 'Add Subject' },
		// { id: 'tab4', label: 'Add Game' },
		{ id: 'tab5', label: 'Add User' },
		{ id: 'tab6', label: 'Add Theme' },
	];

	return (
		<div className='admin-container'>
			<div className={`sidebar ${isMobile ? (menuOpen ? 'open' : 'collapsed') : ''}`}>
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

			<div className='panel'>
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

				<div className='panel-content'>
					{activeTab === 'tab1' && <SubjectsTab />}
					{activeTab === 'tab7' && <GamesTab />}
					{activeTab === 'tab2' && <UsersTab />}
					{activeTab === 'tab3' && <AddSubjectTab />}
					{/* {activeTab === 'tab4' && <AddGameTab />} */}
					{activeTab === 'tab5' && <AddUserTab />}
					{activeTab === 'tab6' && <ThemeTab />}
				</div>
			</div>
		</div>
	);
};

export default AdminLayout;