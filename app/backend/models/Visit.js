// File: /app/backend/models/Visit.js

// ⭐ PERBAIKAN 1: Hapus impor di sini.
// const { DataTypes } = require('sequelize');
// const { sequelize } = require('../config/config');

module.exports = (sequelize, DataTypes) => { // ⭐ PERBAIKAN 2: Bungkus seluruh definisi model dalam fungsi

    const Visit = sequelize.define('Visit', {
        visit_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // ... (definisi kolom lainnya) ...
        emotion_detected: { type: DataTypes.STRING(50) },
        temperature: { type: DataTypes.DECIMAL(4, 1) },
        cough_type: { type: DataTypes.STRING(50) },
        pain_scale: { type: DataTypes.INTEGER, defaultValue: 0 },
        main_complaint: { type: DataTypes.TEXT },
        chronic_disease: { type: DataTypes.STRING(100) },

        spo2_category: { type: DataTypes.STRING(50) },
        breathing_difficulty: { type: DataTypes.STRING(50) },
        critical_flags: { type: DataTypes.JSON },
        
        diagnosis: { type: DataTypes.TEXT },
        hospitalization_required: { type: DataTypes.BOOLEAN, defaultValue: false },
        recommendation: { type: DataTypes.TEXT },
        status: { type: DataTypes.STRING(50), defaultValue: 'active' }

    }, {
        tableName: 'visits'
    });

    return Visit; // ⭐ WAJIB: Kembalikan objek model
};