import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../../assets/logo.png";
import Footer from "../../../components/customer/home/Footer.jsx";   // ← just import as before!
import ProfileModal from "./models/ProfileModel.jsx";
import ViewOrderModal from "./models/ViewOrderModel.jsx";
import { useUser } from "../../../hooks/useUser.jsx";
import { useCart } from "../../../hooks/usecarts.jsx";
import { useWishlist } from "../../../hooks/useWishlist.jsx";
import { motion } from "framer-motion";

// (If you want to add Toast for the layout, you can put the Toast here!)
// function Toast({ message, onClose }) { ... }

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const { cart } = useCart();
  const { items: wishlistItems } = useWishlist();
  const [displayName, setDisplayName] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  // Count total items in cart
  const cartCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  // Derive display name logic
  const deriveName = () => {
    if (user?.name) return user.name.split(" ")[0];
    if (user?.email) {
      const firstChunk = user.email.split("@")[0].split(/[._-]/)[0];
      return firstChunk.charAt(0).toUpperCase() + firstChunk.slice(1);
    }
    const rawName = localStorage.getItem("userName");
    if (rawName) return rawName.split(" ")[0];
    const email = localStorage.getItem("userEmail");
    if (!email) return null;
    const firstChunk = email.split("@")[0].split(/[._-]/)[0];
    return firstChunk.charAt(0).toUpperCase() + firstChunk.slice(1);
  };

  useEffect(() => {
    setDisplayName(deriveName());
  }, [user]);

  const handleLogout = () => {
    logout();
    setDisplayName(null);
    navigate("/home");
  };

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 40 }}
        className="
          w-full sticky top-0 z-40 bg-white/70
          backdrop-blur-[8px]
          shadow-2xl
          px-2 sm:px-8 py-2 flex items-center justify-center
        "
        style={{ minHeight: "84px" }}
      >
        <div className="w-full max-w-7xl flex items-center justify-between mx-auto">
          {/* Logo + Nav Links */}
          <div className="flex items-center gap-2 sm:gap-5 md:gap-8">
            <motion.img
              src={logo}
              alt="FootMart Logo"
              className="h-14 w-14 sm:h-[60px] sm:w-[60px] rounded-full shadow-md cursor-pointer"
              onClick={() => navigate("/home")}
              whileHover={{ scale: 1.07, rotate: 2 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
            <div className="hidden sm:flex items-center gap-3 md:gap-8">
              {[
                { label: "Shop", path: "/shop" },
                { label: "Community", path: "/community" },
                { label: "Contact us", path: "/contactus" },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className="
                    font-bold text-md
                    relative group bg-transparent border-none outline-none cursor-pointer
                  "
                  style={{ color: "#00754A", letterSpacing: ".5px" }}
                >
                  <span>{item.label}</span>
                  {/* Animated underline */}
                  <span className="
                    absolute left-0 -bottom-1 w-0 h-1 rounded-full bg-[#00754A]
                    transition-all group-hover:w-full
                  " style={{ transitionDuration: "300ms" }} />
                </button>
              ))}
            </div>
          </div>
          {/* Wishlist, Cart, User */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-5">
            {/* Wishlist */}
            <button
              aria-label="Wishlist"
              onClick={() => navigate("/wishlist")}
              className="relative p-2 hover:scale-105 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 sm:h-7 sm:w-7 stroke-[#00754A] fill-none"
                viewBox="0 0 24 24"
                strokeWidth="2.3"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.48 6.48 0 0116.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#00f19a] text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-glow animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>
            {/* Cart */}
            <button
              aria-label="Cart"
              onClick={() => navigate("/cart")}
              className="relative p-2 hover:scale-105 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 sm:h-7 sm:w-7 stroke-[#00754A] fill-none"
                viewBox="0 0 24 24"
                strokeWidth="2.3"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {cartCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 bg-[#00754A] text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-glow animate-pulse"
                  style={{ minWidth: "18px", textAlign: "center" }}
                >
                  {cartCount}
                </span>
              )}
            </button>
            {/* Auth/Profile */}
            {displayName ? (
              <div className="dropdown dropdown-end">
                <motion.label
                  tabIndex={0}
                  className="flex items-center border-2 border-[#00754A]/80 px-5 py-2 font-semibold rounded-[30px] bg-white/80 hover:bg-[#eafff6] transition underline cursor-pointer text-[#00754A] shadow-lg"
                  whileTap={{ scale: 0.97 }}
                >
                  {displayName}
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="#00754A"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.label>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content bg-white/90 shadow-2xl rounded-box w-52 p-3 border border-[#00754A]/10"
                  style={{ marginTop: "7px" }}
                >
                  <li>
                    <button onClick={() => setShowProfile(true)}>Profile</button>
                  </li>
                  <li>
                    <button onClick={() => setShowOrders(true)}>View orders</button>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={() => navigate("/auth/login")}
                  className="border border-[#00754A] px-4 py-2 font-semibold rounded-[30px] bg-white/80 hover:bg-[#eafff6] transition underline text-[#00754A] shadow"
                  style={{ minWidth: "85px" }}
                >
                  Sign in
                </button>
                <button
                  onClick={() => navigate("/auth/register")}
                  className="border border-[#00754A] bg-[#00754A] text-white px-4 py-2 font-semibold rounded-[30px] hover:opacity-90 transition underline shadow"
                  style={{ minWidth: "95px" }}
                >
                  Join now
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Profile/Orders Modal */}
      <ProfileModal
        open={showProfile}
        onClose={() => setShowProfile(false)}
        name={displayName}
        email={user?.email || localStorage.getItem("userEmail")}
      />
      <ViewOrderModal open={showOrders} onClose={() => setShowOrders(false)} />
    </>
  );
}

// ---- Main Layout ----
export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer /> {/* ← uses your previously imported footer, nothing replaced */}
    </>
  );
}
