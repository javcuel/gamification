import { useState, useEffect } from 'react';
import { assignmentRepository } from '../../../shared/api/repository/assignment.repository';
import { GroupUser, AssignmentCreate } from '../../../shared/api/domain/assignment';

const useGroupUsers = (groupId: number, isExpanded: boolean, refreshTrigger: number = 0) => {
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
    }, [groupId, isExpanded, refreshTrigger]);

    const addUser = async (userName: string) => {
        setError(null);
        try {
            const assignmentData = new AssignmentCreate(userName, groupId);
            await assignmentRepository.assignUser(assignmentData);
            
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
            setUsers(prev => prev.filter(u => u.id !== userId));
        } catch (err: any) {
            setError(err.message);
        }
    };

    return { users, loading, error, addUser, removeUser, setError };
};

export default useGroupUsers;