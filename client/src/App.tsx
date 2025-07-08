// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CreateNote from './components/CreateNote';
import NoteDetail from './components/NoteDetail';
import Login from './components/Login';
import Signup from './components/Signup';

// Utility function to check if the user is authenticated
const isAuthenticated = () => {
    return !!localStorage.getItem('token'); // Check if token exists
};

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
                
                {/* Redirect from base URL */}
                <Route path="/" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
