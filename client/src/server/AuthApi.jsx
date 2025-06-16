/* client/src/server/AuthApi.jsx
   Lightweight wrapper around /api/auth routes */
export class AuthApi {
  static base = "http://localhost:8080/api/auth";

  /* -------------- REGISTER -------------- */
  static async register({ fullName, email, password }) {
    try {
      const res = await fetch(`${AuthApi.base}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      // persist everything that comes back
      AuthApi.persistToken(data.token);
      AuthApi.persistUserInfo(data.role, data.user);

      return { success: true, token: data.token, role: data.role, user: data.user };
    } catch (err) {
      console.error("Register error ➜", err.message);
      return { success: false, error: err.message };
    }
  }

 /* -------------- LOGIN -------------- */
  static async login({ email, password }) {
    try {
      const res = await fetch(`${AuthApi.base}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      // 1️⃣  store JWT
      AuthApi.persistToken(data.token);

      // 2️⃣  read role & user directly from first payload
      let role = data.role;
      let user = data.user;

      // 3️⃣  if somehow missing, fall back to /me
      if (!role || !user) {
        ({ role, user } = await AuthApi.getRoleAndUser(data));
      }

      // 4️⃣  persist role + user only when valid
      AuthApi.persistUserInfo(role, user);

      return { success: true, token: data.token, role, user };
    } catch (err) {
      console.error("Login error ➜", err.message);
      return { success: false, error: err.message };
    }
  }

  /* ---------- helpers ---------- */

  // fetch /me only if the first response didn’t contain role/user
  static async getRoleAndUser(data) {
    let role = data.role;
    let user = data.user;

    if (!role || !user) {
      const me = await AuthApi.me(data.token);
      role = role || me?.role;
      user = user || me;
    }
    return { role, user };
  }

  static persistToken(token) {
    if (token) localStorage.setItem("authToken", token);
  }

  static persistUserInfo(role, user) {
    if (role)         localStorage.setItem("userRole", role);
    if (user?.id)     localStorage.setItem("userId",   user.id);
    if (user?.name)   localStorage.setItem("userName", user.name);
    if (user?.email)  localStorage.setItem("userEmail", user.email);
  }

  /* -------------- CURRENT USER -------------- */
  static async me(token) {
    try {
      const res = await fetch(`${AuthApi.base}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }
}
