import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaChartBar, FaUsers, FaBoxOpen, FaFutbol, FaSignOutAlt, FaClipboardList
} from "react-icons/fa";
import logo from "../../../assets/logo.png";

const links = [
  { to: "/admin/dashboard", icon: <FaChartBar />, label: "Dashboard" },
  { to: "/admin/dashboard/users", icon: <FaUsers />, label: "Users" },
  { to: "/admin/dashboard/products", icon: <FaBoxOpen />, label: "Products" },
  { to: "/admin/dashboard/players", icon: <FaFutbol />, label: "Players" },
  { to: "/admin/dashboard/orders", icon: <FaClipboardList />, label: "Orders" }, // changed to order
];

export default function Sidebar() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/auth/login";
  };

  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-white shadow-2xl flex flex-col py-7 px-5 border-r border-[#e3f5ed] z-30">
      <div className="mb-10 flex items-center gap-3">
        <img src={logo} alt="FootMart Logo" className="w-10 h-10 rounded-xl border-2 border-[#e3f5ed]" />
        <span className="font-bold text-2xl text-[#00754A] tracking-tight">FootMart</span>
      </div>
      <nav className="flex-1 flex flex-col gap-2">
        {links.map(l => (
          <NavLink
            to={l.to}
            key={l.to}
            className={({ isActive }) =>
              `flex items-center gap-3 py-2.5 px-4 rounded-xl font-semibold transition group
                ${
                  isActive
                    ? "bg-gradient-to-r from-[#c9ffe7] to-[#e8ffe5] text-[#00754A] shadow-xl"
                    : "text-[#26323c] hover:bg-[#e4f9ef]/70"
                }
                hover:scale-[1.03] hover:shadow-md`
            }
            end={l.to === "/admin/dashboard"}
          >
            <span className="text-lg">{l.icon}</span> {l.label}
          </NavLink>
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 mt-12 text-[#e4002b] font-bold hover:text-red-700 hover:scale-105 transition py-2.5 px-4 rounded-xl"
      >
        <FaSignOutAlt /> Logout
      </button>
    </aside>
  );
}
