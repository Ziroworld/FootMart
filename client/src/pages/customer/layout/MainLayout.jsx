import { Outlet, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="w-full bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-center" style={{minHeight: "72px"}}>
      <div className="w-full max-w-7xl flex items-center justify-between mx-auto">
        {/* Logo + links */}
        <div className="flex items-center gap-8">
          <img
            src={logo}
            alt="FootMart Logo"
            className="h-16 w-16 cursor-pointer"
            onClick={() => navigate("/home")}
          />
          <div className="flex items-center gap-6 ml-2">
            <a
              href="#shop"
              className="font-bold text-base md:text-lg hover:underline"
              style={{ letterSpacing: ".5px" }}
            >
              Shop
            </a>
            <a
              href="#community"
              className="font-bold text-base md:text-lg hover:underline"
              style={{ letterSpacing: ".5px" }}
            >
              Community
            </a>
            <a
              href="#contact"
              className="font-bold text-base md:text-lg hover:underline"
              style={{ letterSpacing: ".5px" }}
            >
              Contact us
            </a>
          </div>
        </div>
        {/* Auth buttons */}
        <div className="flex gap-3">
          <button
            className="border border-gray-400 px-5 py-2 font-semibold rounded-[30px] bg-white hover:bg-gray-100 transition"
            style={{ minWidth: "85px" }}
            onClick={() => navigate("/auth/login")}
          >
            Sign in
          </button>
          <button
            className="border border-black bg-black text-white px-5 py-2 font-semibold rounded-[30px] hover:bg-gray-800 transition"
            style={{ minWidth: "95px" }}
            onClick={() => navigate("/auth/register")}
          >
            Join now
          </button>
        </div>
      </div>
    </nav>
  );
};

const MainLayout = () => (
  <>
    <Navbar />
    <Outlet />
    {/* Footer is now handled by the homepage/component */}
  </>
);

export default MainLayout;
