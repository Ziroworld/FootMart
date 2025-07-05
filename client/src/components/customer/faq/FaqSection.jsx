import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FiPlus, FiMinus, FiUserPlus, FiPackage, FiUnlock,
  FiShoppingCart, FiStar
} from "react-icons/fi";

// Icons per FAQ, can be extended as you want!
const faqIcons = [
  FiUserPlus,        // Account creation
  FiPackage,         // Track order
  FiUnlock,          // Forgot password
  FiShoppingCart,    // Manage cart
  FiStar,            // Reviews
];

const faqs = [
  {
    question: "How do I create an account on FootMart?",
    answer: "Click the 'Sign Up' button and follow the easy registration steps to join us!",
  },
  {
    question: "How can I track my order status?",
    answer: "Go to 'Order History' in your profile to check the latest updates on your order.",
  },
  {
    question: "What if I forget my password?",
    answer: "No worries! Just click 'Forgot Password?' at login and reset your password quickly.",
  },
  {
    question: "How can I manage my cart?",
    answer: "Simply add or remove items using the cart icon at any time to update your selections.",
  },
  {
    question: "Can I leave reviews?",
    answer: "Absolutely! Head to a player’s profile and share your valuable feedback.",
  },
];

export default function FaqSection() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <motion.section
      className="max-w-4xl mx-auto px-3 sm:px-7 py-16"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: "spring", bounce: 0.19 }}
    >
      {/* Breadcrumb */}
      <div className="flex gap-2 text-[#00754A] text-base mb-9 select-none">
        <button onClick={() => navigate("/home")} className="hover:underline font-semibold">Home</button>
        <span>›</span>
        <span className="font-bold text-black">FAQ</span>
      </div>

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 tracking-tight text-black text-center drop-shadow-lg">
        Frequently Asked <span className="text-[#00754A]">Questions</span>
      </h1>
      <p className="text-lg sm:text-xl mb-10 text-center text-black/80 font-medium">
        Quick answers for your FootMart journey. <span className="inline-block animate-bounce">⚽</span>
      </p>

      {/* Accordion FAQ */}
      <div className="space-y-5">
        {faqs.map((item, idx) => {
          const Icon = faqIcons[idx];
          return (
            <motion.div
              key={idx}
              className={`
                rounded-2xl bg-white/90 shadow-lg
                border-2 ${openIndex === idx ? "border-[#00754A]" : "border-[#e3f5ed]"}
                backdrop-blur-[3px]
                transition-all duration-300
                overflow-hidden
              `}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.36, delay: idx * 0.1 }}
            >
              <button
                onClick={() => toggle(idx)}
                className={`
                  w-full flex items-center justify-between py-5 px-6
                  text-xl sm:text-2xl font-bold text-black tracking-tight
                  transition-all duration-200
                  focus:outline-none
                  ${openIndex === idx ? "text-[#00754A]" : ""}
                `}
              >
                <span className="flex items-center gap-4">
                  {/* Animate icon */}
                  <motion.span
                    animate={openIndex === idx
                      ? { scale: [1, 1.24, 0.98, 1.12, 1], rotate: [0, 12, -9, 8, 0] }
                      : { scale: 1, rotate: 0 }
                    }
                    transition={{
                      duration: 0.9,
                      repeat: openIndex === idx ? Infinity : 0,
                      repeatType: "mirror",
                      ease: "easeInOut"
                    }}
                  >
                    <Icon size={30} className={openIndex === idx ? "text-[#00754A]" : "text-black"} />
                  </motion.span>
                  {item.question}
                </span>
                <motion.span
                  initial={false}
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-2"
                >
                  {openIndex === idx ? (
                    <FiMinus size={28} className="text-[#00754A]" />
                  ) : (
                    <FiPlus size={28} className="text-black" />
                  )}
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === idx && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="overflow-hidden px-7 pb-6"
                  >
                    <p className="text-base sm:text-lg text-black/80 leading-relaxed border-l-4 border-[#00754A]/20 pl-4 mt-1">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Engaging CTA */}
      <motion.div
        className="mt-16 sm:mt-20 text-center"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.14, duration: 0.5 }}
      >
        <p className="text-lg sm:text-xl font-bold text-black">
          Ready to level up your football journey?
          <span
            onClick={() => navigate("/auth/register")}
            className="ml-2 cursor-pointer text-[#00754A] underline underline-offset-4 hover:text-black transition"
          >
            Join FootMart Today!
          </span>
        </p>
      </motion.div>
    </motion.section>
  );
}
