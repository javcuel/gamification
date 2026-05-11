import db from "../config/db.js";

// Vincular un usuario a un grupo (Con Auto-Migración)
export const createAssignment = async (req, res) => {
    // Cambiamos IDUser por UserName
    const { UserName, IDGroup } = req.body;
    
    try {
        // 1. Buscar el IDUser a partir del UserName
        const [[user]] = await db.query("SELECT IDUser FROM users WHERE Name = ?", [UserName]);
        
        if (!user) {
            return res.status(404).json({ message: `User '${UserName}' does not exist.` });
        }
        
        const IDUser = user.IDUser;

        // 2. Averiguar a qué asignatura pertenece el grupo de destino
        const [[groupInfo]] = await db.query(
            "SELECT IDSubject FROM subjectGroups WHERE IDGroup = ?",
            [IDGroup]
        );

        if (!groupInfo) {
            return res.status(404).json({ message: "Group does not exist" });
        }

        const subjectId = groupInfo.IDSubject;

        // 3. Auto-Migración: Borrar al usuario de cualquier otro grupo de ESTA asignatura
        await db.query(`
            DELETE a FROM assignments a
            JOIN subjectGroups sg ON a.IDGroup = sg.IDGroup
            WHERE a.IDUser = ? AND sg.IDSubject = ?
        `, [IDUser, subjectId]);

        // 4. Crear la nueva asignación
        await db.query(
            "INSERT INTO assignments (IDUser, IDGroup) VALUES (?, ?)",
            [IDUser, IDGroup]
        );
        
        res.status(201).json({ message: "User successfully assigned to the group." });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: "User is already assigned to group" });
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