import { useState } from 'react';
import { Subject } from '../../../shared/api/domain/subject';
import { subjectRepository } from '../../../shared/api/repository/subject.repository';

/**
 * useToggleSubjectOpenState hook
 *
 * Manages the `isOpen` state of a subject and provides functionality to toggle it.
 * This hook updates the subject's open state locally and remotely via the repository.
 *
 * @param subject - The subject object whose open state is to be toggled
 * @returns An object containing:
 * - `isOpen`: Current open state of the subject
 * - `error`: Error message if the update fails
 * - `toggleOpenState`: Function to toggle the subject's open state
 */
const useToggleSubjectOpenState = (subject: Subject) => {
	const [isOpen, setIsOpen] = useState(subject.isOpen);
	const [error, setError] = useState<string | null>(null);

	/**
	 * toggleOpenState
	 *
	 * Toggles the subject's `isOpen` status and updates it in the backend.
	 */
	const toggleOpenState = async () => {
		try {
			const newState = !isOpen;

			await subjectRepository.updateOpen(subject.id, newState);
			setIsOpen(newState);
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError('An unknown error occurred');
			}
		}
	};

	return { isOpen, error, toggleOpenState };
};

export default useToggleSubjectOpenState;
