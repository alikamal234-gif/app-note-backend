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

export const updateNote = async (req, res) => {
    try {
        const { title } = await req.body
        const { id } = req.params
        const note = await Note.findByIdAndUpdate(id,{title},{new:true})
        res.status(200).json(note)
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}

export const deleteNote = async (
    req,
    res
) => {
    try {
        const { id } = req.params;
        await Note.findByIdAndDelete(id);
        res.status(200).json({
            message: "Note deleted",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};