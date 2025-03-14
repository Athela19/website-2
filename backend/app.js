import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import db from "./config/database.js";
import router from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Koneksi ke database
const connectDB = async () => {
    try {
        await db.authenticate();
        console.log("Database berhasil terkoneksi");
        await db.sync(); // Pastikan model tersinkronisasi
        console.log("Database telah disinkronisasi");
    } catch (error) {
        console.error("Database gagal terkoneksi:", error);
    }
};
connectDB();

// Middleware
app.use(cors({ credentials: true, origin: ["http://192.168.133.68:3000", "http://localhost:3000"] }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use(router);
app.use("/uploads", express.static("uploads")); // Menampilkan video secara publik

// Jalankan server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
