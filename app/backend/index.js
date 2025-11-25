// File: /app/backend/index.js

const express = require('express');
const cors = require('cors'); 
// ⭐ PERBAIKAN KRITIS: Impor seluruh objek 'db' dari models/index. 
// Koneksi DB dan sinkronisasi akan terjadi saat file ini di-require.
const db = require('./models/index'); 
const app = express();
// Menggunakan dotenv atau nilai default
const PORT = process.env.PORT || 3000; 

// Impor Routes
const authRoutes = require('./routes/authRoutes');
const healthRoutes = require('./routes/healthRoutes');

// --- Middleware ---

// Menaikkan batas body parser Express menjadi 50MB untuk menangani gambar Base64 wajah.
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true })); 

// Konfigurasi CORS: Mengizinkan semua origin (*) untuk akses API.
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// --- Logika Start Server ---
const startServer = () => {
    // ⚠️ Catatan: connectDB dan syncDB dijalankan di dalam models/index.js.
    // Jika koneksi/sync gagal, aplikasi Node.js akan dihentikan (process.exit) di file models/index.js.
    // Jika models/index.js berhasil di-require, diasumsikan DB sudah siap.
    
    try {
        // Hubungkan Routes ke Aplikasi
        app.use('/api/auth', authRoutes);
        app.use('/api/health', healthRoutes);
        
        // Cek koneksi dasar (Opsional, hanya untuk memastikan server hidup)
        app.get('/', (req, res) => {
            res.status(200).send("MediScan AI Backend is Running!");
        });

        app.listen(PORT, () => {
            console.log(`Server Express berjalan di http://localhost:${PORT}`);
            console.log("Status DB ditangani oleh models/index.js.");
        });
        
    } catch (error) {
        // Blok ini mungkin tidak terjangkau jika error DB terjadi di models/index.js
        console.error("Gagal memulai server Express:", error);
    }
};

// Panggil fungsi startServer setelah models/index berhasil dimuat
startServer();