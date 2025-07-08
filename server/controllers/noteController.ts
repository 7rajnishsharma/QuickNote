import { Request, Response } from 'express';
import Note from '../models/Note';


export const createNote = async (req: Request, res: Response): Promise<void> => {
    const { title, content } = req.body;

    // Validate input
    if (!title || !content) {
        res.status(400).json({ message: 'Title and content are required' });
        return;
    }

    try {
        const note = new Note({
            userId: req.user?.id, // Use optional chaining
            title,
            content,
        });
        await note.save();
        res.status(201).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getNotes = async (req: Request, res: Response): Promise<void> => {
    try {
        const notes = await Note.find({ userId: req.user?.id }); // Use optional chaining
        res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateNote = async (req: Request, res: Response): Promise<void> => {
    const { id, title, content } = req.body;
    if (!id || !title || !content) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }
    try {
        const note = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
        if (!note) {
            res.status(404).json({ message: 'Note not found' });
            return;
        }
        res.status(200).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteNote = async (req: Request, res: Response): Promise<void> => {
    const { noteId } = req.body;

    // Validate input
    if (!noteId) {
        res.status(400).json({ message: 'Note ID is required' });
        return;
    }

    try {
        const note = await Note.findById(noteId);
        if (!note || note.userId.toString() !== req.user?.id) { // Use optional chaining
            res.status(404).json({ message: 'Note not found' });
            return;
        }

        await Note.deleteOne({ _id: noteId }); // Use deleteOne instead of remove
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const getNoteById = async (req: Request, res: Response): Promise<void> => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            res.status(404).json({ message: 'Note not found' });
            return;
        }
        res.status(200).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

