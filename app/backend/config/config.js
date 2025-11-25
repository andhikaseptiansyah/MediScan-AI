const { Sequelize } = require('sequelize');

// *Ganti 'root' dan 'password_mysql' dengan credential MySQL Anda yang sebenarnya.*
const sequelize = new Sequelize('ai_mediscan', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    // Konfigurasi tambahan MySQL
    define: {
        timestamps: true, // Otomatis menambahkan kolom createdAt dan updatedAt
        underscored: true // Menggunakan snake_case untuk nama kolom (e.g., patient_id)
    }
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Koneksi MySQL berhasil.');
    } catch (error) {
        console.error('❌ Koneksi MySQL GAGAL:', error);
        process.exit(1); 
    }
};

module.exports = { sequelize, connectDB };