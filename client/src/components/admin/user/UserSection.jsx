import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaUserAlt } from "react-icons/fa";
import { useUser } from "../../../hooks/useUser";

// Toast Notification (reuse from your code)
function Toast({ message, show, onClose }) {
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 28, scale: 0.96 }}
          transition={{ duration: 0.33 }}
          className="
            fixed z-50 left-1/2 bottom-8
            -translate-x-1/2
            bg-green-100 border border-green-300 text-green-900 rounded-2xl px-8 py-5
            flex items-center gap-4 shadow-2xl drop-shadow-xl
            backdrop-blur-xl
          "
        >
          <svg width="28" height="28" viewBox="0 0 24 24" className="text-green-600">
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
          <span className="font-extrabold text-xl drop-shadow">{message}</span>
          <button
            onClick={onClose}
            className="ml-2 text-xl font-bold text-green-900 hover:text-green-700 px-3"
            aria-label="Close notification"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const statusColors = {
  Active: "bg-green-100 text-green-700 border-green-300",
  Inactive: "bg-gray-100 text-gray-600 border-gray-300",
  Suspended: "bg-red-100 text-red-700 border-red-300"
};

export default function UserSection() {
  const { users, fetchUsers, deleteUser, usersLoading, usersError } = useUser();

  const [confirmId, setConfirmId] = useState(null);
  const [doneDelete, setDoneDelete] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });

  // Framer variants for table rows
  const rowVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.03 * i, type: "spring", stiffness: 80 }
    })
  };

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  // Delete user
  const handleDelete = (id) => setConfirmId(id);

  const handleConfirmDelete = async () => {
    if (!confirmId) return;
    setDoneDelete(true);
    // Simulate delay for UI
    setTimeout(async () => {
      const res = await deleteUser(confirmId);
      if (res.success) {
        setToast({ show: true, message: "User deleted successfully!" });
      } else {
        setToast({ show: true, message: res.error || "Failed to delete user" });
      }
      setConfirmId(null);
      setDoneDelete(false);
    }, 1000);
  };

  const handleCancel = () => {
    setConfirmId(null);
    setDoneDelete(false);
  };

  // Helper to pretty status for now (optional: you can add status to your users in backend)
  function getStatus(u) {
    if (u.status) return u.status;
    if (u.isSuspended) return "Suspended";
    if (u.isActive === false) return "Inactive";
    return "Active";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: "spring" }}
      className="relative"
    >
      {/* Toast */}
      <Toast
        message={toast.message}
        show={toast.show}
        onClose={() => setToast({ show: false, message: "" })}
      />

      <h2 className="text-3xl font-extrabold text-[#00754A] mb-2 flex items-center gap-2">
        <FaUserAlt className="inline-block mb-1" /> User Management
      </h2>
      <div className="text-[#26323c]/70 font-semibold mb-10">
        Monitor all platform users.
        <span className="text-[#16e087]"> Delete operation is permanent!</span>
      </div>

      {/* Loading and error UI */}
      {usersLoading && (
        <div className="flex justify-center py-8">
          <span className="text-xl font-bold text-[#00754A] animate-pulse">Loading users...</span>
        </div>
      )}
      {usersError && (
        <div className="flex justify-center py-8">
          <span className="text-lg font-bold text-red-600">{usersError}</span>
        </div>
      )}

      <div className="w-full overflow-x-auto bg-gradient-to-br from-[#f6fff6] to-[#e9fbff] rounded-2xl p-3 shadow-2xl border border-[#e3f5ed]">
        <motion.table
          className="w-full rounded-xl text-left bg-white shadow-xl border border-[#e3f5ed]"
          initial="hidden"
          animate="visible"
        >
          <thead>
            <tr className="bg-[#e8ffe5] text-[#00754A] text-lg">
              <th className="py-4 px-4 font-bold rounded-tl-xl">Name</th>
              <th className="py-4 px-4 font-bold">Email</th>
              <th className="py-4 px-4 font-bold">Role</th>
              <th className="py-4 px-4 font-bold">Joined</th>
              <th className="py-4 px-4 font-bold">Status</th>
              <th className="py-4 px-4 font-bold rounded-tr-xl text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {users.map((user, i) => (
                <motion.tr
                  key={user._id || user.id}
                  custom={i}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.97 }}
                  className={`
                    border-b last:border-b-0 border-[#e3f5ed] 
                    hover:bg-[#f2fff9] transition-all group
                  `}
                  style={{
                    filter: confirmId === (user._id || user.id) ? "blur(0.5px)" : "none",
                    opacity: confirmId && confirmId === (user._id || user.id) && doneDelete ? 0.5 : 1
                  }}
                >
                  <td className="py-3 px-4 font-bold text-[#1e2746] flex items-center gap-2">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#e8ffe5]">
                      <FaUserAlt className="text-[#00754A] text-[15px]" />
                    </span>
                    {user.name || user.fullName || user.username || user.email.split("@")[0]}
                  </td>
                  <td className="py-3 px-4 text-[#3d4d5d]">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className={
                      user.role === "admin"
                        ? "bg-[#ebdcfa] text-[#6837ae] px-3 py-1 rounded-xl border border-[#d6c5f5] text-sm font-semibold"
                        : "bg-[#e3f5ed] text-[#00754A] px-3 py-1 rounded-xl border border-[#b2edd9] text-sm font-semibold"
                    }>
                      {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "-"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {/* If you save createdAt/joined in your DB, show it! */}
                    {user.joined
                      || (user.createdAt && new Date(user.createdAt).toLocaleDateString())
                      || "-"}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-xl border text-sm font-semibold ${statusColors[getStatus(user)]}`}>
                      {getStatus(user)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      className="inline-flex gap-2 items-center px-3 py-2 rounded-xl font-bold bg-gradient-to-br from-[#ffbdbd] to-[#fff8f6] text-[#e4002b] border border-[#fae1e6] hover:bg-[#ffe9e6] shadow hover:scale-105 transition"
                      disabled={!!confirmId}
                      onClick={() => handleDelete(user._id || user.id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </motion.table>
      </div>

      {/* --- Confirmation Modal --- */}
      <AnimatePresence>
        {confirmId && (
          <motion.div
            initial={{ opacity: 0, y: -18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.95 }}
            transition={{ duration: 0.25, type: "spring" }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-[#101f33]/40 backdrop-blur-[2.5px]"
          >
            <motion.div
              initial={{ scale: 0.97, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0.8 }}
              transition={{ duration: 0.21 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-[#e3f5ed] flex flex-col items-center text-center"
            >
              {!doneDelete ? (
                <>
                  <div className="text-3xl mb-3">⚠️</div>
                  <div className="text-xl font-extrabold mb-1 text-[#e4002b]">Delete User?</div>
                  <div className="text-[#3d4d5d] mb-7">Are you sure you want to permanently delete this user?</div>
                  <div className="flex gap-5 justify-center mt-2">
                    <button
                      className="bg-[#f3f6fa] text-[#26323c] px-5 py-2.5 rounded-xl font-semibold border border-[#e3f5ed] hover:bg-[#e8ffe5] hover:text-[#00754A] transition"
                      onClick={handleCancel}
                      disabled={doneDelete}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-gradient-to-br from-[#ffbdbd] to-[#ffe7e7] text-[#e4002b] px-5 py-2.5 rounded-xl font-semibold border border-[#fae1e6] hover:bg-[#ffe9e6] transition"
                      onClick={handleConfirmDelete}
                      disabled={doneDelete}
                    >
                      {doneDelete ? "Deleting..." : "Yes, Delete"}
                    </button>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-3 py-6"
                >
                  <div className="text-3xl">⏳</div>
                  <div className="font-bold text-lg text-[#00754A]">Deleting...</div>
                  <div className="text-[#26323c]/70">The user will be removed from database shortly.</div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
