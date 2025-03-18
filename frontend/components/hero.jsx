'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = () => {
    fetch("http://localhost:5000/video")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Gagal memuat video. Silakan coba lagi.");
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <p>Memuat video...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Daftar Video</h1>
      {videos.length === 0 ? (
        <p>Belum ada video</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {videos.map((video) => (
            <div key={video.id} style={{ width: "320px" }}>
              <Link href={`/Video/${video.id}`}>
                <div style={{ cursor: "pointer" }}>
                  <img
                    src={video.thumbnail} // Pastikan data video memiliki properti `thumbnail`
                    alt={`Thumbnail for ${video.title}`}
                    style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px" }}
                  />
                  <h2 style={{ marginTop: "10px" }}>{video.title}</h2>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}