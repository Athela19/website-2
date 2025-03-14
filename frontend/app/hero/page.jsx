'use client';

import { useEffect, useState } from "react";

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/videos")
  .then(res => {
    console.log("Response:", res);
    return res.json();
  })
  .then(data => setVideos(data))
  .catch(err => console.error("Fetch error:", err));

  }, []);

  return (
    <div>
      <h1>Daftar Video</h1>
      {videos.length === 0 ? <p>Belum ada video</p> : (
        videos.map(video => (
          <div key={video.id}>
            <h2>{video.title}</h2>
            <video width="320" height="240" controls>
              <source src={video.url} type="video/mp4" />
              Browser Anda tidak mendukung pemutaran video.
            </video>
          </div>
        ))
      )}
    </div>
  );
}
