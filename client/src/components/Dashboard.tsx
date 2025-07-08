// src/components/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Note {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

const Dashboard: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [user, setUser ] = useState<{ name: string; email: string; dob: string } | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            fetchProfile();
        }
    }, [navigate]);

    const fetchProfile = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setNotes(response.data.notes);
            setUser ({ name: response.data.name, email: response.data.email, dob: response.data.dob });
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteNote = async (noteId: string) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/notes`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                data: { noteId }
            });
            setNotes(notes.filter(note => note._id !== noteId));
            alert('Note deleted successfully');
        } catch (error) {
            console.error(error);
        }
    };

    const handleNoteClick = (note: Note) => {
        navigate(`/notes/${note._id}`); // Navigate to the note's detail view
    };

    const handleCreateNote = () => {
        navigate('/create-notes'); // Navigate to create note page
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="p-4">
            {/* Navbar */}
            <nav className="flex justify-between items-center mb-4 p-4 bg-gray-800 text-white">
                <div className="text-lg font-bold">My Notes</div>
                <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
            </nav>

            {/* Greeting Card */}
            {user && (
                <div className="mb-4 p-4 border rounded shadow">
                    <h2 className="text-xl font-semibold">Welcome, {user.name}!</h2>
                    <p>Email: {user.email}</p>
                    <p>Date of Birth: {user.dob}</p>
                </div>
            )}

            {/* Create Note Button */}
            <button onClick={handleCreateNote} className="mb-4 p-2 bg-blue-500 text-white rounded">Create Note</button>

            {/* List of Notes */}
            <div>
                {notes.map(note => (
                    <div key={note._id} className="flex justify-between items-center mb-2 p-2 border rounded">
                        <span className="cursor-pointer" onClick={() => handleNoteClick(note)}>{note.title}</span>
                        <div>
                            <button onClick={() => handleDeleteNote(note._id)} className="text-red-500">Delete</button>
                            <button onClick={() => navigate(`/create-notes/${note._id}`)} className="ml-2 text-blue-500">Edit</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
