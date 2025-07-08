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
    const [user, setUser] = useState<{ name: string; email: string; dob: string } | null>(null);
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
            setUser({ name: response.data.name, email: response.data.email, dob: response.data.dob });
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
        <>
            <main className="w-full max-w-[450px] mx-auto px-4">

                {/* Navbar (sticks to top) */}
                <nav className="w-full flex justify-between items-center p-4 mt-5">
                    <div className="text-lg font-bold flex items-center justify-center gap-2">
                        <img src="logo.svg" alt="" className='w-[47px] h-[32px] opacity-100' />
                        <h3 className='font-[Inter] font-medium text-[20px] leading-[110%] tracking-[-0.04em] text-center text-[#232323]'>Dashboard</h3>
                    </div>

                    <button onClick={handleLogout} className="font-[Inter] font-semibold text-[14px] leading-[150%] tracking-normal text-center underline underline-offset-0 decoration-[0.5px] decoration-solid text-[#367AFF]">Logout</button>
                </nav>

                {/* Main Content Container */}
                <div className="w-full max-w-3xl p-4">
                    {user && (
                        <div className="mt-5 opacity-100 gap-[10px] p-5 rounded-[10px] border border-[#d9d9d9] shadow-[0px_2px_6px_rgba(0,0,0,0.59)]">
                            <h2 className="font-[Inter] font-bold text-[22px] leading-[2.5] tracking-normal">Welcome, {user.name}!</h2>
                            <p>Email: {user.email}</p>
                        </div>
                    )}

                    <button
                        onClick={handleCreateNote}
                        className="mt-6 w-full h-[52px] opacity-100 rounded-[10px] px-2 py-4 bg-[#367AFF] flex items-center justify-center gap-2 text-white font-medium cursor-pointer"
                    >
                        Create Note
                    </button>

                    <h3 className="mt-8">Notes</h3>
                    <div>
                        {notes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((note) => (
                            <div
                                key={note._id}
                                className="mt-2 flex justify-between items-center mb-2 p-4 rounded-[10px] border border-[#d9d9d9] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.59)]"
                            >
                                <span className="cursor-pointer overflow-hidden" onClick={() => handleNoteClick(note)}>
                                    {note.title.length > 20 ? `${note.title.substring(0, 20)}...` : note.title}
                                </span>
                                <div>
                                    <button onClick={() => navigate(`/create-notes/${note._id}`)} className="ml-2 text-blue-500">
                                        <img src="edit.svg" alt="" className='w-6 h-6 mr-3' />
                                    </button>
                                    <button onClick={() => handleDeleteNote(note._id)} className="text-red-500">
                                        <img src="delete.svg" alt="" className='w-6 h-6' />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </main>


        </>

    );
};

export default Dashboard;
