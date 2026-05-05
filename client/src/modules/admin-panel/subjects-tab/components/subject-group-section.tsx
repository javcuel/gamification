import React, { useState, useRef } from 'react';
import Button from '../../../shared/components/ui/Button';
import Input from '../../../shared/components/ui/Input';
import Toast from '../../../shared/components/ui/toast';
// OJO: Asegúrate de tener el componente LoadingMsg disponible en esta ruta, o bórralo si no lo usas.
import LoadingMsg from '../../../shared/components/ui/loading-msg'; 
import SubjectGroupItem from './subject-group-item';
import useGroups from '../hooks/use-groups';
import { useImportUsers } from '../hooks/use-import-users';


interface SubjectGroupSectionProps {
    subjectId: number;
}

const SubjectGroupSection: React.FC<SubjectGroupSectionProps> = ({ subjectId }) => {
    const [newGroupName, setNewGroupName] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // Hook de grupos
    const { groups, loading: groupsLoading, error: groupsError, addGroup, removeGroup, fetchGroups } = useGroups(subjectId);

    // Hook de importación CSV. Le pasamos 'fetchGroups' para que recargue la lista si se crean grupos nuevos en el CSV.
    const { 
        uploadFile, 
        loading: uploadLoading, 
        error: uploadError, 
        report, 
        reset 
    } = useImportUsers(subjectId, fetchGroups);

    const handleCreateGroup = async () => {
        if (!newGroupName.trim()) return;
        await addGroup(newGroupName);
        setNewGroupName('');
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
            reset(); // Limpia reportes anteriores al elegir nuevo archivo
        }
    };

    const handleUpload = async () => {
        if (selectedFile) {
            await uploadFile(selectedFile);
            setSelectedFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Limpia el input visualmente
            }
        }
    };

    return (
        <div className="d-flex flex-column gap-3">
            {/* Errores */}
            {groupsError && <Toast type="error" message={groupsError} />}
            {uploadError && <Toast type="error" message={uploadError} />}

            {/* 2. CARGA MASIVA POR CSV */}
            <div className="card bg-dark border-secondary p-3 shadow-sm">
                <label htmlFor={`csv-upload-${subjectId}`} className="form-label small text-light mb-2 fw-semibold">
                    Importar Alumnos (CSV: UserName; Password; RealName; LabGroup)
                </label>
                <div className="d-flex gap-2 align-items-center">
                    <input 
                        ref={fileInputRef}
                        className="form-control form-control-sm text-dark" 
                        type="file" 
                        id={`csv-upload-${subjectId}`} 
                        accept=".csv"
                        onClick={(event) => { (event.target as HTMLInputElement).value = ''; }}
                        onChange={handleFileChange}
                    />
                    <button 
                        className="btn btn-success btn-sm text-nowrap px-4" 
                        onClick={handleUpload} 
                        disabled={!selectedFile || uploadLoading}
                    >
                        {uploadLoading ? 'Subiendo...' : 'Cargar Archivo'}
                    </button>
                </div>
            </div>

            {uploadLoading && <LoadingMsg message="Procesando usuarios, por favor espera..." />}

            {/* 3. REPORTE DE RESULTADOS */}
            {report && !uploadLoading && (
                <div className="card bg-dark border-success p-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="text-success m-0 fw-bold">Reporte de Importación</h6>
                        <span className="badge bg-primary">Total Filas: {report.totalProcessed}</span>
                    </div>
                    
                    <div className="table-responsive mb-2">
                        <table className="table table-dark table-sm table-bordered text-center align-middle m-0" style={{ fontSize: '0.85rem' }}>
                            <thead className="table-secondary text-dark">
                                <tr>
                                    <th className="text-start">Entidad</th>
                                    <th title="Registros creados de cero">🆕 Creados</th>
                                    <th title="Registros ya existentes que se han actualizado (Upsert)">🔄 Actualizados</th>
                                    <th title="Registros con fallos (campos vacíos, error BD...)">❌ Errores</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="text-start fw-bold">Usuarios</td>
                                    <td className="text-success">{report.users.created}</td>
                                    <td className="text-info">{report.users.updated}</td>
                                    <td className={report.users.errors > 0 ? "text-danger fw-bold" : "text-muted"}>{report.users.errors}</td>
                                </tr>
                                <tr>
                                    <td className="text-start fw-bold">Asignaciones</td>
                                    <td className="text-success">{report.assignments.created}</td>
                                    <td className="text-info">{report.assignments.updated}</td>
                                    <td className={report.assignments.errors > 0 ? "text-danger fw-bold" : "text-muted"}>{report.assignments.errors}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {report.updatedDetails && report.updatedDetails.length > 0 && (
                        <div className="mt-2">
                            <h6 className="text-info small fw-bold mb-1">Detalles de Actualizaciones ({report.updatedDetails.length}):</h6>
                            <div className="p-2 bg-dark border border-info rounded" style={{ maxHeight: '120px', overflowY: 'auto', fontSize: '0.75rem' }}>
                                <ul className="mb-0 text-info ps-3">
                                    {report.updatedDetails.map((msg, index) => (
                                        <li key={index}>{msg}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                    {report.errorDetails && report.errorDetails.length > 0 && (
                        <div className="mt-2">
                            <h6 className="text-danger small fw-bold mb-1">Detalles de Errores ({report.errorDetails.length}):</h6>
                            <div className="p-2 bg-dark border border-danger rounded" style={{ maxHeight: '120px', overflowY: 'auto', fontSize: '0.75rem' }}>
                                <ul className="mb-0 text-danger ps-3">
                                    {report.errorDetails.map((err, index) => (
                                        <li key={index}>{err}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                    
                </div>
            )}

            {/* 1. CREACIÓN MANUAL DE GRUPO */}
            <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold text-uppercase" style={{ fontSize: '0.8rem' }}>
                    Gestión de Grupos
                </span>
                <div className="d-flex gap-2">
                    <Input
                        type="text"
                        placeholder="Nombre del grupo..."
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                    />
                    <Button text="Crear" onClick={handleCreateGroup} disabled={groupsLoading || uploadLoading} />
                </div>
            </div>
            
            {/* 4. LISTADO DE GRUPOS */}
            <div className="d-flex flex-column gap-2 mt-2">
                {groupsLoading && <div className="small text-muted">Cargando grupos...</div>}
                
                {!groupsLoading && groups.length > 0 ? (
                    groups.map(group => (
                        <SubjectGroupItem 
                            key={group.IDGroup} 
                            group={group} 
                            onDelete={() => removeGroup(group.IDGroup)} 
                        />
                    ))
                ) : (
                    !groupsLoading && <div className="text-center text-muted small py-3 border rounded">No hay grupos para esta asignatura.</div>
                )}
            </div>
        </div>
    );
};

export default SubjectGroupSection;