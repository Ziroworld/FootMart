// client/src/components/admin/Mainlayout-component/Navbar.jsx

import React, { useState, useRef, useEffect } from "react";
import logo from "../../../assets/logo.png";
import avatar from "../../../assets/Avatar.png";
import { FaBell, FaCog, FaUser } from "react-icons/fa";

export default function AdminNavbar() {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <header className="w-full bg-white border-b border-[#e3f5ed] py-4 px-8 flex items-center justify-between shadow z-20">
      <div className="flex items-center gap-3">
        <img src={logo} alt="FootMart Logo" className="w-10 h-10 rounded-xl border-2 border-[#e3f5ed]" />
        <span className="font-bold text-2xl text-[#00754A] tracking-tight">FootMart Admin Dashboard</span>
      </div>
      <div className="flex items-center gap-7">
        <button className="relative group">
          <FaBell className="text-[#00754A] text-2xl hover:animate-bounce" />
          {/* Fake notification dot */}
          <span className="absolute top-0 right-0 bg-red-400 rounded-full w-2 h-2"></span>
        </button>
        <div className="relative" ref={ref}>
          <button
            className="flex items-center gap-2 px-2 py-1 rounded-xl hover:bg-[#e8ffe5] transition"
            onClick={() => setOpen((v) => !v)}
          >
            <img
              src={avatar}
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full border-2 border-[#00754A]"
            />
            <span className="font-bold text-[#26323c] ml-2 hidden sm:inline">Admin</span>
          </button>
          {open && (
            <div className="absolute right-0 mt-3 bg-white border border-[#e3f5ed] shadow-xl rounded-2xl p-2 min-w-[180px] z-40 animate-fade-in">
              <div className="px-4 py-2 text-[#00754A] font-semibold flex items-center gap-2">
                <FaUser /> My Profile
              </div>
              <div className="px-4 py-2 text-[#26323c] font-semibold hover:text-[#00754A] cursor-pointer">Settings</div>
              <div className="px-4 py-2 text-[#26323c] font-semibold hover:text-[#00754A] cursor-pointer">Switch Account</div>
              <div className="px-4 py-2 text-[#e4002b] font-bold hover:text-red-700 cursor-pointer">Logout</div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
