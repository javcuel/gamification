import { useState, useEffect } from 'react';
import { assignmentRepository, GroupUser } from '../../../shared/api/repository/assignment.repository';

const useGroupUsers = (groupId: number, isExpanded: boolean) => {
    const [users, setUsers] = useState<GroupUser[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isExpanded) return;
        
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const data = await assignmentRepository.getUsersByGroup(groupId);
                setUsers(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [groupId, isExpanded]);

    // Cambiamos userId por userName
    const addUser = async (userName: string) => {
        setError(null);
        try {
            await assignmentRepository.assignUser(userName, groupId);
            const data = await assignmentRepository.getUsersByGroup(groupId);
            setUsers(data);
        } catch (err: any) {
            setError(err.message);
            throw err; 
        }
    };

    const removeUser = async (userId: number) => {
        setError(null);
        try {
            await assignmentRepository.unassignUser(userId, groupId);
            setUsers(prev => prev.filter(u => u.IDUser !== userId));
        } catch (err: any) {
            setError(err.message);
        }
    };

    return { users, loading, error, addUser, removeUser, setError };
};

export default useGroupUsers;