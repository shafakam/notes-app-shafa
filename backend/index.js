// Import Package dan File
require("dotenv").config(); // Pastikan dotenv di load paling atas
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const noteRoutes = require("./routes/noteRoutes"); // Route untuk Notes

// Inisialisasi Express
const app = express();

// Konfigurasi Cors
// Izinkan semua origin agar Frontend (App Engine) bisa akses Backend (Cloud Run)
app.use(cors()); 

// Middleware untuk parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route dasar untuk testing apakah backend sudah jalan
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Backend Notes API is running!",
    status: "Success"
  });
});

// Import Schema untuk generate Tabel secara otomatis di MySQL
// Jika tabel 'notes' belum ada di database notes_NIM, Sequelize akan membuatnya
require("./schema/note"); 

// Setting Routes Utama
// Endpoint akan menjadi: http://localhost:3000/api/v1/notes
app.use("/api/v1/notes", noteRoutes); 

// Menangani Route yang tidak ditemukan (404)
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint tidak ditemukan" });
});

// Sync Database dan Jalankan Server
// process.env.PORT akan digunakan saat dideploy ke Cloud Run
const port = process.env.PORT || 5000;

sequelize
  .sync() // Menghubungkan dan sinkronisasi model dengan database
  .then(() => {
    console.log("Database synced successfully");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Gagal melakukan sinkronisasi database:", err.message);
  });
