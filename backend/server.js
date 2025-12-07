const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { BloodStock, EmergencyRequest, MedicalReport } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

// Mock DB connection
// mongoose.connect('mongodb://localhost:27017/lifeline-ai');

// --- API ROUTES ---

// 1. Blood Bank Dashboard Data
app.get('/api/blood-bank/stats', (req, res) => {
    // Return mock data for dashboard
    res.json({
        kpi: {
            available: 1250, // units
            received: 340,   // this month
            distributed: 210 // this month
        },
        inventory: [
            { name: 'A+', units: 120 }, { name: 'A-', units: 45 },
            { name: 'B+', units: 200 }, { name: 'B-', units: 50 },
            { name: 'O+', units: 300 }, { name: 'O-', units: 80 },
            { name: 'AB+', units: 60 }, { name: 'AB-', units: 15 },
        ],
        distribution: [
            { name: 'Central Hospital', value: 400 },
            { name: 'City Clinic', value: 300 },
            { name: 'Trauma Center', value: 300 },
            { name: 'Other', value: 200 },
        ],
        shortageForecast: [
            { day: 'Mon', shortage: 10 },
            { day: 'Tue', shortage: 5 },
            { day: 'Wed', shortage: 0 },
            { day: 'Thu', shortage: 20 }, // High demand predicted
            { day: 'Fri', shortage: 15 },
        ]
    });
});

// 2. Mock AI Disease Detection
app.post('/api/ai/diagnose', (req, res) => {
    const { symptoms, fileType } = req.body;

    // Simulate 3-second delay for "processing"
    setTimeout(() => {
        // Return realistic mock response
        res.json({
            diagnosis: "Pneumonia",
            confidence: 0.94,
            model: "ResNet-50",
            findings: [
                "Opacities detected in right upper lobe.",
                "No pleural effusion observed."
            ],
            recommendation: "Immediate consultation with Pulmonologist recommended."
        });
    }, 3000);
});

// 3. Mock Chatbot
app.post('/api/ai/chat', (req, res) => {
    const { message } = req.body;
    let reply = "I'm not sure, please consult a doctor.";

    if (message.toLowerCase().includes('cough')) {
        reply = "Is your cough dry or wet? If it persists for more than 2 weeks, getting a checkup is advised.";
    } else if (message.toLowerCase().includes('lung health')) {
        reply = "To improve lung health: 1. Quit smoking. 2. Exercise regularly to increase lung capacity. 3. Avoid exposure to pollutants.";
    } else {
        reply = "I am a medical assistant. I can help with general health queries. How can I assist you today?";
    }

    // Simulate small latency
    setTimeout(() => {
        res.json({ reply });
    }, 1000);
});

// 4. Emergency Broadcast
app.post('/api/blood-bank/emergency', (req, res) => {
    const { bloodType, units, hospital } = req.body;
    console.log(`[Urgent] ${hospital} needs ${units} units of ${bloodType}!`);
    res.json({ success: true, message: 'Emergency broadcast sent to 15 nearby donors.' });
});

const path = require('path');

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Lifeline AI Backend running on port ${PORT}`));
