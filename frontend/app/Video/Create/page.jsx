"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";



const CreateVideo = () => {
    const router = useRouter();
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null); // Untuk mereset input file

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
      const res = await fetch("http://localhost:5000/video/upload", {
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
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset input file
      }
      setLoading(false);
      router.push("/");
    } catch (error) {
      console.error("Upload error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
     
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <form
        onSubmit={handleUpload}
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md"
      >
        <input
          type="text"
          placeholder="Judul Video"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 mb-3 border rounded"
        />
        <textarea
          placeholder="Deskripsi Video"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        ></textarea>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileInputRef}
          required
          className="w-full p-2 mb-3 border rounded"
        />
        <button
        
          type="submit"
          disabled={loading}
          className={`w-full p-2 text-white rounded ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
          }`}
        >
          {loading ? "Mengunggah..." : "Unggah Video"}
        </button>
      </form>
    </div>
  );
};

export default CreateVideo;
