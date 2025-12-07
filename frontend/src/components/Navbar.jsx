import React from 'react';
import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                            <div className="bg-blood-red p-1.5 rounded-lg text-white">
                                <Activity className="h-6 w-6" />
                            </div>
                            <span className="text-xl font-bold text-gray-900 tracking-tight">Lifeline AI</span>
                        </Link>
                        <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                            <Link to="/" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-medical-blue text-sm font-medium">Home</Link>
                            <Link to="/dashboard" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-medical-blue text-sm font-medium">Blood Bank</Link>
                            <Link to="/ai-health" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-medical-blue text-sm font-medium">AI Health</Link>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800">Login</button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
