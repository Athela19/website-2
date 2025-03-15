"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://192.168.133.68:5000/login",
        { email, password },
        { withCredentials: true }
      );

      console.log("Login berhasil:", response.data);
      router.push("/"); // Redirect ke halaman utama setelah login
    } catch (err) {
      setError(err.response?.data?.error || "Login gagal, coba lagi.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-blue-500">Login</h2>
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleLogin}>
          {/* Input Email */}
          <div className="mb-4 text-black">
            <label className="block font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-2xl text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Input Password + Lihat Password */}
          <div className="mb-4 relative">
            <label className="block font-medium text-black">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-2 border rounded-2xl text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          {/* Tombol Login */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-2xl hover:bg-blue-700 font-bold"
          >
            Login
          </button>
        </form>

        {/* Navigasi ke Register */}
        <p className="mt-4 text-center text-black">
          Belum punya akun?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => router.push("/Auth/register")}
          >
            Daftar disini
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
