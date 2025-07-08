// src/components/NoteDetail.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const NoteDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [note, setNote] = useState<{ title: string; content: string } | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchNote();
    }, [id]);

    const fetchNote = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/notes/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setNote(response.data);
        } catch (error) {
            console.error(error);
            // Handle error appropriately, e.g., show a message to the user
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/notes`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                data: { noteId: id }
            });
            alert('Note deleted successfully');
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = () => {
        navigate(`/create-notes/${id}`); // Navigate to edit mode
    };

    return (
        <div className="p-4">
            {note ? (
                <div>
                    <h1 className="text-2xl mb-4">{note.title}</h1>
                    <div className="flex justify-between mb-4">
                        <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
                        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                    </div>
                    <p>{note.content}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default NoteDetail;
