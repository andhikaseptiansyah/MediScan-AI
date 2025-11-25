// /app/backend/models/Diagnosis.js

module.exports = (sequelize, DataTypes) => {
    const Diagnosis = sequelize.define("Diagnosis", {
        // ID Unik untuk setiap hasil diagnosis
        diagnosis_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        // --- Output Utama dari Model CDS ---
        
        // Status Perawatan (Digunakan untuk membedakan History: 'Rawat Inap' atau 'Rawat Jalan')
        care_status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        // Diagnosis Awal (e.g., 'Penyakit Pernapasan Atas', 'Gangguan Pencernaan Ringan')
        initial_diagnosis: {
            type: DataTypes.STRING,
            allowNull: false
        },

        // Alasan Utama Penentuan Status Kritis (Diisi jika care_status = 'Rawat Inap')
        critical_reason: {
            type: DataTypes.TEXT, // Disimpan sebagai string JSON atau teks biasa
            allowNull: true
        },
        
        // Rekomendasi Pemulihan (Awal atau Ulang)
        recovery_recommendation: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        
        // --- Status dan Metrik Tambahan ---

        // Menandakan apakah ini adalah hasil evaluasi awal atau Rekomendasi Ulang
        is_re_evaluated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        
        // Metrik Kritis pada saat diagnosis dibuat (untuk perbandingan saat re-evaluasi)
        spo2_at_diagnosis: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        temp_at_diagnosis: {
            type: DataTypes.FLOAT,
            allowNull: true
        }

        // Catatan: visit_id akan didefinisikan dalam fungsi asosiasi (db.js)
        
    }, {
        // Pengaturan tambahan
        tableName: 'diagnosis',
        timestamps: true // Menambahkan createdAt dan updatedAt secara otomatis
    });

    // --- Definisi Asosiasi (Hubungan) ---
    // Di file Index.js, Anda akan mendefinisikan:
    // Diagnosis.belongsTo(models.Visit, { foreignKey: 'visit_id' });
    
    return Diagnosis;
};