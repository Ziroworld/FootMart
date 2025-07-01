
import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../../assets/logo.png";
import Footer from "../../../components/customer/home/Footer.jsx";
import ProfileModal from "./models/ProfileModel.jsx";
import ViewOrderModal from "./models/ViewOrderModel.jsx";
import { useUser } from "../../../hooks/useUser.jsx";
import { useCart } from "../../../hooks/usecarts.jsx";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const { cart } = useCart();
  const [displayName, setDisplayName] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  // Count total items in cart (all quantities summed)
  const cartCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  // Updated logic: derive display name from context/user
  const deriveName = () => {
    if (user && user.name) return user.name.split(" ")[0];
    if (user && user.email) {
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
      <nav
        className="w-full bg-base-100 border-b border-base-300 px-8 py-4 flex items-center justify-center"
        style={{ minHeight: "72px" }}
      >
        <div 
        className="w-full max-w-7xl flex items-center justify-between mx-auto"
        >
          {/* Left: logo + links */}
          <div className="flex items-center gap-8">
            <img
              src={logo}
              alt="FootMart Logo"
              className="h-16 w-16 cursor-pointer"
              onClick={() => navigate("/home")}
            />
            <div className="flex items-center gap-6 ml-2">
              {[
                { label: "Shop", path: "/shop" },
                { label: "Community", path: "/community" },
                { label: "Contact us", path: "/contactus" },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    if (item.path.startsWith("/")) {
                      navigate(item.path);
                    } else {
                      window.location.hash = item.path;
                    }
                  }}
                  className="font-bold text-base md:text-lg hover:underline text-base-content bg-transparent border-none outline-none cursor-pointer"
                  style={{ letterSpacing: ".5px" }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right: icons + auth / user menu */}
          <div className="flex items-center gap-5">
            {/* Wishlist */}
            <button aria-label="Wishlist" onClick={() => navigate("/wishlist")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 stroke-current fill-none"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.48 6.48 0 0116.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>

            {/* Cart with notification badge */}
            <button
              aria-label="Cart"
              onClick={() => navigate("/cart")}
              className="relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 stroke-current fill-none"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {user && cartCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow"
                  style={{ minWidth: "18px", textAlign: "center" }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* If logged in → dropdown; else → Sign-in / Join */}
            {displayName ? (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="flex items-center border-2 border-base-content/70 px-5 py-2 font-semibold rounded-[30px] bg-base-100 hover:bg-base-200 transition text-base-content cursor-pointer"
                >
                  {displayName}
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </label>

                <ul
                  tabIndex={0}
                  className="menu dropdown-content bg-base-100 shadow-lg rounded-box w-48 p-2"
                >
                  <li>
                    <button onClick={() => setShowProfile(true)}>Profile</button>
                  </li>
                  <li>
                    <button onClick={() => setShowOrders(true)}>
                      View orders
                    </button>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex gap-3">
                <button
                  className="border border-gray-400 px-5 py-2 font-semibold rounded-[30px] bg-base-100 hover:bg-base-200 transition text-base-content"
                  style={{ minWidth: "85px" }}
                  onClick={() => navigate("/auth/login")}
                >
                  Sign in
                </button>
                <button
                  className="border border-base-content bg-base-content text-base-100 px-5 py-2 font-semibold rounded-[30px] hover:opacity-80 transition"
                  style={{ minWidth: "95px" }}
                  onClick={() => navigate("/auth/register")}
                >
                  Join now
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Modals */}
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

const MainLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

export default MainLayout;
