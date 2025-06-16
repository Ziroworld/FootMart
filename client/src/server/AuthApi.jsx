/*  Light, single-responsibility wrapper around your Express routes  */
export class AuthApi {
  static base = "http://localhost:8080/api/auth";

  /* ---------- REGISTER ---------- */
  static async register({ fullName, email, password }) {
    try {
      const res = await fetch(`${AuthApi.base}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      /* Persist token so the user is logged-in right away */
      if (data.token) localStorage.setItem("authToken", data.token);

      return { success: true, user: data.user, token: data.token };
    } catch (err) {
      console.error("Register error ➜", err.message);
      return { success: false, error: err.message };
    }
  }

  /* ---------- LOGIN  (kept for future use) ---------- */
  static async login({ email, password }) {
    try {
      const res = await fetch(`${AuthApi.base}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      localStorage.setItem("authToken", data.token);
      return { success: true, token: data.token };
    } catch (err) {
      console.error("Login error ➜", err.message);
      return { success: false, error: err.message };
    }
  }
}
