import Note from "../models/Note.js";

// GET all notes
export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
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
        });

        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};