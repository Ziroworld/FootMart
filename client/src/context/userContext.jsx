import React, { createContext, useState, useEffect } from "react";
import { AuthApi } from "../server/AuthApi"; // <-- Import your API abstraction

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("authToken");
    const id = localStorage.getItem("userId");
    const role = localStorage.getItem("userRole");
    if (!token || !id || id === "undefined" || !role || role === "undefined") return null;
    return {
      id,
      role,
      name:  localStorage.getItem("userName")  || null,
      email: localStorage.getItem("userEmail") || null,
    };
  });

  const [loading, setLoading] = useState(true);

  // Admin users state
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchUser = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        if (isMounted) setLoading(false);
        return;
      }
      try {
        const me = await AuthApi.me(token);
        if (me && me.user) {
          const userObj = me.user;
          const id = userObj.id ?? userObj._id;
          const role = userObj.role;
          const name = userObj.name ?? userObj.username ?? "";
          const email = userObj.email ?? null;

          if (!isMounted) return;
          setUser({ id, role, name: name || null, email });

          localStorage.setItem("userId",   id);
          localStorage.setItem("userRole", role);
          localStorage.setItem("userName", name);
          if (email) localStorage.setItem("userEmail", email);
        } else {
          clearAuth();
        }
      } catch (error) {
        clearAuth();
        console.error("Network error fetching user:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUser();
    return () => { isMounted = false; };
  }, []);

  const clearAuth = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setUser(null);
  };

  const logout = () => clearAuth();

  // --------- Use AuthApi for all user admin features! ---------
  const fetchUsers = async () => {
    setUsersLoading(true);
    setUsersError(null);
    try {
      const res = await AuthApi.getAllUsers();
      if (res.success) setUsers(res.users);
      else throw new Error(res.error || "Could not fetch users");
    } catch (err) {
      setUsersError(err.message || "Unknown error");
      setUsers([]);
    } finally {
      setUsersLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    setUsersLoading(true);
    setUsersError(null);
    try {
      const res = await AuthApi.deleteUser(userId);
      if (!res.success) throw new Error(res.error || "Failed to delete user");
      setUsers(prev => prev.filter(u => (u._id || u.id) !== userId));
      return { success: true };
    } catch (err) {
      setUsersError(err.message || "Unknown error");
      return { success: false, error: err.message };
    } finally {
      setUsersLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{
      user, setUser, logout, loading,
      users, setUsers, usersLoading, usersError,
      fetchUsers, deleteUser,
    }}>
      {!loading && children}
    </UserContext.Provider>
  );
};
