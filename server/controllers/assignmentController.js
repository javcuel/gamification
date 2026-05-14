import db from "../config/db.js";

// Vincular un usuario a un grupo (Con validación bidireccional de Roles en Inglés)
export const createAssignment = async (req, res) => {
    const { UserName, IDGroup } = req.body;
    
    try {
        // 1. Get user data
        const [[user]] = await db.query("SELECT IDUser, UserType FROM users WHERE Name = ?", [UserName]);
        
        if (!user) {
            return res.status(404).json({ message: `User '${UserName}' does not exist.` });
        }
        
        const IDUser = user.IDUser;
        const UserType = user.UserType;

        // 2. Get group data
        const [[groupInfo]] = await db.query(
            "SELECT IDSubject, IsTeacherGroup FROM subjectGroups WHERE IDGroup = ?",
            [IDGroup]
        );

        if (!groupInfo) {
            return res.status(404).json({ message: "Group does not exist." });
        }

        const subjectId = groupInfo.IDSubject;
        const isTeacherGroup = groupInfo.IsTeacherGroup; // 1 = Teacher, 0 = Student

        // 3. BUSINESS RULES: Cross-role validation
        
        // RULE A: Teacher Group -> Only allows 'T' users
        if (isTeacherGroup === 1 && UserType !== 'T') {
            return res.status(400).json({ 
                message: `Access denied: User '${UserName}' is not a TEACHER and this group is exclusive for teachers.` 
            });
        }

        // RULE B: Student Group -> Does NOT allow 'T' users
        if (isTeacherGroup === 0 && UserType === 'T') {
            return res.status(400).json({ 
                message: `Access denied: User '${UserName}' is a TEACHER. Teachers can only be assigned to teacher type groups.` 
            });
        }

        // 4. Auto-Migration (Cleanup previous groups in the same subject)
        await db.query(`
            DELETE a FROM assignments a
            JOIN subjectGroups sg ON a.IDGroup = sg.IDGroup
            WHERE a.IDUser = ? AND sg.IDSubject = ?
        `, [IDUser, subjectId]);

        // 5. Final Insertion
        await db.query(
            "INSERT INTO assignments (IDUser, IDGroup) VALUES (?, ?)",
            [IDUser, IDGroup]
        );
        
        res.status(201).json({ message: "User assigned correctly." });

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: "User already belongs to this group." });
        }
        console.error("Error in createAssignment:", error);
        res.status(500).json({ message: "Internal error assigning the user." });
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