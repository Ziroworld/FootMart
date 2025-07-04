import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { AuthApi } from "../../../server/AuthApi.jsx";
import TermsAndConditionModel from "./TermsAndConditionModel.jsx";

// Toast Notification Component (same as in login page)
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

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?]).{8,25}$/;

export default function RegisterPageComponent() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPw] = useState(false);
  const [agree, setAgree] = useState(false);
  const [wantEmail, setWantEmail] = useState(true);

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showTerms, setShowTerms] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState({ show: false, message: "" });

  const navigate = useNavigate();

  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = passwordRegex.test(password);
  const canSubmit = agree && fullName && isEmailValid && isPasswordValid && !submitting;

  // Helper to show toast
  function notify(msg) {
    setToast({ show: false, message: "" });
    setTimeout(() => setToast({ show: true, message: msg }), 50);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setSubmitError("");

    const { success, error } = await AuthApi.register({
      fullName,
      email,
      password,
    });

    setSubmitting(false);

    if (success) {
      notify("Registration successful! Welcome to FootMart 👋");
      setTimeout(() => navigate("/home"), 1200); // Show toast, then navigate
    } else {
      setSubmitError(error);
      notify(error || "Registration failed.");
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

      {/* top border/nav */}
      <div className="w-full border-b border-gray-300 shadow-sm"></div>
      <div className="w-full h-[7px]"></div>
      <div className="w-full flex items-center gap-2 px-4 md:px-10 pt-4 pb-2">
        <img
          src={logo}
          alt="FootMart Logo"
          className="h-12 w-12 md:h-14 md:w-14 cursor-pointer"
          onClick={() => navigate("/home")}
        />
      </div>
      <div className="w-full h-[10px]"></div>
      <div className="w-full border-t border-gray-300 shadow-sm"></div>

      {/* main form */}
      <div className="flex flex-col items-center flex-1 w-full py-8 md:py-10">
        <div className="w-full flex flex-col items-center mt-1 mb-7 md:mb-8">
          <h2 className="text-[23px] sm:text-[26px] md:text-[30px] font-bold mb-7 md:mb-10 text-center">
            Create an account
          </h2>
          <div className="text-[15px] md:text-mm font-bold mb-2 md:mb-3 text-center text-gray-600">
            FOOT MART
          </div>
          <div className="text-[14px] md:text-base font-semibold text-gray-600 text-center max-w-lg mb-3 md:mb-4 leading-relaxed">
            Kick Off Your Journey – Join FootMart Today for the <br className="hidden sm:block" />
            Ultimate Football Experience!
          </div>
        </div>

        <div className="
          w-full bg-white rounded-2xl border border-gray-200 shadow-lg
          px-4 py-7 sm:px-10 sm:py-10 md:px-16 md:py-14 lg:px-24 lg:py-14
          max-w-full sm:max-w-lg md:max-w-xl mb-8 md:mb-10 transition-all duration-300
        ">
          <form onSubmit={handleSubmit}>
            <p className="mb-5 md:mb-8 font-semibold text-[#006241] text-[13px] md:text-[15px]">* indicates required field</p>

            {/* Personal Information */}
            <div className="mb-6 md:mb-8">
              <label className="block font-bold mb-3 md:mb-4 text-[16px] md:text-[18px]">Personal Information</label>
              <input
                type="text"
                placeholder="* Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full h-11 md:h-12 rounded-md border border-gray-300 px-3 md:px-4 placeholder-gray-400 text-[16px] md:text-[18px] placeholder:font-semibold mb-4 md:mb-6"
              />
            </div>

            {/* Account Security */}
            <div className="mb-6 md:mb-8">
              <label className="block font-bold mb-3 md:mb-4 text-[16px] md:text-[18px]">Account Security</label>
              <input
                type="email"
                placeholder="* Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
                className={`
                  w-full h-11 md:h-12 rounded-md border px-3 md:px-4 placeholder-gray-400 mb-2 text-[16px] md:text-[18px] placeholder:font-semibold
                  ${emailTouched && !isEmailValid ? "border-2 border-red-500" : "border-gray-300"}
                `}
              />
              <div className="text-[13px] md:text-[15px] text-gray-500 font-semibold mb-2 md:mb-4">This will be your username</div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="* Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setPasswordTouched(true)}
                  className={`
                    w-full h-11 md:h-12 rounded-md border px-3 md:px-4 pr-10 md:pr-12 mb-2 text-[16px] md:text-[18px] placeholder:font-semibold placeholder-gray-400
                    ${passwordTouched && !isPasswordValid ? "border-2 border-red-500" : "border-gray-300"}
                  `}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  tabIndex={-1}
                  className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M17.94 17.94A10.92 10.92 0 0112 19C5 19 1 12 1 12a21.31 21.31 0 014.18-5.94"/>
                      <path d="M22.54 6.88A11 11 0 0123 12s-4 7-11 7a10.95 10.95 0 01-4.12-.82"/>
                      <path d="M9.88 9.88A3 3 0 1114.12 14.12"/>
                      <path d="M1 1l22 22"/>
                    </svg>
                  )}
                </button>
              </div>
              <div className="text-[13px] md:text-[15px] text-gray-500 font-semibold mt-1 md:mt-2 leading-snug">
                Create a password 8 to 25 characters long that includes at least 1 uppercase and 1 lowercase letter, 1 number, and 1 special character.
              </div>
            </div>

            {/* Already have account */}
            <div className="mb-6 md:mb-8">
              <a href="/auth/login" className="font-bold text-[#006241] text-[16px] md:text-[18px] hover:underline">
                Already have an account?
              </a>
            </div>

            {/* Email offers */}
            <div className="mb-5 md:mb-7">
              <div className="uppercase font-bold text-gray-600 text-[13px] md:text-[15px] mb-2 md:mb-3 tracking-wide">KNOW MORE ABOUT OFFERS</div>
              <div className="text-[13px] md:text-[15px] text-gray-600 font-semibold mb-3 md:mb-5">
                Email is a great way to know about offers and what’s new from FootMart.
              </div>
              <div className="flex items-start gap-3 mb-1">
                <input
                  type="checkbox"
                  checked={wantEmail}
                  onChange={() => setWantEmail((v) => !v)}
                  className="w-5 h-5 md:w-6 md:h-6 accent-[#006241] mt-1"
                  id="email-offers"
                />
                <div>
                  <label htmlFor="email-offers" className="font-semibold text-[16px] md:text-[18px] cursor-pointer select-none">
                    Yes, I’d like email from FootMart
                  </label>
                  <div className="text-[13px] md:text-[15px] text-gray-500 font-medium mt-2 md:mt-3">
                    Know about initiatives, announcements and product offers.
                  </div>
                </div>
              </div>
            </div>

            {/* Terms of Use */}
            <div className="mb-5 md:mb-7">
              <div className="uppercase font-bold text-gray-600 text-[13px] md:text-[15px] mb-5 md:mb-8 tracking-wide">Terms of Use</div>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={() => setAgree((v) => !v)}
                  className="w-4 h-4 md:w-5 md:h-5 accent-[#006241] mt-1"
                  id="terms"
                />
                <label htmlFor="terms" className="font-semibold text-[16px] md:text-[18px] cursor-pointer select-none">
                  I agree to the{" "}
                  <button
                    type="button"
                    onClick={() => setShowTerms(true)}
                    className="text-[#00754A] underline hover:text-[#005237] p-0"
                  >
                    FootMart Terms
                  </button>
                  .
                </label>
              </div>
            </div>

            {/* Submit */}
            {submitError && (
              <div className="text-red-600 font-semibold mb-3 md:mb-4 text-center">{submitError}</div>
            )}
            <div className="flex justify-end mt-8 md:mt-10">
              <button
                type="submit"
                disabled={!canSubmit}
                className={`px-6 py-2 md:px-8 md:py-3 rounded-full shadow-md font-semibold text-[16px] md:text-[18px] transition
                  ${canSubmit ? "bg-[#00754A] hover:bg-[#006241] text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                style={{ minWidth: 120, maxWidth: 200 }}
              >
                {submitting ? "Creating..." : "Create account"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Terms modal */}
      {showTerms && <TermsAndConditionModel onClose={() => setShowTerms(false)} />}
    </div>
  );
}
