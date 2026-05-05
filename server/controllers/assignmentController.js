import db from "../config/db.js";

// Vincular un usuario a un grupo (Con Auto-Migración)
export const createAssignment = async (req, res) => {
    const { IDUser, IDGroup } = req.body;
    
    try {
        // 1. Averiguar a qué asignatura pertenece el grupo de destino
        const [[groupInfo]] = await db.query(
            "SELECT IDSubject FROM subjectGroups WHERE IDGroup = ?",
            [IDGroup]
        );

        if (!groupInfo) {
            return res.status(404).json({ message: "El grupo especificado no existe." });
        }

        const subjectId = groupInfo.IDSubject;

        // 2. Auto-Migración: Borrar al usuario de cualquier otro grupo de ESTA asignatura
        await db.query(`
            DELETE a FROM assignments a
            JOIN subjectGroups sg ON a.IDGroup = sg.IDGroup
            WHERE a.IDUser = ? AND sg.IDSubject = ?
        `, [IDUser, subjectId]);

        // 3. Crear la nueva asignación
        await db.query(
            "INSERT INTO assignments (IDUser, IDGroup) VALUES (?, ?)",
            [IDUser, IDGroup]
        );
        
        res.status(201).json({ message: "User assigned to group successfully" });
    } catch (error) {
        // Aunque la auto-migración borra previos, dejamos este catch por si acaso (ej. doble click rápido en el front)
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: "User is already in this group" });
        }
        console.error("Error asignando usuario:", error);
        res.status(500).json({ message: error.message });
    }
};

// Desvincular un usuario de un grupo
export const deleteAssignment = async (req, res) => {
    const { idUser, idGroup } = req.params;
    try {
        const [result] = await db.query(
            "DELETE FROM assignments WHERE IDUser = ? AND IDGroup = ?",
            [idUser, idGroup]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Assignment not found" });
        }
        
        res.json({ message: "User removed from group" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todos los usuarios de un grupo específico
export const getUsersByGroup = async (req, res) => {
    const { idGroup } = req.params;
    try {
        const [users] = await db.query(
            `SELECT u.IDUser, u.Name, u.UserType 
             FROM users u 
             JOIN assignments a ON u.IDUser = a.IDUser 
             WHERE a.IDGroup = ?`,
            [idGroup]
        );
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};