import { useState, useEffect } from 'react';
import { groupRepository, SubjectGroup } from '../../../shared/api/repository/group.repository';

const useGroups = (subjectId: number) => {
    const [groups, setGroups] = useState<SubjectGroup[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Cargar grupos al montar
    useEffect(() => {
        const fetchGroups = async () => {
            setLoading(true);
            try {
                const data = await groupRepository.getBySubject(subjectId);
                setGroups(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchGroups();
    }, [subjectId]);

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

    return { groups, loading, error, addGroup, removeGroup };
};

export default useGroups;