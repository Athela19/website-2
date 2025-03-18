"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

async function getVideoById(id) {
  try {
    const res = await fetch(`http://localhost:5000/video/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Gagal mengambil video:", error);
    return null;
  }
}

export default function VideoDetail() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchVideo = async () => {
      const data = await getVideoById(id);
      setVideo(data);
    };

    fetchVideo();

    return () => {
      // Hentikan video saat komponen di-unmount
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [id]);

  if (!video) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Video tidak ditemukan</h1>
        <Link href="/" style={{ color: "blue", textDecoration: "underline" }}>
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{video.title}</h1>
      <video
        ref={videoRef} // Tambahkan referensi video
        width="100%"
        height="auto"
        controls
        autoPlay
        style={{ borderRadius: "8px", marginBottom: "20px" }}
      >
        <source src={video.url} type="video/mp4" />
        Browser Anda tidak mendukung pemutaran video.
      </video>
      <p>{video.description}</p>
      <Link href="/" style={{ color: "blue", textDecoration: "underline" }}>
        Kembali ke Daftar Video
      </Link>
    </div>
  );
}
