import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Droplet, ArrowDown, ArrowUp } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#B91C1C', '#3B82F6'];

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/blood-bank/stats')
            .then(res => res.json())
            .then(d => {
                setData(d);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch data", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-8 text-center">Loading Analytics...</div>;
    if (!data) return <div className="p-8 text-center text-red-500">Error loading data. Ensure backend is running.</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Blood Bank Analytics</h1>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-l-health-green border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Available</p>
                        <p className="text-2xl font-bold text-gray-900">{data.kpi.available} Units</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full text-health-green">
                        <Droplet className="h-6 w-6" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-l-medical-blue border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Received (Month)</p>
                        <p className="text-2xl font-bold text-gray-900">{data.kpi.received} Units</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full text-medical-blue">
                        <ArrowDown className="h-6 w-6" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-l-blood-red border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Distributed (Month)</p>
                        <p className="text-2xl font-bold text-gray-900">{data.kpi.distributed} Units</p>
                    </div>
                    <div className="bg-red-100 p-3 rounded-full text-blood-red">
                        <ArrowUp className="h-6 w-6" />
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4">Inventory by Blood Type</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.inventory}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="units" fill="#B91C1C" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4">Distribution Partners</h3>
                    <div className="h-64 flex justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data.distribution}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label
                                >
                                    {data.distribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Forecast Widget */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Shortage Forecast (Next 5 Days)</h3>
                <div className="grid grid-cols-5 gap-4 text-center">
                    {data.shortageForecast.map((day, idx) => (
                        <div key={idx} className={`p-4 rounded-lg ${day.shortage > 10 ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
                            <p className="font-bold text-gray-700">{day.day}</p>
                            <p className={`text-sm ${day.shortage > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                {day.shortage > 0 ? `-${day.shortage} units` : 'Stable'}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
