// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CreateNote from './components/CreateNote';
import NoteDetail from './components/NoteDetail';
import Login from './components/Login';
import Signup from './components/Signup';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create-notes" element={<CreateNote />} />
                <Route path="/create-notes/:id" element={<CreateNote />} />
                <Route path="/notes/:id" element={<NoteDetail />} />
            </Routes>
        </Router>
    );
};

export default App;
