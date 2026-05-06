import HttpClient from '../../../../api/http-client';

export interface GroupUser {
    IDUser: number;
    Name: string;
    UserType: string;
}

export const assignmentRepository = {
    getUsersByGroup: async (groupId: number): Promise<GroupUser[]> => {
        const response = await HttpClient.get(`/assignments/group/${groupId}/users`);
        return response as GroupUser[];
    },
    
    // Cambiamos userId por userName
    assignUser: async (userName: string, groupId: number): Promise<void> => {
        await HttpClient.post(`/assignments`, { 
            UserName: userName, // Mandamos la cadena de texto
            IDGroup: groupId 
        });
    },
    
    unassignUser: async (userId: number, groupId: number): Promise<void> => {
        await HttpClient.delete(`/assignments/user/${userId}/group/${groupId}`);
    }
};