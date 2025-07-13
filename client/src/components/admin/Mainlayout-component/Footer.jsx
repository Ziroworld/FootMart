// client/src/components/admin/Mainlayout-component/Footer.jsx

import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../../assets/logo.png";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 90 }}
      className="relative w-full bg-gradient-to-br from-[#e8ffe5] via-[#f2fafd] to-[#c4ffe6] rounded-t-3xl pt-12 pb-8 px-2 shadow-2xl border-t border-[#e3f5ed]"
      style={{
        boxShadow: "0 -8px 48px 0 rgba(80,200,180,0.11), 0 -2px 32px 0 rgba(0,0,0,0.05)"
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 px-6">
        {/* About */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} alt="FootMart Logo" className="w-9 h-9 rounded-2xl border-2 border-[#00754A]" />
            <span className="font-extrabold text-2xl text-[#00754A] tracking-tight">FootMart</span>
          </div>
          <div className="text-gray-700 text-base font-semibold mb-5">Empowering admins to manage the ultimate football e-commerce.</div>
          <div className="flex items-center gap-5">
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-2xl text-[#26323c] hover:text-[#00754A] transition"><FaFacebookF /></a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-2xl text-[#26323c] hover:text-[#00754A] transition"><FaTwitter /></a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-2xl text-[#26323c] hover:text-[#00754A] transition"><FaInstagram /></a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-2xl text-[#26323c] hover:text-[#00754A] transition"><FaLinkedin /></a>
          </div>
        </div>
        {/* Quick Links */}
        <div>
          <div className="font-extrabold text-lg text-[#00754A] mb-4">Quick Links</div>
          <ul className="space-y-3 text-[#26323c] font-semibold">
            <li><Link to="/admin/dashboard" className="hover:text-[#00754A]">Dashboard</Link></li>
            <li><Link to="/admin/dashboard/users" className="hover:text-[#00754A]">User Management</Link></li>
            <li><Link to="/admin/dashboard/products" className="hover:text-[#00754A]">Products</Link></li>
            <li><Link to="/admin/dashboard/players" className="hover:text-[#00754A]">Players</Link></li>
            <li><Link to="/admin/dashboard" className="hover:text-[#00754A]">Reviews</Link></li>
          </ul>
        </div>
        {/* Resources */}
        <div>
          <div className="font-extrabold text-lg text-[#00754A] mb-4">Resources</div>
          <ul className="space-y-3 text-[#26323c] font-semibold">
            <li><a href="#" className="hover:text-[#00754A]">Admin Docs</a></li>
            <li><a href="#" className="hover:text-[#00754A]">API Reference</a></li>
            <li><a href="#" className="hover:text-[#00754A]">Roadmap</a></li>
            <li><a href="#" className="hover:text-[#00754A]">System Status</a></li>
            <li><a href="#" className="hover:text-[#00754A]">Community Forum</a></li>
          </ul>
        </div>
        {/* Contact */}
        <div>
          <div className="font-extrabold text-lg text-[#00754A] mb-4">Contact</div>
          <ul className="space-y-3 text-[#26323c] font-semibold">
            <li className="flex items-center gap-2"><FaEnvelope /> footmart10@gmail.com</li>
            <li className="flex items-center gap-2"><FaPhone /> +977 9765346808</li>
            <li className="flex items-center gap-2"><FaMapMarkerAlt /> Sitapaila-5, KTM, Nepal</li>
          </ul>
        </div>
      </div>
      <div className="mt-14 mb-2 text-center text-[#1a3133] text-sm tracking-wide select-none">
        &copy; {new Date().getFullYear()} <span className="font-bold text-[#00754A]">FootMart</span>. Crafted with <span className="text-[#e4002b] font-bold">♥</span> in Kathmandu.<br />
        <span className="text-gray-500">“Futuristic e-commerce, for the beautiful game.”</span>
      </div>
    </motion.footer>
  );
}
