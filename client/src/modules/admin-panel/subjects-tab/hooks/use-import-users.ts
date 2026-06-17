import { useState } from 'react';
import { subjectRepository } from '../../../shared/api/repository/subject.repository'; 

export interface ImportEntityStats {
    created: number;
    updated: number; 
    errors: number;
}

export interface ImportReport {
    totalProcessed: number;
    users: ImportEntityStats;
    assignments: ImportEntityStats;
    errorDetails: string[];
    updatedDetails: string[];
}

export const useImportUsers = (subjectId: number, onSuccessCallback?: () => void) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [report, setReport] = useState<ImportReport | null>(null);

    const uploadFile = async (file: File) => {
        setLoading(true);
        setError(null);
        setReport(null);

        try {
            const data = await subjectRepository.importUsersFromCsv(subjectId, file);
            setReport(data);
            
            if (onSuccessCallback) {
                onSuccessCallback();
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Unknown error occurred during file uploading');
            }
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setError(null);
        setReport(null);
    };

    return { uploadFile, loading, error, report, reset };
};