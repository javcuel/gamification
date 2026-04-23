import HttpClient from '../../../../api/http-client';

class BulkRepository {
    /**
     * Envía el archivo CSV al servidor para el procesamiento masivo.
     * @param file - El archivo .csv seleccionado por el usuario.
     */
    async uploadCsv(file: File): Promise<any> {
        // 1. Creamos el contenedor FormData
        const formData = new FormData();
        
        // 2. Añadimos el archivo con la clave 'csvFile' (la que espera Multer en tu bulkRoutes.js)
        formData.append('csvFile', file);

        try {
            // 3. Enviamos la petición POST. 
            // Como ya hicimos a HttpClient inteligente, no hace falta pasarle cabeceras.
            const response = await HttpClient.post('/bulk/upload', formData);
            
            return response;
        } catch (error) {
            console.error('Error en el repositorio de carga masiva:', error);
            throw new Error('No se pudo procesar el archivo CSV. Revisa la conexión o el formato del archivo.');
        }
    }
}

export const bulkRepository = new BulkRepository();