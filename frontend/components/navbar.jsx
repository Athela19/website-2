"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faSearch } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
        try {
            const res = await axios.get("http://192.168.133.68:5000/users", { 
                withCredentials: true 
            });
            console.log("User data:", res.data); // Debugging
            setUser(res.data);
        } catch (error) {
            console.error("Error fetching user:", error.response?.data);
            setUser(null);
        }
    };
    fetchUser();
}, []);


  return (
    <nav className="bg-white shadow-md py-2 px-15 flex items-center justify-between w-full">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-1">
      <img src="/file.svg" alt="Logo" width={25} height={25} />
        <h1 className="text-xl font-bold text-blue-500">MyWebsite.</h1>
      </Link>

      {/* Search Bar */}
      <div className="relative w-150">
      <FontAwesomeIcon
        icon={faSearch}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600  w-4 h-4"
      />
      <input
        type="text"
        placeholder="Cari video..."
        className="w-full px-10 py-2 border rounded-3xl focus:outline-none text-gray-800 focus:border-blue-500"
      />
    </div>

      {/* Bagian kanan */}
      <div className="flex items-center space-x-4">
        {user ? (
          <>
          {/* Tombol Create */}
          <Link href="/create">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-700 font-bold ">
                + Create
              </button>
            </Link>
            {/* Foto Profil */}
            <div className="relative w-10 h-10">
      {user.url ? (
        <Image
          src={user.url}
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full"
        />
      ) : (
        <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full">
          <FontAwesomeIcon icon={faUser} className="text-gray-600" />
        </div>
      )}
    </div>
            
          </>
        ) : (
          <>
            <Link href="/Auth/login">
              <button className="py-2 text-blue-500 hover:text-blue-700">
                Login
              </button>
            </Link>
            <Link href="/Auth/register">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-3xl font-bold hover:bg-blue-700">
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
