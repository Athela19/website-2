"use client"; // Wajib untuk menggunakan useState dan useRouter

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Gunakan next/navigation

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const [name, setName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [registerError, setRegisterError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://192.168.133.68:5000/login",
        { email, password },
        { withCredentials: true } // Gunakan cookie untuk autentikasi
      );

      console.log("Login berhasil:", response.data);
      alert("Login sukses!");

      // Redirect ke dashboard setelah login sukses
      router.push("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login gagal, coba lagi.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError("");

    try {
      const response = await axios.post(
        "http://192.168.133.68:5000/register",
        { name, email: regEmail, password: regPassword }
      );

      console.log("Register berhasil:", response.data);
      alert("Registrasi sukses! Silakan login.");
    } catch (err) {
      setRegisterError(err.response?.data?.error || "Registrasi gagal, coba lagi.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        {/* Form Login */}
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        {/* Garis Pemisah */}
        <hr className="my-6 border-gray-300" />

        {/* Form Register */}
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {registerError && <p className="text-red-500">{registerError}</p>}

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block font-medium">Nama</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
