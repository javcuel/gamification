import { useState } from 'react';
import { Subject } from '../../../shared/api/domain/subject';
import { subjectRepository } from '../../../shared/api/repository/subject.repository';

/**
 * useToggleSubjectVisibleState hook
 *
 * Manages the `isVisible` state of a subject and provides functionality to toggle it.
 * This hook updates the subject's visibility both locally and in the backend.
 *
 * @param subject - The subject whose visibility status is to be toggled
 * @returns An object containing:
 * - `isVisible`: Current visibility state of the subject
 * - `error`: Error message if the update fails
 * - `toggleVisibleState`: Function to toggle the subject's visibility
 */
const useToggleSubjectVisibleState = (subject: Subject) => {
	const [isVisible, setIsVisible] = useState(subject.isVisible);
	const [error, setError] = useState<string | null>(null);

	/**
	 * toggleVisibleState
	 *
	 * Toggles the subject's `isVisible` status and persists the change via the repository.
	 */
	const toggleVisibleState = async () => {
		try {
			const newState = !isVisible;

			await subjectRepository.updateVisible(subject.id, newState);
			setIsVisible(newState);
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError('An unknown error occurred');
			}
		}
	};

	return { isVisible, error, toggleVisibleState };
};

export default useToggleSubjectVisibleState;
