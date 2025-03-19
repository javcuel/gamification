import { useEffect, useState } from 'react';

import { Subject, fetchSubjects } from '../api/subject';

/**
 * Custom hook to fetch and manage the list of subjects.
 *
 * It uses the `fetchSubjects` function to retrieve subjects data, and handles any errors that occur during the fetching process.
 * The hook provides the list of subjects and any error messages to the component that calls it.
 *
 * @returns {Object} - An object containing:
 *   - `subjects`: The list of subjects retrieved from the API.
 *   - `error`: An error message, if any, during the fetch operation. If no error, it is `null`.
 *
 * @example
 * const { subjects, error } = useSubject();
 */
const useSubject = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSubjects = async () => {
      const data = await fetchSubjects().catch(() => {
        setError('Failed to load Subjects');
      });
      if (data) setSubjects(data);
    };

    loadSubjects();
  }, []);

  return { subjects, error };
};

export default useSubject;
