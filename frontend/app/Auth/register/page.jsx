"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok!");
      return;
    }

    try {
      const response = await axios.post("http://192.168.133.68:5000/register", {
        name,
        email,
        password,
      });

      console.log("Registrasi berhasil:", response.data);
      alert("Registrasi sukses! Silakan login.");
      router.push("/Auth/login"); // Redirect ke halaman login setelah registrasi sukses
    } catch (err) {
      setError(err.response?.data?.error || "Registrasi gagal, coba lagi.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-blue-500">Register</h2>
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleRegister}>
          {/* Input Nama */}
          <div className="mb-4">
            <label className="block font-medium text-black">Nama</label>
            <input
              type="text"
              className="w-full p-2 border rounded-2xl text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Input Email */}
          <div className="mb-4">
            <label className="block font-medium text-black">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-2xl text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Input Password */}
          <div className="mb-4">
            <label className="block font-medium text-black">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-2xl text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Input Konfirmasi Password */}
          <div className="mb-4">
            <label className="block font-medium text-black">Konfirmasi Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-2xl text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Tombol Register */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-2xl hover:bg-blue-700 font-bold"
          >
            Register
          </button>
        </form>

        {/* Navigasi ke Login */}
        <p className="mt-4 text-center text-black">
          Sudah punya akun?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => router.push("/Auth/login")}
          >
            Login disini
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
