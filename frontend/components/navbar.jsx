"use client"; // Jika menggunakan Next.js App Router

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa"; // Import ikon dari react-icons

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false); // State untuk menu mobile

    return (
        <nav className="bg-white py-4 px-7 border-b-2 border-black">
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center">
                    <img src="/globe.svg" alt="logo" className="w-8 h-8" />
                    <h1 className="pl-3 text-black text-2xl font-semibold cursor-pointer">
                        LOGO.
                    </h1>
                </div>

                {/* Menu - Desktop */}
                <ul className="hidden md:flex gap-5 cursor-pointer text-black font-medium">
                    <li className="relative transition-colors duration-300 hover:text-blue-500 after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 after:-translate-x-1/2 hover:after:w-full">
                        <Link href="/">list-1</Link>
                    </li>
                    <li className="relative transition-colors duration-300 hover:text-blue-500 after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 after:-translate-x-1/2 hover:after:w-full">
                        <Link href="/about">list-2</Link>
                    </li>
                    <li className="relative transition-colors duration-300 hover:text-blue-500 after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 after:-translate-x-1/2 hover:after:w-full">
                        <Link href="/contact">list-3</Link>
                    </li>
                </ul>

                {/* Tombol Login - Desktop */}
                <div className="hidden md:block">
                    <Link href="/login">
                        <button className="transition-colors duration-300 font-medium border-2 border-black px-4 py-2 bg-black text-white rounded-lg hover:bg-white hover:text-black">
                            Login
                        </button>
                    </Link>
                </div>

                {/* Menu Hamburger - Mobile */}
                <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Menu - Mobile */}
            <div className={`md:hidden transition-all duration-300 ${isOpen ? "block" : "hidden"}`}>
                <ul className="flex flex-col items-center gap-4 bg-white py-4 border-t border-black">
                    <li className="hover:text-blue-500 transition-colors duration-300">
                        <Link href="/" onClick={() => setIsOpen(false)}>list-1</Link>
                    </li>
                    <li className="hover:text-blue-500 transition-colors duration-300">
                        <Link href="/about" onClick={() => setIsOpen(false)}>list-2</Link>
                    </li>
                    <li className="hover:text-blue-500 transition-colors duration-300">
                        <Link href="/contact" onClick={() => setIsOpen(false)}>list-3</Link>
                    </li>
                    <li>
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                            <button className="transition-colors duration-300 font-medium border-2 border-black px-4 py-2 bg-black text-white rounded-lg hover:bg-white hover:text-black">
                                Login
                            </button>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
