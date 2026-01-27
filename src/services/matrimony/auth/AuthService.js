import apiCall from "../apiClient";

class MatrimonyAuthService {
  /**
   * Login user
   */
  static async login(email, password) {
    try {
      const response = await apiCall("/auth/login", {
        method: "POST",
        body: { email, password },
      });

      if (response && response.accessToken && response.user) {
        // Store tokens and user object
        localStorage.setItem("matrimonyToken", response.accessToken);
        if (response.refreshToken) {
          localStorage.setItem("matrimonyRefreshToken", response.refreshToken);
        }
        localStorage.setItem("matrimonyUser", JSON.stringify(response.user));

        // Optional: store first character of fullName separately
        const firstChar = response.user.fullName?.charAt(0) || "";
        localStorage.setItem("matrimonyUserInitial", firstChar.toUpperCase());
      }

      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }

  /**
   * Register user
   */
  static async register(userData) {
    const response = await apiCall("/auth/register", {
      method: "POST",
      body: userData,
    });

    return response.data;
  }

  /**
   * Verify OTP
   */
  static async verifyOtp(email, otp) {
    const response = await apiCall("/auth/verify-otp", {
      method: "POST",
      body: { email, otp },
    });

    if (response.data?.accessToken) {
      localStorage.setItem("matrimonyToken", response.data.accessToken);
      localStorage.setItem("matrimonyUser", JSON.stringify(response.data.user));
    }

    return response.data;
  }

  /**
   * Logout user
   */
  static logout() {
    localStorage.removeItem("matrimonyToken");
    localStorage.removeItem("matrimonyRefreshToken");
    localStorage.removeItem("matrimonyUser");
    localStorage.removeItem("matrimonyUserInitial");
  }

  /**
   * Get current user
   */
  static getCurrentUser() {
    const user = localStorage.getItem("matrimonyUser");
    return user ? JSON.parse(user) : null;
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated() {
    return !!localStorage.getItem("matrimonyToken");
  }

  /**
   * Refresh token
   */
  static async refreshToken() {
    const response = await apiCall("/auth/refresh", {
      method: "POST",
    });

    if (response.data?.accessToken) {
      localStorage.setItem("matrimonyToken", response.data.accessToken);
    }

    return response.data;
  }

  /**
   * Send password reset email
   */
  static async forgotPassword(email) {
    return await apiCall("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  /**
   * Reset password
   */
  static async resetPassword(token, password) {
    return await apiCall("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, password }),
    });
  }
}

export default MatrimonyAuthService;
