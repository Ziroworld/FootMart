import React from "react";
import Sidebar from "../../../components/admin/Mainlayout-component/Sidebar";
import AdminNavbar from "../../../components/admin/Mainlayout-component/Navbar";
import AdminFooter from "../../../components/admin/Mainlayout-component/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8ffe5] via-[#e4f9ef] to-[#eaf4ff] relative">
      {/* Sidebar is always fixed */}
      <Sidebar />
      {/* Main content is shifted right */}
      <div className="ml-64 flex flex-col min-h-screen">
        <AdminNavbar />
        <main className="flex-1 px-3 sm:px-8 py-7 bg-transparent">
          {children}
        </main>
        <AdminFooter />
      </div>
    </div>
  );
}
