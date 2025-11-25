// File: /app/backend/models/index.js

const { sequelize, connectDB } = require('../config/config');
const Patient = require('./Patient'); 
const Visit = require('./Visit');     

// 1. Definisikan Relasi
Patient.hasMany(Visit, {
    foreignKey: 'patient_id', 
    onDelete: 'CASCADE' 
});
Visit.belongsTo(Patient, {
    foreignKey: 'patient_id'
});

// 2. Fungsi Sinkronisasi (untuk dipanggil dari /backend/index.js)
const syncDB = async () => {
    await sequelize.sync({ alter: true }); 
    console.log("✅ Database MySQL telah disinkronkan dan skema diperbarui!");
};

module.exports = {
    sequelize,
    connectDB,
    syncDB,
    Patient, 
    Visit    
};