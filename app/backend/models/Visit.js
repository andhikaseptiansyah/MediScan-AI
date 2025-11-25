// /app/backend/models/Visit.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');

const Visit = sequelize.define('Visit', {
    visit_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // patient_id (Foreign Key) akan dibuat di models/index.js
    
    // DATA PENILAIAN & EMOSI
    emotion_detected: { type: DataTypes.STRING(50) },
    temperature: { type: DataTypes.DECIMAL(4, 1) },
    cough_type: { type: DataTypes.STRING(50) },
    pain_scale: { type: DataTypes.INTEGER, defaultValue: 0 },
    main_complaint: { type: DataTypes.TEXT },
    chronic_disease: { type: DataTypes.STRING(100) },

    // DATA KRITIS
    spo2_category: { type: DataTypes.STRING(50) },
    breathing_difficulty: { type: DataTypes.STRING(50) },
    critical_flags: { type: DataTypes.JSON }, // JSON type didukung oleh MySQL 5.7+
    
    // OUTPUT CDS
    diagnosis: { type: DataTypes.TEXT },
    hospitalization_required: { type: DataTypes.BOOLEAN, defaultValue: false },
    recommendation: { type: DataTypes.TEXT },
    status: { type: DataTypes.STRING(50), defaultValue: 'active' } // 'active' atau 'discharged'

}, {
    tableName: 'visits'
});

module.exports = Visit;