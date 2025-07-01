// client/src/components/customer/layout/Footer.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-400 mt-20 pt-16 pb-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8 px-4">
        {/* About Us */}
        <div>
          <h3 className="font-semibold text-xl mb-6">About Us</h3>
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
        <div>
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
        <div>
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
            <a
              href="#"
              className="inline-block border border-gray-400 rounded overflow-hidden"
            >
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on the App Store"
                className="block h-10"
              />
            </a>
            <a
              href="#"
              className="inline-block border border-gray-400 rounded overflow-hidden"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                className="block h-10"
              />
            </a>
          </div>
        </div>

        {/* Map */}
        <div>
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
    </footer>
  )
}
