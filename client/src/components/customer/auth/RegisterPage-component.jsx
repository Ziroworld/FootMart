import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";

// Regex for email and password validation
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?]).{8,25}$/;

function RegisterPageComponent() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [wantEmail, setWantEmail] = useState(true);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const navigate = useNavigate();

  // Validation
  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = passwordRegex.test(password);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Top Separator with shadow */}
      <div className="w-full border-b border-gray-300 shadow-sm"></div>

      {/* 10px gap after logo */}
      <div className="w-full h-[7px]"></div>

      {/* Logo at top left (medium) with gap */}
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

      {/* Main Form Section */}
      <div className="flex flex-col items-center flex-1 w-full py-10">
        <div className="w-full flex flex-col items-center mt-1 mb-8">
          <h2 className="text-[30px] font-bold mb-10 text-center">
            Create an account
          </h2>
          <div className="text-mm font-bold mb-3 text-center text-gray-600">
            FOOT MART
          </div>
          <div className="text-base font-semibold text-gray-600 text-center max-w-lg mb-4 leading-relaxed">
            Kick Off Your Journey – Join FootMart Today for the <br />
            Ultimate Football Experience!
          </div>
        </div>
        <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white px-24 py-14 mb-10 shadow-lg">
          <form>
            <p className="mb-8 font-semibold text-[#006241] text-[15px]">
              * indicates required field
            </p>
            {/* Personal Information */}
            <div className="mb-8">
              <label className="block font-bold mb-4 text-[18px]">
                Personal Information
              </label>
              <input
                type="text"
                placeholder="* Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full h-12 rounded-md border border-gray-300 px-4 placeholder-gray-400 text-[18px] placeholder:font-semibold mb-6"
              />
            </div>
            {/* Account Security */}
            <div className="mb-8">
              <label className="block font-bold mb-4 text-[18px]">
                Account Security
              </label>
              <input
                type="email"
                placeholder="* Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
                className={`w-full h-12 rounded-md border px-4 placeholder-gray-400 mb-2 text-[18px] placeholder:font-semibold ${
                  emailTouched && !isEmailValid ? "border-2 border-red-500" : "border-gray-300"
                }`}
              />
              <div className="text-[15px] text-gray-500 font-semibold mb-4">
                This will be your username
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="* Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setPasswordTouched(true)}
                  className={`w-full h-12 rounded-md border px-4 placeholder-gray-400 pr-12 mb-2 text-[18px] placeholder:font-semibold ${
                    passwordTouched && !isPasswordValid ? "border-2 border-red-500" : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.92 10.92 0 0112 19C5 19 1 12 1 12a21.31 21.31 0 014.18-5.94M22.54 6.88A11 11 0 0123 12s-4 7-11 7a10.95 10.95 0 01-4.12-.82M9.88 9.88A3 3 0 1114.12 14.12M1 1l22 22"/></svg>
                  )}
                </button>
              </div>
              <div className="text-[15px] text-gray-500 font-semibold mt-2 leading-snug">
                Create a password 8 to 25 characters long that includes at least 1 uppercase and 1 lowercase letter, 1 number, and 1 special character.
              </div>
            </div>
            {/* Already have an account? */}
            <div className="mb-8">
              <a href="/auth/login" className="font-bold text-[#006241] text-[18px] hover:underline">
                Already have an account?
              </a>
            </div>
            {/* Email Offers Section */}
            <div className="mb-7">
              <div className="uppercase font-bold text-gray-600 text-[15px] mb-3 tracking-wide">
                KNOW MORE ABOUT OFFERS
              </div>
              <div className="text-[15px] text-gray-600 font-semibold mb-5">
                Email is a great way to know about offers and what’s new from FootMart.
              </div>
              <div className="flex items-start gap-3 mb-1">
                <input
                  type="checkbox"
                  checked={wantEmail}
                  onChange={() => setWantEmail((v) => !v)}
                  className="w-6 h-6 accent-[#006241] mt-1"
                  id="email-offers"
                />
                <div>
                  <label htmlFor="email-offers" className="font-semibold text-[18px] cursor-pointer select-none">
                    Yes, I’d like email from FootMart
                  </label>
                  <div className="text-[15px] text-gray-500 font-medium mt-3">
                    Know about initiatives, announcements and product offers.
                  </div>
                </div>
              </div>
            </div>
            {/* Terms of Use Section */}
            <div className="mb-7">
              <div className="uppercase font-bold text-gray-600 text-[15px] mb-8 tracking-wide">
                Terms of Use
              </div>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={() => setAgree((v) => !v)}
                  className="w-5 h-5 accent-[#006241] mt-1"
                  id="terms"
                />
                <label htmlFor="terms" className="font-semibold text-[18px] cursor-pointer select-none">
                  I agree to the <span className="text-[#00754A] underline hover:text-[#005237]">FootMart Terms</span>.
                </label>
              </div>
            </div>
            {/* Submit Button */}
            <div className="flex justify-end mt-10">
              <button
                type="submit"
                disabled={!agree || !fullName || !isEmailValid || !isPasswordValid}
                className="bg-[#00754A] hover:bg-[#006241] text-white px-8 py-3 rounded-full shadow-md font-semibold text-[18px] transition"
                style={{ minWidth: 160 }}
              >
                Create account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPageComponent;
