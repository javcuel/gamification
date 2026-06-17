import { useState } from 'react';
import { SubjectCreate } from '../../../shared/api/domain/subject';
import { subjectRepository } from '../../../shared/api/repository/subject.repository';

/**
 * useCreateSubject hook
 *
 * Custom hook to handle the creation of a subject.
 * - Manages loading, success, and error states internally.
 * - Exposes a function to perform the creation request.
 *
 * @returns An object containing:
 * - `createSubject`: Function to initiate subject creation
 * - `error`: Error message if the creation fails
 * - `success`: Boolean indicating if the creation was successful
 * - `loading`: Boolean representing the current loading state
 */
const useCreateSubject = () => {
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState<boolean>(true);

	/**
	 * createSubject
	 *
	 * Sends a request to create a new subject via the subject repository.
	 * Updates state to reflect request status and result.
	 *
	 * @param data - The subject data to be created
	 */
	const createSubject = async (data: SubjectCreate) => {
		setError(null);
		setSuccess(false);

		try {
			await subjectRepository.create(data);
			setSuccess(true);
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError('An unknown error occurred');
			}
		} finally {
			setLoading(false);
		}
	};

	return { createSubject, error, success, loading };
};

export default useCreateSubject;
