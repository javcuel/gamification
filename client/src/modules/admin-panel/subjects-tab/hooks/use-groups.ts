import { useState, useEffect, useCallback } from 'react';
import { groupRepository, SubjectGroup } from '../../../shared/api/repository/group.repository';

const useGroups = (subjectId: number) => {
    const [groups, setGroups] = useState<SubjectGroup[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 1. Extraemos la función y la envolvemos en useCallback
    const fetchGroups = useCallback(async () => {
        setLoading(true);
        try {
            const data = await groupRepository.getBySubject(subjectId);
            setGroups(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [subjectId]);

    // 2. Cargar grupos al montar el componente
    useEffect(() => {
        fetchGroups();
    }, [fetchGroups]);

    const addGroup = async (name: string) => {
        setError(null);
        try {
            const newGroup = await groupRepository.create(name, subjectId);
            setGroups(prev => [...prev, newGroup]); // Actualiza UI instantáneamente
        } catch (err: any) {
            setError(err.message);
        }
    };

    const removeGroup = async (groupId: number) => {
        setError(null);
        try {
            await groupRepository.delete(groupId);
            setGroups(prev => prev.filter(g => g.IDGroup !== groupId));
        } catch (err: any) {
            setError(err.message);
        }
    };

    // 3. Exportamos fetchGroups para poder llamarlo desde fuera
    return { groups, loading, error, addGroup, removeGroup, fetchGroups };
};

export default useGroups;