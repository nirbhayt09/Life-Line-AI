import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Activity, Users, ArrowRight } from 'lucide-react';

export default function Landing() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
                    <div className="text-center">
                        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                            <span className="block">Join the</span>
                            <span className="block text-blood-red">Lifesaving Mission</span>
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                            Bridging the gap between AI healthcare and intelligent blood management. Connect with donors, find resources, and get AI-powered diagnostics.
                        </p>
                        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                            <div className="rounded-md shadow">
                                <Link to="/register-donor" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blood-red hover:bg-red-800 md:py-4 md:text-lg md:px-10">
                                    Register as Donor
                                </Link>
                            </div>
                            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                                <Link to="/ai-health" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-medical-blue bg-blue-50 hover:bg-blue-100 md:py-4 md:text-lg md:px-10">
                                    Explore AI Health
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Info Cards */}
            <section className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                            <div className="mx-auto h-12 w-12 text-blood-red bg-red-100 rounded-full flex items-center justify-center mb-4">
                                <Heart className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">Save Lives</h3>
                            <p className="mt-2 text-gray-500">Become a hero by donating blood. Our system tracks real-time needs.</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                            <div className="mx-auto h-12 w-12 text-medical-blue bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                <Activity className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">Easy Process</h3>
                            <p className="mt-2 text-gray-500">Seamless coordination between hospitals and blood banks using AI.</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                            <div className="mx-auto h-12 w-12 text-health-green bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <Users className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">Community</h3>
                            <p className="mt-2 text-gray-500">Join a vast network of doctors, patients, and donors working together.</p>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <Link to="/dashboard" className="text-medical-blue font-semibold hover:text-blue-700 flex items-center justify-center gap-2">
                            Go to Blood Bank Dashboard <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
