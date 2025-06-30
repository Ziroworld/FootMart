import React from "react";

function Footer() {
  return (
    <footer className="bg-white border-t mt-20 pt-12 pb-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between gap-10 px-4">
        {/* About Us */}
        <div>
          <h3 className="font-bold text-base mb-3">About Us</h3>
          <ul className="text-gray-700 text-sm space-y-1">
            <li className="hover:text-black cursor-pointer">About Footmart</li>
            <li className="hover:text-black cursor-pointer">Why Footmart ?</li>
            <li className="hover:text-black cursor-pointer">History</li>
            <li className="hover:text-black cursor-pointer">FAQ</li>
          </ul>
        </div>
        {/* Contact Us */}
        <div>
          <h3 className="font-bold text-base mb-3">Contact Us</h3>
          <ul className="text-gray-700 text-sm space-y-1">
            <li>footmart10@gmail.com</li>
            <li>+977 9765346808</li>
            <li>4H89 Sitapaila-5, KTM, Nepal</li>
            <li className="mt-2 hover:text-black cursor-pointer">Send a Request</li>
            <li className="hover:text-black cursor-pointer">Ask a Question</li>
            <li className="hover:text-black cursor-pointer">Review</li>
          </ul>
        </div>
        {/* Social Media */}
        <div>
          <h3 className="font-bold text-base mb-3">Social Media</h3>
          <div className="flex gap-3 mb-3">
            <a href="#" aria-label="Facebook">
              <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="facebook" className="w-6 h-6" />
            </a>
            <a href="#" aria-label="Twitter">
              <img src="https://www.svgrepo.com/show/448234/twitter-color.svg" alt="twitter" className="w-6 h-6" />
            </a>
            <a href="#" aria-label="Instagram">
              <img src="https://www.svgrepo.com/show/475656/instagram-color.svg" alt="instagram" className="w-6 h-6" />
            </a>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <a href="#">
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                className="w-28"
              />
            </a>
            <a href="#">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="w-28"
              />
            </a>
          </div>
        </div>
        {/* Map */}
        <div>
          <iframe
            title="FootMart Location"
            width="220"
            height="120"
            className="rounded border"
            style={{ minWidth: 200 }}
            src="https://maps.google.com/maps?q=27.715261,85.272143&hl=en&z=15&output=embed"
            allowFullScreen
          />
        </div>
      </div>
      <div className="mt-10 text-center text-gray-400 text-xs tracking-wide">
        &copy; {new Date().getFullYear()} FootMart. All rights reserved.
      </div>
    </footer>
  );
}
export default Footer;
