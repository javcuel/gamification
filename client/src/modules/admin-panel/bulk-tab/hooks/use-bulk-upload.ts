import { useState } from 'react';
import { bulkRepository } from '../../../shared/api/repository/bulk.repository'; // Ajusta la ruta según tu estructura
 
export interface BulkEntityStats {
    created: number;
    ignored: number;
    errors: number;
}

export interface BulkReport {
    totalProcessed: number;
    users: BulkEntityStats;
    subjects: BulkEntityStats;
    assignments: BulkEntityStats;
    gamesLinked: BulkEntityStats;
    errorDetails: string[]; // Cambiado de 'errors' a 'errorDetails' para ser más precisos
}

export const useBulkUpload = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [report, setReport] = useState<BulkReport | null>(null);

    const uploadFile = async (file: File) => {
        // Reiniciamos los estados antes de una nueva subida
        setLoading(true);
        setError(null);
        setReport(null);

        try {
            const data = await bulkRepository.uploadCsv(file);
            setReport(data); // Guardamos el reporte de éxito/errores del backend
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred during the upload process.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Función extra por si queremos limpiar la pantalla después de subir un archivo
    const reset = () => {
        setError(null);
        setReport(null);
    };

    return { uploadFile, loading, error, report, reset };
};