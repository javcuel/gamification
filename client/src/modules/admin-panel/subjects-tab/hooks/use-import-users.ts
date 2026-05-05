import { useState } from 'react';
import { subjectRepository } from '../../../shared/api/repository/subject.repository'; // Ajusta la ruta a tu repositorio

export interface ImportEntityStats {
    created: number;
    updated: number; // Antes 'ignored', ahora lo llamamos 'updated' por claridad
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
            
            // Si le pasamos una función de éxito (ej. para recargar los grupos), la ejecuta
            if (onSuccessCallback) {
                onSuccessCallback();
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Ocurrió un error desconocido durante el procesamiento del archivo.');
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