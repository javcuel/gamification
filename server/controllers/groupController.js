import db from "../config/db.js";

// Create a new group for a subject
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

// Delete a group (Protected for Teachers groups)
export const deleteGroup = async (req, res) => {
    const { id } = req.params;
    try {
        // 1. Check if the group has the teacher flag enabled
        const [[group]] = await db.query("SELECT IsTeacherGroup FROM subjectGroups WHERE IDGroup = ?", [id]);

        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        if (group.IsTeacherGroup === 1) {
            return res.status(403).json({ message: "Action denied: The default Teachers group cannot be deleted." });
        }

        // 2. If it is not from teachers, we proceed to delete
        await db.query("DELETE FROM subjectGroups WHERE IDGroup = ?", [id]);
        res.json({ message: "Group deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all the groups for a specific subject
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