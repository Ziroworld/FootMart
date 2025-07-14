import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { AuthApi } from "../../../server/AuthApi.jsx";
import { UserContext } from "../../../context/userContext.jsx";

// Toast Notification Component
function Toast({ message, show, onClose }) {
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [show, onClose]);

  return (
    <div
      className={`fixed top-5 left-1/2 z-[9999] transform -translate-x-1/2 transition-all duration-300 ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ minWidth: 260, maxWidth: "90vw" }}
      role="alert"
      aria-live="polite"
    >
      <div className="bg-green-100 border border-green-300 text-green-900 rounded-2xl px-6 py-3 flex items-center shadow-xl gap-2">
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
      </div>
    </div>
  );
}

// Animated Info Box (for forgot username/password)
function InfoBox({ message, onClose }) {
  return (
    <div className="absolute left-0 right-0 -top-[70px] z-10 flex justify-center">
      <div className="bg-[#FCF8F3] border border-yellow-300 rounded-xl p-4 shadow-lg flex items-start gap-3 min-w-[220px] max-w-[350px] relative">
        <span className="text-xl mt-0.5">✨</span>
        <div className="flex-1">
          <div className="text-gray-900 font-medium text-[15px] leading-snug">{message}</div>
        </div>
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-900"
          aria-label="Close"
        >
          <svg width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function LoginPageComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotUsername, setShowForgotUsername] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ show: false, message: "" });

  const usernameBtnRef = useRef(null);
  const passwordBtnRef = useRef(null);

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const isEmailValid = email.trim().length > 0;
  const isPasswordValid = password.trim().length > 0;

  // Helper to show toast
  function notify(msg) {
    setToast({ show: false, message: "" });
    setTimeout(() => setToast({ show: true, message: msg }), 50);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!isEmailValid || !isPasswordValid || loading) return;

    setLoading(true);
    setError("");

    const res = await AuthApi.login({ email, password });
    setLoading(false);

    if (res.success) {
      const {
        token,
        role,
        user: { id, name, email: userEmail },
      } = res;

      localStorage.setItem("authToken", token);
      localStorage.setItem("userId", id);
      localStorage.setItem("userRole", role);
      localStorage.setItem("userName", name || "");
      localStorage.setItem("userEmail", userEmail || "");

      setUser({ id, role, name, email: userEmail });

      notify("Login successful! Welcome back 👋");

      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/home");
        }
      }, 1200);
    } else {
      setError(res.error || "Login failed");
      notify(res.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Toast Notification */}
      <Toast
        message={toast.message}
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
      />

      <div className="w-full border-b border-gray-300 shadow-sm"></div>
      <div className="h-[7px]"></div>
      <div className="flex items-center gap-2 px-4 md:px-10 pt-4 pb-2">
        <img
          src={logo}
          alt="FootMart Logo"
          className="h-12 w-12 md:h-14 md:w-14 cursor-pointer"
          onClick={() => navigate("/home")}
        />
      </div>
      <div className="h-[10px]"></div>
      <div className="w-full border-t border-gray-300 shadow-sm"></div>
      <div className="flex flex-col items-center flex-1 w-full py-8 md:py-10">
        <div className="flex flex-col items-center mt-1 mb-7 md:mb-8">
          <h2 className="text-[23px] sm:text-[26px] md:text-[30px] font-bold mb-7 md:mb-10 text-center">
            Sign in or create an account
          </h2>
          <div className="text-[15px] md:text-mm font-bold mb-2 md:mb-3 text-center text-gray-600">
            FOOT MART
          </div>
          <div className="text-[14px] md:text-base font-semibold text-gray-600 text-center max-w-lg mb-3 md:mb-4 leading-relaxed">
            Kick Off Your Journey – Join FootMart Today for the <br className="hidden sm:block" />
            Ultimate Football Experience!
          </div>
        </div>
        {/* Responsive card */}
        <div
          className="w-full bg-white rounded-2xl border border-gray-200 shadow-lg relative 
          px-4 py-7 sm:px-10 sm:py-10 md:px-16 md:py-14 lg:px-24 lg:py-14 
          max-w-full sm:max-w-lg md:max-w-xl mb-8 md:mb-10 transition-all duration-300"
        >
          <form onSubmit={handleSubmit}>
            <p className="mb-5 md:mb-7 font-semibold text-[#006241] text-[13px] md:text-[15px]">
              * indicates required field
            </p>
            <div className="mb-5 md:mb-7">
              <input
                type="text"
                placeholder="* Username or email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onBlur={() => setTouched(t => ({ ...t, email: true }))}
                className={`w-full h-11 md:h-12 rounded-md border px-3 md:px-4 placeholder-gray-400 text-[16px] md:text-[18px] font-semibold transition ${
                  touched.email && !isEmailValid ? "border-2 border-red-500" : "border-gray-300"
                }`}
              />
              {touched.email && !isEmailValid && (
                <div className="text-[13px] md:text-[15px] font-semibold text-red-600 mt-2 ml-1">
                  Enter email or username
                </div>
              )}
            </div>
            <div className="mb-4 md:mb-5 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="* Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onBlur={() => setTouched(t => ({ ...t, password: true }))}
                className={`w-full h-11 md:h-12 rounded-md border px-3 md:px-4 pr-12 text-[16px] md:text-[18px] font-semibold transition ${
                  touched.password && !isPasswordValid ? "border-2 border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M17.94 17.94A10.92 10.92 0 0112 19C5 19 1 12 1 12a21.31 21.31 0 014.18-5.94M22.54 6.88A11 11 0 0123 12s-4 7-11 7a10.95 10.95 0 01-4.12-.82M9.88 9.88A3 3 0 1114.12 14.12M1 1l22 22" />
                  </svg>
                )}
              </button>
              {touched.password && !isPasswordValid && (
                <div className="text-[13px] md:text-[15px] font-semibold text-red-600 mt-2 ml-1">
                  Enter password
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1 mb-4 md:mb-5">
              <input type="checkbox" checked readOnly className="w-4 h-4 md:w-5 md:h-5 accent-[#006241] rounded" />
              <span className="text-[15px] md:text-[16px] font-medium">
                Keep me signed in{" "}
                <a href="#" className="text-[#006241] font-semibold underline hover:text-[#004d33] ml-1">
                  Details
                </a>
              </span>
            </div>
            {/* Buttons with popups directly above */}
            <div className="mb-5 md:mb-7 flex flex-col gap-2 relative">
              <div className="relative w-fit self-start">
                {showForgotUsername && (
                  <InfoBox
                    message="You can now use your email instead of a username."
                    onClose={() => setShowForgotUsername(false)}
                  />
                )}
                <button
                  ref={usernameBtnRef}
                  type="button"
                  onClick={() => setShowForgotUsername(true)}
                  className="text-[#006241] font-bold text-[14px] md:text-[15px] hover:underline text-left"
                >
                  Forgot your username?
                </button>
              </div>
              <div className="relative w-fit self-start mt-2">
                {showForgotPassword && (
                  <InfoBox
                    message="Working on this feature soon."
                    onClose={() => setShowForgotPassword(false)}
                  />
                )}
                <button
                  ref={passwordBtnRef}
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-[#006241] font-bold text-[14px] md:text-[15px] hover:underline text-left"
                >
                  Forgot your password?
                </button>
              </div>
            </div>
            {error && <div className="text-red-600 font-semibold mb-3 md:mb-4 text-center">{error}</div>}
            <div className="flex justify-end mt-5 md:mt-7">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#00754A] hover:bg-[#006241] text-white px-6 py-2 md:px-8 md:py-3 rounded-full shadow-md font-semibold text-[17px] md:text-[18px] transition"
                style={{ minWidth: 120, maxWidth: 200 }}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
        <div className="w-full max-w-full sm:max-w-lg md:max-w-xl flex flex-col items-center justify-center py-4 md:py-6 mb-8 md:mb-10">
          <div
            className="text-green-700 text-xs md:text-sm font-bold tracking-wide mb-2 text-center uppercase"
            style={{ letterSpacing: ".1em" }}
          >
            Join FootMart Now
          </div>
          <div className="text-gray-700 text-xs md:text-sm text-center mb-3 md:mb-5">
            As a member, dive into exclusive football perks, unlock the best merchandise deals, and celebrate your birthday with a special treat from FootMart. Best of all, it’s free to join us now!
          </div>
          <button
            className="border border-green-700 text-green-700 font-semibold rounded-full px-6 py-2 md:px-7 md:py-2 bg-white hover:bg-green-50 transition"
            onClick={() => navigate("/auth/register")}
          >
            Join now
          </button>
        </div>
      </div>
    </div>
  );
}
