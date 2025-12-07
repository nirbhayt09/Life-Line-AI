const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['donor', 'doctor', 'admin'], default: 'donor' },
    bloodType: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] }
});

const bloodStockSchema = new mongoose.Schema({
    bloodType: { type: String, required: true },
    units: { type: Number, default: 0 },
    location: { type: String, default: 'Central Bank' },
    expiryDate: { type: Date }
});

const emergencyRequestSchema = new mongoose.Schema({
    hospitalId: { type: String, required: true }, // Mocking ID as string for simplicity
    bloodType: { type: String, required: true },
    unitsNeeded: { type: Number, required: true },
    urgencyLevel: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'High' },
    status: { type: String, enum: ['Pending', 'Fulfilled'], default: 'Pending' }
});

const medicalReportSchema = new mongoose.Schema({
    patientId: { type: String },
    fileUrl: { type: String }, // In real app, cloud storage URL
    symptoms: { type: String },
    aiDiagnosisResult: { type: Object } // Store JSON result from AI
});

const User = mongoose.model('User', userSchema);
const BloodStock = mongoose.model('BloodStock', bloodStockSchema);
const EmergencyRequest = mongoose.model('EmergencyRequest', emergencyRequestSchema);
const MedicalReport = mongoose.model('MedicalReport', medicalReportSchema);

module.exports = { User, BloodStock, EmergencyRequest, MedicalReport };
