const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

class MatrimonyAuthService {
  static async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      // Store tokens
      localStorage.setItem("matrimony_token", data.data.accessToken);
      localStorage.setItem("matrimony_refresh_token", data.data.refreshToken);
      localStorage.setItem("matrimony_user", JSON.stringify(data.data.user));

      return data.data;
    } catch (error) {
      throw error;
    }
  }

  static async register(
    firstName,
    lastName,
    email,
    password,
    gender,
    dateOfBirth
  ) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          gender,
          dateOfBirth,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");

      return data.data;
    } catch (error) {
      throw error;
    }
  }

  static async verifyOtp(email, otp) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "OTP verification failed");

      // Store tokens
      localStorage.setItem("matrimony_token", data.data.accessToken);
      localStorage.setItem("matrimony_refresh_token", data.data.refreshToken);
      localStorage.setItem("matrimony_user", JSON.stringify(data.data.user));

      return data.data;
    } catch (error) {
      throw error;
    }
  }

  static async logout() {
    localStorage.removeItem("matrimony_token");
    localStorage.removeItem("matrimony_refresh_token");
    localStorage.removeItem("matrimony_user");
  }

  static getToken() {
    return localStorage.getItem("matrimony_token");
  }

  static getUser() {
    const user = localStorage.getItem("matrimony_user");
    return user ? JSON.parse(user) : null;
  }

  static isAuthenticated() {
    return !!this.getToken();
  }

  static async refreshToken() {
    try {
      const refreshToken = localStorage.getItem("matrimony_refresh_token");
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error("Token refresh failed");

      localStorage.setItem("matrimony_token", data.data.accessToken);
      return data.data.accessToken;
    } catch (error) {
      this.logout();
      throw error;
    }
  }
}

export default MatrimonyAuthService;
