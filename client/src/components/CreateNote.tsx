// src/components/CreateNote.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CreateNote: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            setIsEditMode(true);
            fetchNote();
        }
    }, [id]);

    const fetchNote = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/notes/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setTitle(response.data.title);
            setContent(response.data.content);
        } catch (error) {
            console.error(error);
        }
    };

   const handleSaveNote = async () => {
    try {
        if (isEditMode) {
            await axios.put(`${import.meta.env.VITE_API_URL}/api/notes`, { id, title, content }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
        } else {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/notes`, { title, content }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
        }
        navigate('/dashboard');
    } catch (error) {
        console.error(error);
        // Optionally, handle the error by showing a message to the user
    }
};


    return (
        <main className="max-w-[450px] mx-auto px-4">
        <div className="p-4">
            <h1 className="font-[Inter] font-bold text-[22px] leading-[2.5] tracking-normal">{isEditMode ? 'Edit Note' : 'Create Note'}</h1>
            <input
                type="text"
                placeholder="Note Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mb-2 p-2 border rounded w-full"
            />
            <textarea
                placeholder="Note Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mb-2 p-2 border rounded w-full"
                rows={10}
            />
            <button onClick={handleSaveNote} className="p-2 bg-blue-500 text-white rounded">
                {isEditMode ? 'Update Note' : 'Save Note'}
            </button>
        </div>
        </main>
    );
};

export default CreateNote;
