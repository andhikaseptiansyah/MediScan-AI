// File: /app/backend/models/index.js

// Asumsi: Anda telah memindahkan logika inisialisasi koneksi Sequelize 
// ke file /backend/config/config.js.

const { sequelize, connectDB } = require('../config/config');
const Patient = require('./Patient'); 
const Visit = require('./Visit');     
const Diagnosis = require('./Diagnosis'); // ⭐ PERBAIKAN 1: Impor model Diagnosis

// 1. Definisikan Relasi

// Relasi Patient <-> Visit (One-to-Many)
Patient.hasMany(Visit, {
    foreignKey: 'patient_id', 
    onDelete: 'CASCADE' 
});
Visit.belongsTo(Patient, {
    foreignKey: 'patient_id'
});

// ⭐ PERBAIKAN 2: Relasi Visit <-> Diagnosis (One-to-One)
Visit.hasOne(Diagnosis, { 
    foreignKey: 'visit_id',
    onDelete: 'CASCADE'
});
Diagnosis.belongsTo(Visit, { 
    foreignKey: 'visit_id' 
});


// 2. Fungsi Sinkronisasi (untuk dipanggil dari /backend/index.js)
const syncDB = async () => {
    // Perintah ini akan membuat tabel Diagnosis karena sekarang sudah diimpor dan didefinisikan relasinya.
    await sequelize.sync({ alter: true }); 
    console.log("✅ Database MySQL telah disinkronkan dan skema diperbarui!");
};

module.exports = {
    sequelize,
    connectDB,
    syncDB,
    Patient, 
    Visit,
    Diagnosis // ⭐ PERBAIKAN 3: Ekspor model Diagnosis
};