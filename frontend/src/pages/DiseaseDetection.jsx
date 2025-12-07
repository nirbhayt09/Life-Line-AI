import React, { useState } from 'react';
import { Upload, FileText, Activity } from 'lucide-react';

export default function DiseaseDetection() {
    const [file, setFile] = useState(null);
    const [symptoms, setSymptoms] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleUpload = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) return alert('Please upload a file');

        setLoading(true);
        setResult(null);

        // Call mock API
        fetch('/api/ai/diagnose', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ symptoms, fileType: file.type })
        })
            .then(res => res.json())
            .then(data => {
                setResult(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">

                {/* Form Section */}
                <div className="p-8 md:w-1/2 border-r border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <Activity className="h-6 w-6 text-medical-blue mr-2" />
                        AI Disease Detection
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Medical Scan (X-Ray/PDF)</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-medical-blue transition-colors">
                                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                                <input type="file" onChange={handleUpload} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-medical-blue hover:file:bg-blue-100" />
                                <p className="text-xs text-gray-400 mt-2">Supported: JPG, PNG, PDF</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Symptoms</label>
                            <textarea
                                rows="3"
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-medical-blue focus:ring-medical-blue sm:text-sm p-3 border"
                                placeholder="e.g. Dry cough, chest pain, fever..."
                                value={symptoms}
                                onChange={(e) => setSymptoms(e.target.value)}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 rounded-md text-white font-semibold transition-all ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-medical-blue hover:bg-blue-700'}`}
                        >
                            {loading ? 'Analyzing with AI Model...' : 'Run Diagnostics'}
                        </button>
                    </form>
                </div>

                {/* Result Section */}
                <div className="p-8 md:w-1/2 bg-slate-50 flex items-center justify-center">
                    {!result && !loading && (
                        <div className="text-center text-gray-400">
                            <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                            <p>Upload a file to see AI analysis results.</p>
                        </div>
                    )}

                    {loading && (
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-blue mx-auto mb-4"></div>
                            <p className="text-medical-blue font-medium animate-pulse">Processing ResNet-50 Model...</p>
                        </div>
                    )}

                    {result && (
                        <div className="w-full space-y-4 animate-fade-in">
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-green-800">Diagnosis</span>
                                <h3 className="text-2xl font-bold text-green-700">{result.diagnosis}</h3>
                                <p className="text-sm text-green-600 mt-1">Confidence Score: {(result.confidence * 100).toFixed(1)}%</p>
                            </div>

                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <h4 className="font-semibold text-gray-900 mb-2">Key Findings:</h4>
                                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                    {result.findings.map((f, i) => <li key={i}>{f}</li>)}
                                </ul>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <h4 className="font-semibold text-blue-900 mb-1">Recommendation:</h4>
                                <p className="text-sm text-blue-800">{result.recommendation}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
