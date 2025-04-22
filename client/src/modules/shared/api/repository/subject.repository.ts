import { Subject } from '../domain/subject';

import httpClient from '../../../../api/httpClient';
import { API_URLS } from '../../../../constants/apiUrls';
import { ISubjectRepository } from '../interface/subject-repository.interface';
import { SubjectMapper } from '../mapper/subject.mapper';

export class SubjectRepository implements ISubjectRepository {
  async getAll(): Promise<Subject[]> {
    try {
      const data = await httpClient.get(API_URLS.GET_SUBJECTS);
      return data.map(SubjectMapper.toDomain);
    } catch (error) {
      console.error('Error fetching subjects', error);
      throw new Error('Failed to fetch subjects');
    }
  }

  async create(data: Subject): Promise<void> {
    const requestDTO = SubjectMapper.toRequestDTO(data);

    try {
      await httpClient.post(API_URLS.CREATE_SUBJECT, requestDTO);
    } catch (error) {
      console.error('Error creating new subject:', error);
      throw new Error('Failed to create new subject');
    }
  }

  async update(id: number, data: Subject): Promise<void> {
    const requestDTO = SubjectMapper.toRequestDTO(data);

    try {
      await httpClient.put(API_URLS.UPDATE_SUBJECT(id), requestDTO);
    } catch (error) {
      console.error(`Error updating subject (ID: ${id}):`, error);
      throw new Error('Failed to update subject');
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await httpClient.delete(API_URLS.DELETE_SUBJECT(id));
    } catch (error) {
      console.error(`Error deleting subject (ID: ${id}):`, error);
      throw new Error('Failed to delete subject');
    }
  }
}

export const subjectRepository = new SubjectRepository();
