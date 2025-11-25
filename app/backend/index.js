// File: /app/backend/index.js

const express = require('express');
const cors = require('cors'); 
const { connectDB, syncDB } = require('./models/index'); 
const app = express();
const PORT = process.env.PORT || 3000;

// Impor Routes
const authRoutes = require('./routes/authRoutes');
const healthRoutes = require('./routes/healthRoutes');

// -----------------------------------------------------------
// --- KODE PERBAIKAN KRITIS UNTUK ERROR 413 (PAYLOAD TOO LARGE) ---
// 1. Menaikkan batas body parser Express menjadi 50MB (karena foto Base64 besar).
app.use(express.json({ limit: '50mb' })); 

// 2. Mengizinkan URL-encoded body yang besar (jika digunakan)
app.use(express.urlencoded({ limit: '50mb', extended: true })); 
// -----------------------------------------------------------


// --- KODE PERBAIKAN CORS ---
// Mengizinkan semua origin (*) untuk mengakses API Anda
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// -----------------------------------------------------------


const startServer = async () => {
    try {
        await connectDB(); 
        await syncDB();   
        
        // Hubungkan Routes ke Aplikasi
        app.use('/api/auth', authRoutes);
        app.use('/api/health', healthRoutes);
        
        app.listen(PORT, () => {
            console.log(`Server Express berjalan di http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Gagal memulai server atau database:", error);
    }
};

startServer();