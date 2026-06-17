import { useState } from 'react';
import { subjectRepository } from '../../../shared/api/repository/subject.repository';

/**
 * useDeleteSubject hook
 *
 * Handles the deletion of a subject and manages request-related state.
 * - Calls a success callback upon successful deletion.
 * - Tracks loading and error status during the process.
 *
 * @param onDeleteSuccess - Callback to execute when a subject is successfully deleted
 * @returns An object containing:
 * - `deleteSubject`: Function to initiate subject deletion by ID
 * - `loading`: Boolean indicating if the deletion is in progress
 * - `error`: Error message if the deletion fails
 */
const useDeleteSubject = (onDeleteSuccess: (id: number) => void) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	/**
	 * deleteSubject
	 *
	 * Sends a request to delete a subject by its ID.
	 * Executes the provided callback on successful deletion.
	 *
	 * @param id - ID of the subject to be deleted
	 */
	const deleteSubject = async (id: number) => {
		setLoading(true);
		setError(null);

		try {
			await subjectRepository.delete(id);
			onDeleteSuccess(id);
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError('An unknown error occurred');
			}
		}
	};

	return { deleteSubject, loading, error };
};

export default useDeleteSubject;
