import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

function Toast({ message, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 60 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 60 }}
        transition={{ duration: 0.36, ease: "easeOut" }}
        className="fixed z-[999] left-1/2 bottom-7 sm:bottom-10 -translate-x-1/2 sm:right-8 sm:left-auto sm:translate-x-0
        bg-[#e6f8f1] border-2 border-[#00754A] text-[#00754A] rounded-3xl px-8 py-4
        flex items-center gap-4 shadow-2xl"
        style={{ backdropFilter: "blur(8px)" }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" className="text-[#00754A]">
          <circle cx="12" cy="12" r="11" fill="#e0f6e9" />
          <path d="M8.5 12.7l2.3 2.3 4.3-4.3"
            stroke="#00754A" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
        <span className="font-bold text-lg">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-xl font-black text-[#00754A] hover:text-[#005d38] px-2"
          aria-label="Close notification"
        >✕</button>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ContactUsComponent() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setToast(true);
    setQuery("");
    setTimeout(() => setToast(false), 2500);
  };

  return (
    <motion.div
      className="min-h-[80vh] flex flex-col items-center justify-center px-2 sm:px-4 py-12 bg-gradient-to-br from-[#f8fff7] to-[#ecfdfa]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, type: "spring", bounce: 0.13 }}
    >
      {/* Breadcrumb */}
      <motion.div
        className="text-xs sm:text-sm text-[#00754A] mb-9 w-full max-w-4xl flex items-center gap-2"
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.12, duration: 0.6 }}
      >
        <button
          className="font-bold hover:underline"
          onClick={() => navigate("/home")}
        >
          Home
        </button>
        <span className="opacity-50">&gt;</span>
        <span className="font-semibold">Contact Us</span>
      </motion.div>

      {/* Card */}
      <motion.div
        className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 rounded-3xl shadow-[0_8px_48px_0_rgba(0,117,74,0.10)] bg-white/90 overflow-hidden border-2 border-[#e3f5ed] backdrop-blur-[3px]"
        initial={{ opacity: 0.88, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.18, duration: 0.8 }}
      >
        {/* LEFT: Info + Form */}
        <div className="flex flex-col justify-center px-6 sm:px-10 py-10 sm:py-14 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 text-black tracking-tight flex items-center gap-2">
              Let’s Connect <span className="inline-block animate-bounce text-[#00754A]">⚽</span>
            </h1>
            <p className="text-black/90 text-lg mb-7 font-medium leading-relaxed">
              Questions, feedback, or collab ideas? <span className="font-bold text-[#00754A]">We’re all ears.</span><br />
              Fill out the form, or drop by—our doors are open for every football lover!
            </p>

            {/* Socials */}
            <div className="flex gap-5 mb-7">
              <a href="#" aria-label="Instagram" className="group">
                <FaInstagram className="text-[#00754A] text-2xl group-hover:scale-110 transition" />
              </a>
              <a href="#" aria-label="Facebook" className="group">
                <FaFacebookF className="text-[#00754A] text-2xl group-hover:scale-110 transition" />
              </a>
              <a href="#" aria-label="Twitter" className="group">
                <FaTwitter className="text-[#00754A] text-2xl group-hover:scale-110 transition" />
              </a>
            </div>

            {/* Quick Info */}
            <div className="mb-5 text-black text-sm font-semibold space-y-2">
              <div>
                <span className="mr-2">📧</span>
                <a href="mailto:footmart10@gmail.com" className="underline text-[#00754A] hover:text-black">
                  footmart10@gmail.com
                </a>
              </div>
              <div>
                <span className="mr-2">📞</span>
                <a href="tel:+9779765346808" className="underline text-[#00754A] hover:text-black">
                  +977 9765346808
                </a>
              </div>
              <div>
                <span className="mr-2">📍</span>
                4H89 Sitapaila-5, KTM, Nepal
              </div>
            </div>

            {/* Form */}aa
            <motion.form
              onSubmit={handleSubmit}
              className="mt-6 flex flex-col gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
            >
              <textarea
                className="w-full border-2 border-[#e3f5ed] rounded-2xl p-4 text-base text-black font-medium bg-white/80 min-h-[90px] focus:outline-[#00754A] resize-none transition shadow-lg"
                placeholder="Share your thoughts…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                required
                maxLength={600}
              />
              <button
                type="submit"
                className="bg-[#00754A] hover:bg-[#005d38] text-white font-bold px-8 py-2.5 rounded-full shadow-xl transition active:scale-95 text-lg"
              >
                Send Message
              </button>
            </motion.form>
          </motion.div>
        </div>

        {/* RIGHT: Map/Visual */}
        <motion.div
          className="hidden md:flex items-center justify-center bg-gradient-to-tr from-[#e6f8f1]/50 to-[#f7fcfa]/80"
          initial={{ opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.8 }}
        >
          <motion.div
            className="p-7 flex flex-col items-center gap-4 w-full"
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <iframe
              title="FootMart Location"
              src="https://www.google.com/maps?q=Kathmandu,Nepal&output=embed"
              width="290"
              height="260"
              className="rounded-2xl border-2 border-[#e3f5ed] shadow-lg"
              style={{ background: "white" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="font-bold text-center text-black/80 text-sm mt-2">
              <span className="text-[#00754A] font-extrabold">Visit Us:</span> FootMart HQ, Kathmandu
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Banner */}
      <motion.div
        className="mt-12 text-center font-extrabold text-xl sm:text-2xl md:text-3xl text-black tracking-tight"
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <span className="text-[#00754A]">Join the Family.</span>  
        <span className="mx-2">⚽</span>  
        <span>Let’s make football bigger, together!</span>
      </motion.div>

      {/* Toast */}
        <AnimatePresence>
        {toast && (
          <Toast
            message="Message sent! We'll reply soon."
            onClose={() => setToast(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
