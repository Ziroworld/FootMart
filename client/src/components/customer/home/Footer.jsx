import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'

// Friendly Toast Notification
function Toast({ message, onClose }) {
  return (
    <div className="
      fixed z-50
      left-1/2 bottom-6 sm:bottom-8 sm:right-8 sm:left-auto
      -translate-x-1/2 sm:translate-x-0
      bg-green-100 border border-green-300 text-green-900 rounded-2xl px-6 py-3
      flex items-center gap-3 shadow-xl
    ">
      <svg width="22" height="22" viewBox="0 0 24 24" className="text-green-600">
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
      <span className="font-semibold text-[16px]">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-lg font-bold text-green-900 hover:text-green-700 px-2"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
}

export default function Footer() {
  const [toast, setToast] = useState(false);

  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 2700);
  };

  return (
    <footer className="bg-white border-t border-gray-400 mt-20 pt-16 pb-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row flex-wrap justify-between gap-12 md:gap-8 px-4">
        {/* About Us */}
        <div className="min-w-[200px] flex-1 mb-8 md:mb-0">
          <h3 className="font-semibold text-xl mb-6">
            <Link to="/aboutus" className="hover:text-gray-900">
              About Us
            </Link>
          </h3>
          <ul className="text-gray-700 text-lg space-y-4">
            <li>
              <Link to="/aboutus" className="hover:text-gray-900">
                About FootMart
              </Link>
            </li>
            <li>
              <Link to="/aboutus#why" className="hover:text-gray-900">
                Why FootMart?
              </Link>
            </li>
            <li>
              <Link to="/aboutus#history" className="hover:text-gray-900">
                History
              </Link>
            </li>
            <li>
              <Link to="/aboutus#faq" className="hover:text-gray-900">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="min-w-[200px] flex-1 mb-8 md:mb-0">
          <h3 className="font-semibold text-xl mb-6">
            <Link to="/contactus" className="hover:text-gray-900">
              Contact Us
            </Link>
          </h3>
          <ul className="text-gray-700 text-lg space-y-4">
            <li>footmart10@gmail.com</li>
            <li>+977 9765346808</li>
            <li>4H89 Sitapaila-5, KTM, Nepal</li>
            <li>
              <Link to="/contactus" className="hover:text-gray-900">
                Send a Request
              </Link>
            </li>
            <li>
              <Link to="/contactus" className="hover:text-gray-900">
                Ask a Question
              </Link>
            </li>
            <li>
              <Link to="/contactus" className="hover:text-gray-900">
                Review
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media & App Badges */}
        <div className="min-w-[200px] flex-1 mb-8 md:mb-0">
          <h3 className="font-semibold text-xl mb-6">Social Media</h3>
          <div className="flex items-center space-x-6 mb-6 text-gray-600 text-2xl">
            <a href="#" aria-label="Facebook" className="hover:text-gray-800">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-gray-800">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-gray-800">
              <FaInstagram />
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={showToast}
              className="inline-block border border-gray-400 rounded overflow-hidden focus:outline-none"
              aria-label="Play Store App Coming Soon"
            >
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on the App Store"
                className="block h-10"
                draggable={false}
              />
            </button>
            <button
              type="button"
              onClick={showToast}
              className="inline-block border border-gray-400 rounded overflow-hidden focus:outline-none"
              aria-label="App Store App Coming Soon"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                className="block h-10"
                draggable={false}
              />
            </button>
          </div>
        </div>

        {/* Map */}
        <div className="min-w-[220px] flex-1">
          <h3 className="font-semibold text-xl mb-6">Our Location</h3>
          <iframe
            title="FootMart Location"
            src="https://maps.google.com/maps?q=27.715261,85.272143&hl=en&z=15&output=embed"
            className="w-full h-60 rounded-lg border border-gray-400"
            allowFullScreen
          />
        </div>
      </div>

      <div className="mt-12 text-center text-gray-500 text-sm tracking-wide">
        &copy; {new Date().getFullYear()} FootMart. All rights reserved.
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message="Thank you for your query! We will have an app soon in future 😊"
          onClose={() => setToast(false)}
        />
      )}
    </footer>
  )
}
