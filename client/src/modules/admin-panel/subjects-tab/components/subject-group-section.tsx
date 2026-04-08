import React, { useState } from 'react';
import Button from '../../../shared/components/ui/Button';
import Input from '../../../shared/components/ui/Input';
import SubjectGroupItem from './subject-group-item';
import useGroups from '../hooks/use-groups';
import Toast from '../../../shared/components/ui/toast';

interface SubjectGroupSectionProps {
    subjectId: number;
}

const SubjectGroupSection: React.FC<SubjectGroupSectionProps> = ({ subjectId }) => {
    const [newGroupName, setNewGroupName] = useState('');
    
    // CONECTAMOS EL HOOK
    const { groups, loading, error, addGroup, removeGroup } = useGroups(subjectId);

    const handleCreateGroup = async () => {
        if (!newGroupName.trim()) return;
        await addGroup(newGroupName);
        setNewGroupName('');
    };

    return (
        <div className="d-flex flex-column gap-3">
            {error && <Toast type="error" message={error} />}
            
            <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold text-uppercase" style={{ fontSize: '0.8rem' }}>
                    Gestión de Grupos
                </span>
                <div className="d-flex gap-2">
                    <Input
                        type="text"
                        placeholder="Nombre del grupo..."
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                    />
                    <Button text="Crear" onClick={handleCreateGroup} disabled={loading} />
                </div>
            </div>

            <div className="d-flex flex-column gap-2">
                {loading && <div className="small text-muted">Cargando grupos...</div>}
                
                {!loading && groups.length > 0 ? (
                    groups.map(group => (
                        <SubjectGroupItem 
                            key={group.IDGroup} 
                            group={group} 
                            onDelete={() => removeGroup(group.IDGroup)} 
                        />
                    ))
                ) : (
                    !loading && <div className="text-center text-muted small py-3 border rounded">No hay grupos para esta asignatura.</div>
                )}
            </div>
        </div>
    );
};

export default SubjectGroupSection;