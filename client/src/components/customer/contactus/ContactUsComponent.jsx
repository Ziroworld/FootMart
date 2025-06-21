import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// For toast notification
function Toast({ message, onClose }) {
  return (
    <div className="fixed bottom-8 right-8 z-50 bg-black text-white px-6 py-3 rounded shadow-lg flex items-center gap-2 animate-fade-in">
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 text-white font-bold">✕</button>
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
    setTimeout(() => setToast(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6 flex items-center gap-1">
        <button
          className="text-black font-semibold hover:underline"
          onClick={() => navigate("/home")}
        >
          Home
        </button>
        <span>&gt;</span>
        <span>Contact us</span>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Info */}
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Get in Touch with FootMart</h1>
          <p className="text-base md:text-lg mb-6 text-gray-700">
            At FootMart, we’re all about helping football fans like you. Whether you have a question about our products, need help with an order, or want to tell us how we can improve our community features, we’re here for you. You can email us at <a href="mailto:support@footmart.com" className="underline text-blue-600">support@footmart.com</a> or use the contact form below. Want to stay updated and join the conversation? Follow us on Twitter, Instagram, and Facebook. Our goal is to mix great shopping with a strong football community, and we’d love to hear from you to make it even better!
          </p>
          <div className="mb-6">
            <span className="font-semibold">Need more ways to reach us?</span>
            <div className="mt-2 text-gray-800">
              Visit us at our store <span className="font-semibold">4H89 Sitapaila -5, KTM, Nepal</span>, or call <a href="tel:+9779765346808" className="font-semibold text-blue-600">+977 9765346808</a> (9 AM to 5 PM, Monday to Saturday).<br />
              Alternatively, email us at <a href="mailto:footmart10@gmail.com" className="font-semibold text-blue-600">footmart10@gmail.com</a> for quick assistance.
            </div>
          </div>

          {/* Form */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Send a Query</h2>
            <form onSubmit={handleSubmit}>
              <textarea
                className="w-full border rounded p-4 text-base min-h-[100px] mb-4"
                placeholder="Have a question about our gear, an order, or our community features? Let us know—we’re here to help!"
                value={query}
                onChange={e => setQuery(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded hover:bg-white hover:text-black border border-black transition font-semibold"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        {/* Right: Map */}
        <div className="w-full md:w-[320px] flex-shrink-0">
          <div className="rounded-lg overflow-hidden border shadow-sm">
            <iframe
              title="FootMart Location"
              src="https://www.google.com/maps?q=Kathmandu,Nepal&output=embed"
              width="100%"
              height="260"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* Community Banner */}
      <div className="text-center font-bold text-lg md:text-xl mt-12 mb-8">
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
