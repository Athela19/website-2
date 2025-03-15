import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import upload from "../middleware/upload.js";
import Video from "../models/video.js"; // Menggunakan Sequelize Model

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Upload video
export const uploadVideo = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ error: err.message });

    const { title, description } = req.body;
    if (!req.file) return res.status(400).json({ error: "Video tidak ditemukan" });

    try {
      console.log("User ID:", req.userId); // Debugging: Pastikan userId ada di log

      const newVideo = await Video.create({
        title,
        description,
        filename: req.file.filename,
        userId: req.userId, // Gunakan userId dari token
      });

      res.json({ message: "Video berhasil diunggah", video: newVideo });
    } catch (error) {
      console.error("Upload Video Error:", error);
      res.status(500).json({ error: error.message });
    }
  });
};



// Get semua video
export const getVideos = async (req, res) => {
  try {
    const videos = await Video.findAll({
      order: [["createdAt", "DESC"]],
    });

    console.log("Videos dari database:", videos); // Debugging

    if (!Array.isArray(videos)) {
      console.error("Kesalahan: videos bukan array!");
      return res.status(500).json({ error: "Data tidak valid" });
    }

    const videoList = videos.map((video) => ({
      id: video.id,
      title: video.title,
      description: video.description,
      url: `${req.protocol}://${req.get("host")}/uploads/${video.filename}`,
    }));

    res.json(videoList);
  } catch (error) {
    console.error("Error mengambil video:", error);
    res.status(500).json({ error: error.message });
  }
};


// Get video berdasarkan ID
export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.id);

    if (!video) return res.status(404).json({ error: "Video tidak ditemukan" });

    res.json({
      ...video.toJSON(),
      url: `${req.protocol}://${req.get("host")}/uploads/${video.filename}`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Hapus video
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.id);
    if (!video) return res.status(404).json({ error: "Video tidak ditemukan" });

    const filePath = path.join(__dirname, "../uploads/", video.filename);

    // Hapus file video dari server
    fs.unlink(filePath, async (err) => {
      if (err && err.code !== "ENOENT") {
        return res.status(500).json({ error: "Gagal menghapus file video" });
      }

      // Hapus dari database
      await video.destroy();
      res.json({ message: "Video berhasil dihapus" });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
