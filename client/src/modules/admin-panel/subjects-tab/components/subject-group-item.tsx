import React, { useState } from 'react';
import Button from '../../../shared/components/ui/Button';
import Input from '../../../shared/components/ui/Input';
import useGroupUsers from '../hooks/use-group-users';
import { SubjectGroup } from '../../../shared/api/repository/group.repository';
import Toast from '../../../shared/components/ui/toast';

interface SubjectGroupItemProps {
    group: SubjectGroup;
    onDelete: () => void;
    onUserAssigned: () => void;
    refreshTrigger: number; 
}

const SubjectGroupItem: React.FC<SubjectGroupItemProps> = ({ 
    group, 
    onDelete, 
    onUserAssigned, 
    refreshTrigger 
}) => {
    const [isAddingUser, setIsAddingUser] = useState(false);
    const [isUsersExpanded, setIsUsersExpanded] = useState(false);
    const [newUserName, setNewUserName] = useState('');

    const { users, loading, error, addUser, removeUser, setError } = useGroupUsers(group.IDGroup, isUsersExpanded, refreshTrigger);

    const handleDeleteGroup = () => {
        if (window.confirm(`¿Are you sure you want to delete ${group.Name}? All links with users will be eliminated as well.`)) {
            onDelete();
        }
    };

    const handleAddUser = async () => {
        if (!newUserName.trim()) {
            setError("User's name must not be empty");
            return;
        }
        
        try {
            await addUser(newUserName.trim());
            setNewUserName(''); 
            setIsAddingUser(false); 
            setIsUsersExpanded(true);
            
            // ¡Avisamos al padre de que hemos movido un usuario!
            onUserAssigned(); 
            
        } catch (e) {
            // Error manejado por el hook
        }
    };

    const handleRemoveUser = (userId: number, Name: string) => {
        if (window.confirm(`¿Unlink ${Name} from group?`)) {
            removeUser(userId);
        }
    };

    return (
        <div className="border rounded mb-2">
            <div className="d-flex justify-content-between align-items-center p-2 subject-game-item-row">
                <div className="d-flex align-items-center">
                    <span className="fw-bold">{group.Name}</span>
                    {/* EXTRA UX: Etiqueta visual para identificar el grupo de profesores */}
                    {group.IsTeacherGroup === 1 && (
                        <span className="badge bg-info ms-2" style={{ fontSize: '0.65rem' }}>
                            Teachers
                        </span>
                    )}
                </div>
                
                <div className="d-flex gap-2">
                    <Button 
                        text={isAddingUser ? "Cancel" : "+ User"} 
                        onClick={() => setIsAddingUser(!isAddingUser)} 
                    />
                    <Button 
                        type={isUsersExpanded ? 'hidden' : 'visible'} 
                        onClick={() => setIsUsersExpanded(!isUsersExpanded)} 
                    />
                    {/* CONDICIONAL: Solo mostramos la papelera si NO es el grupo de Profesores */}
                    {group.IsTeacherGroup !== 1 && (
                        <Button type="delete" onClick={handleDeleteGroup} />
                    )}
                </div>
            </div>

            {error && <div className="px-2 pb-2"><Toast type="error" message={error} /></div>}

            {isAddingUser && (
                <div className="d-flex gap-2 p-2 border-top bg-light bg-opacity-50">
                    <Input
                        type="text"
                        placeholder="User name (Ej. juan_perez)"
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                    />
                    <Button text="Assign" onClick={handleAddUser} disabled={loading} />
                </div>
            )}

            {isUsersExpanded && (
                <div className="p-2 border-top">
                    <small className="text-muted d-block mb-2 text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>
                        Assigned users ({users.length})
                    </small>
                    
                    {loading ? (
                        <div className="small text-muted">Loading users...</div>
                    ) : users.length > 0 ? (
                        users.map(user => (
                            <div key={user.IDUser} className="d-flex justify-content-between align-items-center p-1 border-bottom">
                                <span className="small">{user.Name} <span className="text-muted">({user.UserType})</span></span>
                                <Button type="delete" onClick={() => handleRemoveUser(user.IDUser, user.Name)} />
                            </div>
                        ))
                    ) : (
                        <div className="text-muted small fst-italic">No users assigned to this group</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SubjectGroupItem;