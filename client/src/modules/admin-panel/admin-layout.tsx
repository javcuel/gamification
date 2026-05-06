import React, { useEffect, useState } from 'react';
import Dropdown from '../shared/components/ui/Dropdown';
import AddSubjectTab from './create-subject-tab/create-subject-tab';
import AddUserTab from './create-user-tab/create-user-tab';
import './styles/admin-panel.css';
import SubjectsTab from './subjects-tab/subjects-tab';
import ThemeTab from './theme-tab/admin-theme-tab';
import UsersTab from './users-tab/users-tab';
import GamesTab from './games-tab/games-tab';

// 1. IMPORTAMOS EL CONTEXTO DE AUTENTICACIÓN
import { useAuth } from '../../context/auth-context'; 

const AdminLayout: React.FC = () => {
    // 2. OBTENEMOS EL USUARIO Y SU ROL
    const { user } = useAuth();
    const userRole = user?.role || 'P'; // Por defecto 'P' como medida de seguridad

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


	// 3. DEFINIMOS LOS PERMISOS DE CADA PESTAÑA (Corregido sin el rol 'D')
		const allTabs = [
			{ id: 'tab1', label: 'Subjects', allowedRoles: ['A', 'T'] }, // Solo Admin y Profesores
			{ id: 'tab7', label: 'Games', allowedRoles: ['A'] },         // Solo Admin
			{ id: 'tab2', label: 'Users', allowedRoles: ['A'] },         // Solo Admin
			{ id: 'tab3', label: 'Add Subject', allowedRoles: ['A'] },   // Solo Admin
			{ id: 'tab5', label: 'Add User', allowedRoles: ['A'] },      // Solo Admin
			{ id: 'tab6', label: 'Add Theme', allowedRoles: ['A'] },     // Solo Admin
		];

    // 4. FILTRAMOS LAS PESTAÑAS
    const tabs = allTabs.filter(tab => tab.allowedRoles.includes(userRole));

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
                    {/* Renderizado seguro: comprueba que el usuario tenga la tab en su lista de permitidas */}
					{activeTab === 'tab1' && tabs.some(t => t.id === 'tab1') && <SubjectsTab />}
					{activeTab === 'tab7' && tabs.some(t => t.id === 'tab7') && <GamesTab />}
					{activeTab === 'tab2' && tabs.some(t => t.id === 'tab2') && <UsersTab />}
					{activeTab === 'tab3' && tabs.some(t => t.id === 'tab3') && <AddSubjectTab />}
					{activeTab === 'tab5' && tabs.some(t => t.id === 'tab5') && <AddUserTab />}
					{activeTab === 'tab6' && tabs.some(t => t.id === 'tab6') && <ThemeTab />}
				</div>
			</div>
		</div>
	);
};

export default AdminLayout;