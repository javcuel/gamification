import HttpClient from '../../../../api/http-client';

export interface GroupUser {
    IDUser: number;
    Nombre: string;
    TipoUsuario: string;
}

export const assignmentRepository = {
    getUsersByGroup: async (groupId: number): Promise<GroupUser[]> => {
        const response = await HttpClient.get(`/assignments/group/${groupId}/users`);
        return response as GroupUser[];
    },
    
    assignUser: async (userId: number, groupId: number): Promise<void> => {
        await HttpClient.post(`/assignments`, { 
            IDUser: userId, 
            IDGroup: groupId 
        });
    },
    
    unassignUser: async (userId: number, groupId: number): Promise<void> => {
        await HttpClient.delete(`/assignments/user/${userId}/group/${groupId}`);
    }
};