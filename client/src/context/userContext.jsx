import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Initialize user from localStorage if authToken and valid fields exist
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("authToken");
    const id = localStorage.getItem("userId");
    const role = localStorage.getItem("userRole");
    // ensure id/role not string "undefined"
    if (!token || !id || id === "undefined" || !role || role === "undefined") return null;
    return {
      id,
      role,
      name:  localStorage.getItem("userName")  || null,
      email: localStorage.getItem("userEmail") || null,
    };
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchUser = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        if (isMounted) setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/api/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const payload = await response.json();
          // payload shape: { user: {...} }
          const userObj = payload.user ?? payload;
          // handle both id and _id
          const id = userObj.id ?? userObj._id;
          const role = userObj.role;
          const name = userObj.name ?? userObj.username ?? "";
          const email = userObj.email ?? null;

          if (!isMounted) return;
          // update context
          setUser({ id, role, name: name || null, email });

          // persist fresh data
          localStorage.setItem("userId",   id);
          localStorage.setItem("userRole", role);
          localStorage.setItem("userName", name);
          if (email) localStorage.setItem("userEmail", email);
        } else if (response.status === 401) {
          // Token invalid or expired
          clearAuth();
        } else {
          // Server error or other status: retain existing user
          console.warn(
            `Unexpected status ${response.status} while fetching user.`
          );
        }
      } catch (error) {
        // Network error: do not clear token, keep stale user
        console.error("Network error fetching user:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUser();
    return () => {
      isMounted = false;
    };
  }, []);

  // Helper to clear all auth data
  const clearAuth = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setUser(null);
  };

  // public logout
  const logout = () => {
    clearAuth();
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, loading }}>
      {!loading && children}
    </UserContext.Provider>
  );
};
