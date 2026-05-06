import HttpClient from '../../../../api/http-client';

export interface SubjectGroup {
    IDGroup: number;
    Name: string;
    IDSubject: number;
    IsTeacherGroup: number; // <-- NUEVO FLAG (Suele llegar como 0 o 1 desde MySQL)
}

export const groupRepository = {
    getBySubject: async (subjectId: number): Promise<SubjectGroup[]> => {
        const response = await HttpClient.get(`/groups/subject/${subjectId}`);
        return response as SubjectGroup[];
    },
    
    create: async (name: string, subjectId: number): Promise<SubjectGroup> => {
        const response = await HttpClient.post(`/groups`, { 
            Name: name, 
            IDSubject: subjectId 
        });
        return response as SubjectGroup;
    },
    
    delete: async (groupId: number): Promise<void> => {
        await HttpClient.delete(`/groups/${groupId}`);
    }
};