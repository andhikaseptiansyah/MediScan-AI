// File: /app/backend/models/Patient.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');

const Patient = sequelize.define('Patient', {
    patient_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    full_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    birth_date: {
        type: DataTypes.DATEONLY, // YYYY-MM-DD
        allowNull: false
    },
    face_data: {
        type: DataTypes.TEXT('long') // Untuk string Base64 yang panjang (Data mentah)
    },
    
    // --- KOLOM BARU UNTUK FACE RECOGNITION ---
    face_embedding: {
        type: DataTypes.JSON, // Menyimpan array 128D (vektor wajah)
        allowNull: true
    },
    // ------------------------------------------

    total_visits: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    last_active_emotion: {
        type: DataTypes.STRING(50)
    }
}, {
    tableName: 'patients'
});

module.exports = Patient;