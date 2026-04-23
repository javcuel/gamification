import React, { useState, useRef } from 'react';
// Ajusta estas rutas si es necesario
import { useBulkUpload } from './hooks/use-bulk-upload'; 
import LoadingMsg from '../../shared/components/ui/loading-msg';
import Toast from '../../shared/components/ui/toast';

const BulkUploadTab: React.FC = () => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const { uploadFile, loading, error, report, reset } = useBulkUpload();
	
	// Referencia para resetear el input visualmente
	const fileInputRef = useRef<HTMLInputElement>(null);

	// FUNCIÓN RECUPERADA: Maneja la selección del archivo
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			setSelectedFile(event.target.files[0]);
			reset(); 
		}
	};

	// Maneja la subida del archivo
	const handleUpload = async () => {
		if (selectedFile) {
			await uploadFile(selectedFile);
			// Vaciamos el estado lógico
			setSelectedFile(null); 
			
			// Vaciamos el input HTML visualmente
			if (fileInputRef.current) {
				fileInputRef.current.value = '';
			}
		}
	};

	return (
		<div className="container mt-4 text-light">
			<h3 className="mb-4">Add Info by File (CSV)</h3>
			
			{/* ZONA DE SUBIDA */}
			<div className="card bg-dark border-secondary mb-4 p-4">
				<div className="mb-3">
					<label htmlFor="csvFileInput" className="form-label">
						Select a CSV file to bulk upload Users, Subjects, Groups and Game Links.
					</label>
					<input 
						ref={fileInputRef}
						className="form-control text-dark" 
						type="file" 
						id="csvFileInput" 
						accept=".csv"
						onClick={(event) => {
							(event.target as HTMLInputElement).value = '';
						}}
						onChange={handleFileChange}
					/>
				</div>
				<button 
					className="btn btn-success w-25" 
					onClick={handleUpload} 
					disabled={!selectedFile || loading}
				>
					{loading ? 'Uploading...' : 'Cargar información'}
				</button>
			</div>

			{/* MENSAJES DE ESTADO */}
			{loading && <LoadingMsg message="Processing file, please wait..." />}
			{error && <Toast type="error" message={error} />}

			{/* REPORTE DE RESULTADOS */}
			{report && !loading && (
				<div className="card bg-dark border-success p-4">
					<div className="d-flex justify-content-between align-items-center mb-4">
						<h4 className="text-success m-0">Upload Report</h4>
						<span className="badge bg-primary fs-6">Total Rows Processed: {report.totalProcessed}</span>
					</div>
					
					{/* Tabla de Estadísticas Detallada */}
					<div className="table-responsive mb-4">
						<table className="table table-dark table-bordered table-hover text-center align-middle">
							<thead className="table-secondary text-dark">
								<tr>
									<th className="text-start">Entity Type</th>
									<th><span title="Newly created records">🆕 Created / New</span></th>
									<th><span title="Records that already existed and were updated or skipped">🔄 Skipped / Updated</span></th>
									<th><span title="Records that failed due to validation or missing data">❌ Errors</span></th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="text-start fw-bold">Users</td>
									<td className="text-success">{report.users.created}</td>
									<td className="text-info">{report.users.ignored}</td>
									<td className={report.users.errors > 0 ? "text-danger fw-bold" : "text-muted"}>{report.users.errors}</td>
								</tr>
								<tr>
									<td className="text-start fw-bold">Subjects</td>
									<td className="text-success">{report.subjects.created}</td>
									<td className="text-info">{report.subjects.ignored}</td>
									<td className={report.subjects.errors > 0 ? "text-danger fw-bold" : "text-muted"}>{report.subjects.errors}</td>
								</tr>
								<tr>
									<td className="text-start fw-bold">Assignments</td>
									<td className="text-success">{report.assignments.created}</td>
									<td className="text-info">{report.assignments.ignored}</td>
									<td className={report.assignments.errors > 0 ? "text-danger fw-bold" : "text-muted"}>{report.assignments.errors}</td>
								</tr>
								<tr>
									<td className="text-start fw-bold">Games Linked</td>
									<td className="text-success">{report.gamesLinked.created}</td>
									<td className="text-info">{report.gamesLinked.ignored}</td>
									<td className={report.gamesLinked.errors > 0 ? "text-danger fw-bold" : "text-muted"}>{report.gamesLinked.errors}</td>
								</tr>
							</tbody>
						</table>
					</div>

					{/* LISTA DE ERRORES DETALLADOS (Si los hay) */}
					{report.errorDetails && report.errorDetails.length > 0 && (
						<div className="mt-2">
							<h5 className="text-danger">Error Details ({report.errorDetails.length}):</h5>
							<div className="p-3 bg-dark border border-danger rounded" style={{ maxHeight: '200px', overflowY: 'auto' }}>
								<ul className="mb-0 text-danger" style={{ fontSize: '0.9rem' }}>
									{report.errorDetails.map((err, index) => (
										<li key={index}>{err}</li>
									))}
								</ul>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default BulkUploadTab;