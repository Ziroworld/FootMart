// client/src/components/customer/faq/ProfileModal.jsx

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";

export default function ProfileModal({ open, onClose, name, email }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            {/* Avatar + Welcome */}
            <div className="flex flex-col items-center">
              <FaUserCircle className="text-gray-300 text-9xl" />
              <h2 className="mt-4 text-3xl font-bold text-gray-900">
                Welcome, {name || "Guest"}!
              </h2>
            </div>

            {/* Profile Info */}
            <div className="mt-8 space-y-4">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 uppercase">Name</span>
                <span className="text-lg font-medium text-gray-800">{name || "—"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 uppercase">Email</span>
                <span className="text-lg font-medium text-gray-800">{email || "—"}</span>
              </div>
              {/* Add more fields here as needed */}
            </div>

            {/* Action Buttons (optional) */}
            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#00754A] text-white rounded-full font-semibold hover:bg-opacity-90 transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
