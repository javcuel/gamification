import React, { useState } from 'react';
import Button from '../../../shared/components/ui/Button';
import Input from '../../../shared/components/ui/Input';
import useGroupUsers from '../hooks/use-group-users';
import { SubjectGroup } from '../../../shared/api/repository/group.repository';
import Toast from '../../../shared/components/ui/toast';

interface SubjectGroupItemProps {
    group: SubjectGroup;
    onDelete: () => void;
}

const SubjectGroupItem: React.FC<SubjectGroupItemProps> = ({ group, onDelete }) => {
    const [isAddingUser, setIsAddingUser] = useState(false);
    const [isUsersExpanded, setIsUsersExpanded] = useState(false);
    const [newUserId, setNewUserId] = useState('');

    // CONECTAMOS EL HOOK
    const { users, loading, error, addUser, removeUser, setError } = useGroupUsers(group.IDGroup, isUsersExpanded);

    const handleDeleteGroup = () => {
        if (window.confirm(`¿Seguro que quieres borrar el grupo ${group.Name}? Se borrarán todos los alumnos asociados a él.`)) {
            onDelete();
        }
    };

    const handleAddUser = async () => {
        const id = parseInt(newUserId);
        if (isNaN(id)) {
            setError("El ID debe ser un número");
            return;
        }
        
        try {
            await addUser(id);
            setNewUserId(''); 
            setIsAddingUser(false); 
            setIsUsersExpanded(true); // Abrimos la lista para que vea que se añadió
        } catch (e) {
            // El error ya lo maneja el hook
        }
    };

    const handleRemoveUser = (userId: number, Name: string) => {
        if (window.confirm(`¿Desvincular a ${Name} del grupo?`)) {
            removeUser(userId);
        }
    };

    return (
        <div className="border rounded">
            <div className="d-flex justify-content-between align-items-center p-2 subject-game-item-row">
                <span className="fw-bold">{group.Name}</span>
                <div className="d-flex gap-2">
                    <Button 
                        text={isAddingUser ? "Cancelar" : "+ Usuario"} 
                        onClick={() => setIsAddingUser(!isAddingUser)} 
                    />
                    <Button 
                        type={isUsersExpanded ? 'hidden' : 'visible'} 
                        onClick={() => setIsUsersExpanded(!isUsersExpanded)} 
                    />
                    <Button type="delete" onClick={handleDeleteGroup} />
                </div>
            </div>

            {error && <div className="px-2"><Toast type="error" message={error} /></div>}

            {isAddingUser && (
                <div className="d-flex gap-2 p-2 border-top bg-light bg-opacity-50">
                    <Input
                        type="text"
                        placeholder="ID Numérico del Usuario (Ej. 2)"
                        value={newUserId}
                        onChange={(e) => setNewUserId(e.target.value)}
                    />
                    <Button text="Vincular" onClick={handleAddUser} disabled={loading} />
                </div>
            )}

            {isUsersExpanded && (
                <div className="p-2 border-top">
                    <small className="text-muted d-block mb-2 text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>
                        Usuarios asignados ({users.length})
                    </small>
                    
                    {loading ? (
                        <div className="small text-muted">Cargando usuarios...</div>
                    ) : users.length > 0 ? (
                        users.map(user => (
                            <div key={user.IDUser} className="d-flex justify-content-between align-items-center p-1 border-bottom">
                                <span className="small">{user.Name} <span className="text-muted">(ID: {user.IDUser} - {user.UserType})</span></span>
                                <Button type="delete" onClick={() => handleRemoveUser(user.IDUser, user.Name)} />
                            </div>
                        ))
                    ) : (
                        <div className="text-muted small italic">No hay usuarios en este grupo.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SubjectGroupItem;