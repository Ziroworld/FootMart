// client/src/components/customer/home/Footer.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Modern Toast
function Toast({ message, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 28, scale: 0.96 }}
        transition={{ duration: 0.33 }}
        className="
          fixed z-50 left-1/2 bottom-8 sm:bottom-10 sm:right-10 sm:left-auto
          -translate-x-1/2 sm:translate-x-0
          bg-green-100 border border-green-300 text-green-900 rounded-2xl px-8 py-5
          flex items-center gap-4 shadow-2xl drop-shadow-xl
          backdrop-blur-xl
        "
      >
        <svg width="28" height="28" viewBox="0 0 24 24" className="text-green-600">
          <circle cx="12" cy="12" r="10" fill="#D3FAD6" />
          <path
            d="M8.5 12.7l2.3 2.3 4.3-4.3"
            stroke="#30B95D"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        <span className="font-extrabold text-xl drop-shadow">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-xl font-bold text-green-900 hover:text-green-700 px-3"
          aria-label="Close notification"
        >
          ✕
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Footer() {
  const [toast, setToast] = useState(false);

  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 2700);
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, type: "spring", stiffness: 70 }}
      className={`
        relative w-full
        bg-white
        rounded-t-3xl
        pb-10 pt-16
        shadow-2xl
        z-20
        overflow-hidden
      `}
      style={{
        boxShadow: "0 -8px 48px 0 rgba(80,200,180,0.09), 0 -2px 32px 0 rgba(0,0,0,0.05)"
      }}
    >
      {/* Drop shadow border effect at top */}
      <div
        className="absolute top-0 left-0 w-full h-8 pointer-events-none z-30"
        style={{
          background: "linear-gradient(to bottom,rgba(0,117,74,0.10),transparent)"
        }}
      />
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row flex-wrap justify-between gap-14 md:gap-8 px-4">
        {/* About Us */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.06, duration: 0.5, type: "spring", stiffness: 120 }}
          className="min-w-[210px] flex-1 mb-8 md:mb-0"
        >
          <h3 className="font-bold text-xl mb-6 text-black">About Us</h3>
          <ul className="text-gray-700 text-lg space-y-4 font-medium">
            <li>
              <Link to="/aboutus" className="hover:text-[#00754A] transition">About FootMart</Link>
            </li>
            <li>
              <Link to="/aboutus" className="hover:text-[#00754A] transition">Why FootMart?</Link>
            </li>
            <li>
              <Link to="/aboutus" className="hover:text-[#00754A] transition">History</Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-[#00754A] transition">FAQ</Link>
            </li>
          </ul>
        </motion.div>
        {/* Contact Us */}
        <motion.div
          initial={{ opacity: 0, x: -22 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.13, duration: 0.5, type: "spring", stiffness: 110 }}
          className="min-w-[210px] flex-1 mb-8 md:mb-0"
        >
          <h3 className="font-bold text-xl mb-6 text-black">Contact Us</h3>
          <ul className="text-gray-700 text-lg space-y-4 font-medium">
            <li>footmart10@gmail.com</li>
            <li>+977 9765346808</li>
            <li>4H89 Sitapaila-5, KTM, Nepal</li>
            <li>
              <Link to="/contactus" className="hover:text-[#00754A] transition">Send a Request</Link>
            </li>
            <li>
              <Link to="/contactus" className="hover:text-[#00754A] transition">Ask a Question</Link>
            </li>
            <li>
              <Link to="/contactus" className="hover:text-[#00754A] transition">Review</Link>
            </li>
          </ul>
        </motion.div>
        {/* Social Media & App Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.5, type: "spring", stiffness: 110 }}
          className="min-w-[210px] flex-1 mb-8 md:mb-0"
        >
          <h3 className="font-bold text-xl mb-6 text-black">Social Media</h3>
          <div className="flex items-center space-x-7 mb-7 text-gray-500 text-2xl">
            {[{
              icon: <FaFacebookF />,
              href: "#",
              label: "Facebook",
              delay: 0.21,
            }, {
              icon: <FaTwitter />,
              href: "#",
              label: "Twitter",
              delay: 0.24,
            }, {
              icon: <FaInstagram />,
              href: "#",
              label: "Instagram",
              delay: 0.27,
            }].map(({ icon, href, label, delay }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                whileHover={{ scale: 1.18, color: "#00754A" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 220, damping: 15, delay }}
                className="hover:text-[#00754A] transition-all duration-200"
              >
                {icon}
              </motion.a>
            ))}
          </div>
          <div className="flex items-center space-x-4 mt-2">
            <motion.button
              type="button"
              onClick={showToast}
              whileHover={{ scale: 1.07, boxShadow: "0 2px 14px #0001" }}
              whileTap={{ scale: 0.97 }}
              className="inline-block rounded-lg overflow-hidden border border-gray-400 shadow bg-white focus:outline-none transition-all"
              aria-label="Play Store App Coming Soon"
            >
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on the App Store"
                className="block h-10"
                draggable={false}
              />
            </motion.button>
            <motion.button
              type="button"
              onClick={showToast}
              whileHover={{ scale: 1.07, boxShadow: "0 2px 14px #0001" }}
              whileTap={{ scale: 0.97 }}
              className="inline-block rounded-lg overflow-hidden border border-gray-400 shadow bg-white focus:outline-none transition-all"
              aria-label="App Store App Coming Soon"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                className="block h-10"
                draggable={false}
              />
            </motion.button>
          </div>
        </motion.div>
        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.6, type: "spring", stiffness: 120 }}
          className="min-w-[220px] flex-1"
        >
          <h3 className="font-bold text-xl mb-6 text-black">Our Location</h3>
          <div className="rounded-2xl shadow-lg overflow-hidden border border-gray-300 bg-white/80">
            <iframe
              title="FootMart Location"
              src="https://maps.google.com/maps?q=27.715261,85.272143&hl=en&z=15&output=embed"
              className="w-full h-60"
              style={{ border: "none", minHeight: 190, borderRadius: 18 }}
              allowFullScreen
            />
          </div>
        </motion.div>
      </div>
      <div className="mt-14 text-center text-gray-500 text-sm tracking-wide select-none">
        &copy; {new Date().getFullYear()} <span className="font-bold text-[#00754A]">FootMart</span>. All rights reserved.
      </div>
      {/* Toast Notification */}
      {toast && (
        <Toast
          message="Thank you for your query! We will have an app soon in future 😊"
          onClose={() => setToast(false)}
        />
      )}
    </motion.footer>
  );
}
