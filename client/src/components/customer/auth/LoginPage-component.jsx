import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { AuthApi } from "../../../server/AuthApi.jsx";

function LoginPageComponent() {
  /* ---------- UI state ---------- */
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotUsername, setShowForgotUsername] = useState(false);
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched]   = useState({ email: false, password: false });
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const navigate = useNavigate();

  /* ---------- Validation ---------- */
  const isEmailValid    = email.trim().length > 0;
  const isPasswordValid = password.trim().length > 0;

  /* ---------- Submit handler ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!isEmailValid || !isPasswordValid || loading) return;

    setLoading(true);
    setError("");

    const res = await AuthApi.login({ email, password });
    setLoading(false);

    if (res.success) {
      // route by role
      if (res.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }
    } else {
      setError(res.error || "Login failed");
    }
  };

  /* ---------- UI (unchanged design) ---------- */
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Top Separator with shadow */}
      <div className="w-full border-b border-gray-300 shadow-sm"></div>

      {/* 10px gap after logo */}
      <div className="w-full h-[7px]"></div>

      {/* Logo at top left */}
      <div className="w-full flex items-center gap-2 px-10 pt-4 pb-2">
        <img
          src={logo}
          alt="FootMart Logo"
          className="h-14 w-14 cursor-pointer"
          onClick={() => navigate("/home")}
        />
      </div>

      {/* 10px gap after logo */}
      <div className="w-full h-[10px]"></div>

      {/* Form Separator */}
      <div className="w-full border-t border-gray-300 shadow-sm"></div>

      {/* Main Section */}
      <div className="flex flex-col items-center flex-1 w-full py-10">
        <div className="w-full flex flex-col items-center mt-1 mb-8">
          <h2 className="text-[30px] font-bold mb-10 text-center">
            Sign in or create an account
          </h2>
          <div className="text-mm font-bold mb-3 text-center text-gray-600">
            FOOT MART
          </div>
          <div className="text-base font-semibold text-gray-600 text-center max-w-lg mb-4 leading-relaxed">
            Kick Off Your Journey – Join FootMart Today for the <br />
            Ultimate Football Experience!
          </div>
        </div>

        <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white px-24 py-14 mb-10 shadow-lg relative">
          {/* Forgot Username Popup (unchanged) */}
          {showForgotUsername && (
            <div className="absolute left-0 top-[84px] md:-left-64 md:top-14 z-10">
              <div className="bg-[#FCF8F3] border border-yellow-300 rounded-xl p-5 shadow-lg flex items-start gap-3 min-w-[280px] relative">
                <span className="text-xl mt-0.5">✨</span>
                <div className="flex-1">
                  <div className="text-gray-900 font-medium text-[15px] leading-snug">
                    You can now use your email instead of a username.
                  </div>
                </div>
                <button
                  onClick={() => setShowForgotUsername(false)}
                  className="absolute right-2 top-2 text-gray-500 hover:text-gray-900"
                  aria-label="Close"
                >
                  <svg width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* ---------------- FORM ---------------- */}
          <form onSubmit={handleSubmit}>
            <p className="mb-7 font-semibold text-[#006241] text-[15px]">
              * indicates required field
            </p>

            {/* Email / Username */}
            <div className="mb-7">
              <input
                type="text"
                placeholder="* Username or email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                className={`w-full h-12 rounded-md border px-4 placeholder-gray-400 text-[18px] placeholder:font-semibold font-semibold transition 
                  ${touched.email && !isEmailValid ? "border-2 border-red-500" : "border-gray-300"}
                `}
              />
              {touched.email && !isEmailValid && (
                <div className="text-[15px] font-semibold text-red-600 mt-2 ml-1">
                  Enter email or username
                </div>
              )}
            </div>

            {/* Password */}
            <div className="mb-5 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="* Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                className={`w-full h-12 rounded-md border px-4 placeholder-gray-400 pr-12 text-[18px] placeholder:font-semibold font-semibold transition 
                  ${touched.password && !isPasswordValid ? "border-2 border-red-500" : "border-gray-300"}
                `}
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  /* eye icon */
                  <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  /* eye-off icon */
                  <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M17.94 17.94A10.92 10.92 0 0112 19C5 19 1 12 1 12a21.31 21.31 0 014.18-5.94M22.54 6.88A11 11 0 0123 12s-4 7-11 7a10.95 10.95 0 01-4.12-.82M9.88 9.88A3 3 0 1114.12 14.12M1 1l22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              {touched.password && !isPasswordValid && (
                <div className="text-[15px] font-semibold text-red-600 mt-2 ml-1">
                  Enter password
                </div>
              )}
            </div>

            {/* Keep me signed in & links (unchanged) */}
            <div className="flex items-center gap-2 mt-1 mb-5">
              <input type="checkbox" checked readOnly className="w-5 h-5 accent-[#006241] rounded" />
              <span className="text-[16px] font-medium">
                Keep me signed in{" "}
                <a href="#" className="text-[#006241] font-semibold underline hover:text-[#004d33] ml-1">
                  Details
                </a>
              </span>
            </div>

            {/* Forgot links */}
            <div className="mb-7 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setShowForgotUsername(true)}
                className="text-[#006241] font-bold text-[15px] hover:underline text-left"
              >
                Forgot your username?
              </button>
              <a
                href="#"
                className="text-[#006241] font-bold text-[15px] hover:underline text-left"
              >
                Forgot your password?
              </a>
            </div>

            {/* Submit + error */}
            {error && <div className="text-red-600 font-semibold mb-4 text-center">{error}</div>}

            <div className="flex justify-end mt-7">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#00754A] hover:bg-[#006241] text-white px-8 py-3 rounded-full shadow-md font-semibold text-[18px] transition"
                style={{ minWidth: 160 }}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>

        {/* Join FootMart Now section (unchanged) */}
        <div className="w-full max-w-xl flex flex-col items-center justify-center py-6 mb-10">
          <div className="text-green-700 text-sm font-bold tracking-wide mb-2 text-center uppercase" style={{ letterSpacing: ".1em" }}>
            Join FootMart Now
          </div>
          <div className="text-gray-700 text-sm text-center mb-5">
            As a member, dive into exclusive football perks, unlock the best merchandise deals, and celebrate your birthday with a special treat from FootMart. Best of all, it’s free to join us now!
          </div>
          <button
            className="border border-green-700 text-green-700 font-semibold rounded-full px-7 py-2 bg-white hover:bg-green-50 transition"
            onClick={() => navigate("/auth/register")}
          >
            Join now
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPageComponent;
