// File: /app/backend/models/Patient.js

// ⭐ PERBAIKAN 1: Hapus impor di sini. Mereka akan diberikan sebagai argumen.
// const { DataTypes } = require('sequelize'); 
// const { sequelize } = require('../config/config'); 

module.exports = (sequelize, DataTypes) => { // ⭐ PERBAIKAN 2: Bungkus seluruh definisi model dalam fungsi

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
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        face_data: {
            type: DataTypes.TEXT('long')
        },
        face_embedding: {
            type: DataTypes.JSON,
            allowNull: true
        },
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

    return Patient; // ⭐ WAJIB: Kembalikan objek model
};