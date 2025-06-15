import { useState } from 'react';
import { SubjectUpdate } from '../../../shared/api/domain/subject';
import { subjectRepository } from '../../../shared/api/repository/subject.repository';

/**
 * useUpdateSubject hook
 *
 * Manages the process of updating subject data in the backend.
 * Includes internal state for loading and error handling, and accepts
 * an optional callback for post-update logic.
 *
 * @param onUpdateSuccess - Optional callback to invoke after a successful update
 * @returns An object containing:
 * - `updateSubject`: Function to update the subject
 * - `loading`: Boolean indicating whether the update is in progress
 * - `error`: Error message if the update fails
 */
const useUpdateSubject = (onUpdateSuccess?: () => void) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	/**
	 * updateSubject
	 *
	 * Sends updated subject data to the backend and manages state.
	 *
	 * @param id - The ID of the subject to update
	 * @param data - The updated subject information
	 */
	const updateSubject = async (id: number, data: SubjectUpdate) => {
		setLoading(true);
		setError(null);

		try {
			await subjectRepository.update(id, data);
			if (onUpdateSuccess) onUpdateSuccess();
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError('An unknown error occurred');
			}
		} finally {
			setLoading(false);
		}
	};

	return { updateSubject, loading, error };
};

export default useUpdateSubject;
