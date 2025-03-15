'use client';

import { useEffect, useState } from "react";

export default function Hero() {
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = () => {
    fetch("http://192.168.133.68:5000/video")
      .then(res => res.json())
      .then(data => setVideos(data))
      .catch(err => console.error("Fetch error:", err));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
  
    if (!title || !file) {
      alert("Judul dan video wajib diisi!");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", file);
  
    setLoading(true);
  
    try {
      const res = await fetch("http://192.168.133.68:5000/video/upload", {
        method: "POST",
        body: formData,
        credentials: "include", // Pastikan cookie dikirim
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal mengunggah video");
      }
  
      const data = await res.json();
      alert("Video berhasil diunggah!");
      setVideos([data.video, ...videos]);
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (error) {
      console.error("Upload error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div>
      <h1>Daftar Video</h1>

      {/* Form Upload Video */}
      <form onSubmit={handleUpload} style={{ marginBottom: "20px" , marginTop:"7rem"}}>
        <input
          type="text"
          placeholder="Judul Video"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Deskripsi Video"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Mengunggah..." : "Unggah Video"}
        </button>
      </form>

      {/* Menampilkan Daftar Video */}
      {videos.length === 0 ? (
        <p>Belum ada video</p>
      ) : (
        videos.map((video) => (
          <div key={video.id}>
            <h2>{video.title}</h2>
            <video width="320" height="240" controls>
              <source src={video.url} type="video/mp4" />
              Browser Anda tidak mendukung pemutaran video.
            </video>
            <p>{video.description}</p>
          </div>
        ))
      )}
    </div>
  );
}
