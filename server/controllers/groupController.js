import db from "../config/db.js";

// Crear un nuevo grupo para una asignatura
export const createGroup = async (req, res) => {
    const { Name, IDSubject } = req.body;
    try {
        const [result] = await db.query(
            "INSERT INTO subjectGroups (Name, IDSubject) VALUES (?, ?)",
            [Name, IDSubject]
        );
        res.status(201).json({ 
            IDGroup: result.insertId, 
            Name, 
            IDSubject 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un grupo (Protegido contra el grupo de Profesores)
export const deleteGroup = async (req, res) => {
    const { id } = req.params;
    try {
        // 1. Verificar si el grupo tiene el flag de profesor activado
        const [[group]] = await db.query("SELECT IsTeacherGroup FROM subjectGroups WHERE IDGroup = ?", [id]);

        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        if (group.IsTeacherGroup === 1) {
            return res.status(403).json({ message: "Acción denegada: No se puede borrar el grupo por defecto de Profesores." });
        }

        // 2. Si no es de profesores, procedemos a borrar
        await db.query("DELETE FROM subjectGroups WHERE IDGroup = ?", [id]);
        res.json({ message: "Group deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todos los grupos de una asignatura específica
export const getGroupsBySubject = async (req, res) => {
    const { idSubject } = req.params;
    try {
        const [groups] = await db.query(
            "SELECT * FROM subjectGroups WHERE IDSubject = ?", 
            [idSubject]
        );
        res.json(groups);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};