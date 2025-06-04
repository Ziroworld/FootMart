import React from "react";

function Footer() {
  return (
    <footer className="bg-white py-12 border-t mt-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 justify-between px-4">
        <div>
          <h3 className="font-bold text-lg mb-2">About Us</h3>
          <ul className="text-gray-600 text-sm space-y-1">
            <li>About Footmart</li>
            <li>Why Footmart?</li>
            <li>History</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">Contact Us</h3>
          <ul className="text-gray-600 text-sm space-y-1">
            <li>footmart10@gmail.com</li>
            <li>+977 9765346808</li>
            <li>4H89 Sitapaila-5, KTM, Nepal</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">Social Media</h3>
          <div className="flex gap-4 mb-2">
            <a href="#"><img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-6 h-6" alt="facebook" /></a>
            <a href="#"><img src="https://www.svgrepo.com/show/448234/twitter-color.svg" className="w-6 h-6" alt="twitter" /></a>
            <a href="#"><img src="https://www.svgrepo.com/show/475656/instagram-color.svg" className="w-6 h-6" alt="instagram" /></a>
          </div>
          <div className="flex gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="w-24" />
            <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="w-24" />
          </div>
        </div>
        <div>
          <iframe
            title="FootMart Location"
            width="250"
            height="120"
            className="rounded"
            src={`https://maps.google.com/maps?q=27.715261,85.272143&hl=en&z=15&output=embed`}
            allowFullScreen
          />
        </div>
      </div>
      <div className="mt-8 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} FootMart. All rights reserved.
      </div>
    </footer>
  );
}
export default Footer;
