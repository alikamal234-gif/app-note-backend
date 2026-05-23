import Note from "../models/Note.js";

// GET all notes
export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// CREATE note
export const createNote = async (req, res) => {
    try {
        const { title } = req.body;

        const note = await Note.create({
            title,
            userId: req.user.id,
        });

        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const updateNote = async (req, res) => {
    try {
        const { title } = req.body;
        const { id } = req.params;
        const note = await Note.findOneAndUpdate(
            { _id: id, userId: req.user.id },
            { title },
            { new: true }
        );
        
        if (!note) {
            return res.status(404).json({ message: "Note not found or unauthorized" });
        }
        
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({
            message : error.message
        });
    }
}

export const deleteNote = async (
    req,
    res
) => {
    try {
        const { id } = req.params;
        const note = await Note.findOneAndDelete({ _id: id, userId: req.user.id });
        
        if (!note) {
            return res.status(404).json({ message: "Note not found or unauthorized" });
        }
        
        res.status(200).json({
            message: "Note deleted",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};