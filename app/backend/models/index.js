// File: /app/backend/models/index.js

const { sequelize, connectDB } = require('../config/config');
const { DataTypes } = require('sequelize'); 

// Pastikan pola ekspor model Anda adalah fungsi: require('./Model')(sequelize, DataTypes)
const Patient = require('./Patient')(sequelize, DataTypes); 
const Visit = require('./Visit')(sequelize, DataTypes);     
const Diagnosis = require('./Diagnosis')(sequelize, DataTypes); 


// 1. Definisikan Relasi
// Patient <-> Visit
Patient.hasMany(Visit, {
    foreignKey: 'patient_id', 
    onDelete: 'CASCADE' 
});
Visit.belongsTo(Patient, {
    foreignKey: 'patient_id'
});

// Visit <-> Diagnosis
Visit.hasOne(Diagnosis, { 
    foreignKey: 'visit_id',
    onDelete: 'CASCADE'
});
Diagnosis.belongsTo(Visit, { 
    foreignKey: 'visit_id' 
});


// 2. Gabungkan Koneksi dan Sinkronisasi ke satu fungsi
const syncDB = async () => {
    // Anda sudah memiliki fungsi connectDB di config.js, panggil di sini
    await connectDB();
    console.log("✅ Koneksi database berhasil."); // Pesan ini akan muncul di konsol!
    
    // Perintah ini akan membuat/memperbarui semua tabel
    await sequelize.sync({ alter: true }); 
    console.log("✅ Database MySQL telah disinkronkan dan skema diperbarui!");
};


// 3. ⭐ FUNGSI UTAMA UNTUK MENGINISIALISASI DB
const initializeDB = async () => {
    try {
        await syncDB();
    } catch (error) {
        console.error("❌ Gagal memulai atau menyinkronkan database:", error);
        // Hentikan aplikasi jika DB gagal
        process.exit(1);
    }
}

// ⭐ PANGGIL FUNGSI INI AGAR PROSES DB BERJALAN SAAT FILE DI-REQUIRE
initializeDB();


// 4. Ekspor Objek yang Dibutuhkan
module.exports = {
    sequelize,
    connectDB: initializeDB, // Ekspor initializeDB sebagai connectDB untuk konsistensi
    syncDB: () => {}, // SyncDB tidak lagi diperlukan diekspor terpisah
    Patient, 
    Visit,
    Diagnosis
};