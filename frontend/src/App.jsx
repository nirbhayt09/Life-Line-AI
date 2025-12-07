import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import DiseaseDetection from './pages/DiseaseDetection';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-slate-50 font-sans">
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/ai-health" element={<DiseaseDetection />} />
                    </Routes>
                </main>
                <Chatbot />
            </div>
        </Router>
    );
}

export default App;
