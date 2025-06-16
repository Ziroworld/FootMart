import React, { useState, useEffect } from "react";

export default function ThemeController() {
  // 1⃣  initial state: saved preference → otherwise system preference
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("footmart-theme");
    if (saved) return saved === "black";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // 2⃣  whenever isDark changes, write to <html data-theme="…">
  useEffect(() => {
    const theme = isDark ? "black" : "fantasy";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("footmart-theme", theme);
  }, [isDark]);

  return (
    <label className="flex items-center gap-2 cursor-pointer">
      {/* sun  = light */}
      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="5" />
        <g stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="1"  x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="1"  y1="12" x2="3"  y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.2" y1="4.2"  x2="2.8" y2="2.8" />
          <line x1="19.8" y1="19.8" x2="21.2" y2="21.2" />
          <line x1="4.2" y1="19.8" x2="2.8" y2="21.2" />
          <line x1="19.8" y1="4.2"  x2="21.2" y2="2.8" />
        </g>
      </svg>

      <input
        type="checkbox"
        className="toggle toggle-primary"
        checked={isDark}
        onChange={(e) => setIsDark(e.target.checked)}
        aria-label="Toggle dark mode"
      />

      {/* moon = dark */}
      <svg className="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
      </svg>
    </label>
  );
}
