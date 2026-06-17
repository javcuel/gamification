import { useState, useEffect, useCallback } from 'react';
import { groupRepository } from '../../../shared/api/repository/group.repository';
import { SubjectGroup, SubjectGroupCreate } from '../../../shared/api/domain/group';

const useGroups = (subjectId: number) => {
    const [groups, setGroups] = useState<SubjectGroup[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

    useEffect(() => {
        fetchGroups();
    }, [fetchGroups]);

    const addGroup = async (name: string) => {
        setError(null);
        try {
            const newGroupData = new SubjectGroupCreate(name, subjectId);
            const newGroup = await groupRepository.create(newGroupData);
            
            setGroups(prev => [...prev, newGroup]); 
        } catch (err: any) {
            setError(err.message);
        }
    };

    const removeGroup = async (groupId: number) => {
        setError(null);
        try {
            await groupRepository.delete(groupId);
            setGroups(prev => prev.filter(g => g.id !== groupId));
        } catch (err: any) {
            setError(err.message);
        }
    };

    return { groups, loading, error, addGroup, removeGroup, fetchGroups };
};

export default useGroups;