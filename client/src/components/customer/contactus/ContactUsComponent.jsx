import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Friendly light green toast
function Toast({ message, onClose }) {
  return (
    <div className="
      fixed z-50
      left-1/2 bottom-6 sm:bottom-8 sm:right-8 sm:left-auto
      -translate-x-1/2 sm:translate-x-0
      bg-green-100 border border-green-300 text-green-900 rounded-2xl px-6 py-3
      flex items-center gap-3 shadow-xl animate-fade-in
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

function ContactUsComponent() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setToast(true);
    setQuery("");
    setTimeout(() => setToast(false), 2800);
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-8 sm:py-10">
      {/* Breadcrumb */}
      <div className="text-xs sm:text-sm text-gray-500 mb-6 flex items-center gap-1">
        <button
          className="text-black font-semibold hover:underline focus:outline-none"
          onClick={() => navigate("/home")}
        >
          Home
        </button>
        <span>&gt;</span>
        <span>Contact us</span>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-10 md:gap-12">
        {/* Left: Info */}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold mb-3">Get in Touch with FootMart</h1>
          <p className="text-base sm:text-lg mb-6 text-gray-700">
            At FootMart, we’re all about helping football fans like you. Whether you have a question about our products, need help with an order, or want to tell us how we can improve our community features, we’re here for you. You can email us at <a href="mailto:support@footmart.com" className="underline text-blue-700">support@footmart.com</a> or use the contact form below. Want to stay updated and join the conversation? Follow us on Twitter, Instagram, and Facebook. Our goal is to mix great shopping with a strong football community, and we’d love to hear from you to make it even better!
          </p>
          <div className="mb-6">
            <span className="font-semibold">Need more ways to reach us?</span>
            <div className="mt-2 text-gray-800">
              Visit us at our store <span className="font-semibold">4H89 Sitapaila -5, KTM, Nepal</span>, or call <a href="tel:+9779765346808" className="font-semibold text-blue-700">+977 9765346808</a> (9 AM to 5 PM, Monday to Saturday).<br />
              Alternatively, email us at <a href="mailto:footmart10@gmail.com" className="font-semibold text-blue-700">footmart10@gmail.com</a> for quick assistance.
            </div>
          </div>

          {/* Form */}
          <div className="mt-8">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Send a Query</h2>
            <form onSubmit={handleSubmit}>
              <textarea
                className="w-full border rounded-md p-3 sm:p-4 text-base min-h-[100px] mb-4 focus:outline-green-500 resize-none"
                placeholder="Have a question about our gear, an order, or our community features? Let us know—we’re here to help!"
                value={query}
                onChange={e => setQuery(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-[#00754A] hover:bg-[#005d38] text-white px-6 py-2 rounded-full font-semibold shadow transition focus:outline-none"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        {/* Right: Map */}
        <div className="w-full md:w-[350px] flex-shrink-0 flex items-start">
          <div className="rounded-xl overflow-hidden border shadow-sm w-full">
            <iframe
              title="FootMart Location"
              src="https://www.google.com/maps?q=Kathmandu,Nepal&output=embed"
              width="100%"
              height="260"
              className="w-full"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* Community Banner */}
      <div className="text-center font-bold text-base sm:text-lg md:text-xl mt-12 mb-8">
        Join the FootMart community today and stay connected with the latest football updates and exclusive offers!
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message="Your query has been sent! We'll get back to you soon."
          onClose={() => setToast(false)}
        />
      )}
    </div>
  );
}

export default ContactUsComponent;
  