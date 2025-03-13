"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token"); // Ambil token dari cookie
    if (token) {
      try {
        const decodedUser = jwtDecode(token); // Decode token JWT
        setUser(decodedUser); // Simpan user yang sudah didecode
        console.log("Decoded User:", decodedUser); // Debugging
      } catch (error) {
        console.error("Token tidak valid:", error);
      }
    }
  }, []);

  return (
    <nav className="bg-white py-4 px-4 border-b-2 border-grey-300 w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/file.svg" alt="logo" className="w-8 h-8 hidden md:block" />
          <h1 className="pl-3 text-blue-500 text-3xl font-bold cursor-pointer hidden md:block">
            Dekstop
          </h1>

          <img src="/globe.svg" alt="logo" className="w-6 h-6 block md:hidden" />
          <h1 className="pl-1 text-blue-500 text-2xl font-bold cursor-pointer block md:hidden">
            Mobile
          </h1>
        </div>

        <ul className="hidden md:flex gap-5 cursor-pointer text-black font-semibold">
          <li className="relative transition-colors duration-300 hover:text-blue-500 after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 after:-translate-x-1/2 hover:after:w-full">
            <Link href="#Home">Home</Link>
          </li>
          <li className="relative transition-colors duration-300 hover:text-blue-500 after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 after:-translate-x-1/2 hover:after:w-full">
            <Link href="#About">About</Link>
          </li>
          <li className="relative transition-colors duration-300 hover:text-blue-500 after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 after:-translate-x-1/2 hover:after:w-full">
            <Link href="#Contact">Contact</Link>
          </li>
        </ul>

        <div className="hidden md:flex items-center gap-1">
          {user ? (
            <Link href="/profile">
              <img
                src={user.url || "/default-profile.png"}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover cursor-pointer"
              />
            </Link>
          ) : (
            <>
              <Link href="/login">
                <button className="font-bold transition-colors duration-300 px-4 py-2 text-blue-500 hover:text-black">
                  Login
                </button>
              </Link>
              <Link href="/register">
                <button className="font-bold transition-colors duration-300 border-2 border-blue-500 px-4 py-2 bg-blue-500 text-white rounded-2xl hover:bg-white hover:text-blue-500">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden text-2xl text-blue-500" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className={`md:hidden transition-all duration-300 ${isOpen ? "block" : "hidden"}`}>
        <ul className="flex flex-col items-center gap-4 bg-white py-4 border-t border-grey mt-4">
          <li className="text-black">
            <Link href="#Home" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li className=" text-black">
            <Link href="#About" onClick={() => setIsOpen(false)}>
              About
            </Link>
          </li>
          <li className="text-black">
            <Link href="#Contact" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </li>
          <li>
            {user ? (
              <Link href="/profile" onClick={() => setIsOpen(false)}>
                <img
                  src={user.url || "/default-profile.png"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover cursor-pointer"
                />
              </Link>
            ) : (
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <button className="transition-colors duration-300 font-medium border-2 border-blue-500 px-4 py-2 bg-blue-500 text-white rounded-2xl hover:bg-white hover:text-black">
                  Login
                </button>
              </Link>
            )}
          </li>
        </ul> 
      </div>
    </nav>
  );
}
