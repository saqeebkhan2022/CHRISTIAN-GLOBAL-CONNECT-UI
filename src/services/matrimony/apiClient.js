// API Configuration
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getAuthToken = () => localStorage.getItem("matrimonyToken");
const getRefreshToken = () => localStorage.getItem("matrimonyRefreshToken");

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  isRefreshing = false;
  failedQueue = [];
};

const apiCall = async (endpoint, options = {}) => {
  const token = getAuthToken();
  let headers = options.headers || {};

  let body = options.body;

  // Automatically set JSON headers if body is an object (not FormData)
  if (body && !(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(body);
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    body,
  });

  const data = await response.json();

  // Handle 401 - Token expired
  if (response.status === 401 && token && !isRefreshing) {
    isRefreshing = true;

    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      // No refresh token available, redirect to login
      localStorage.removeItem("matrimonyToken");
      localStorage.removeItem("matrimonyUser");
      localStorage.removeItem("matrimonyRefreshToken");
      window.location.href = "/matrimony/login";
      return Promise.reject(new Error("No refresh token available"));
    }

    // Try to refresh the token
    try {
      const refreshResponse = await fetch(
        `${API_BASE_URL}/auth/refresh-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
          body: JSON.stringify({ refreshToken }),
        }
      );

      const refreshData = await refreshResponse.json();

      if (refreshResponse.ok && refreshData.accessToken) {
        localStorage.setItem("matrimonyToken", refreshData.accessToken);
        processQueue(null, refreshData.accessToken);

        // Retry the original request with new token
        headers["Authorization"] = `Bearer ${refreshData.accessToken}`;
        const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
          ...options,
          headers,
          body,
        });

        const retryData = await retryResponse.json();

        if (!retryResponse.ok) {
          throw new Error(retryData.message || "API Error");
        }

        return retryData;
      } else {
        // Refresh failed, clear tokens and redirect
        localStorage.removeItem("matrimonyToken");
        localStorage.removeItem("matrimonyUser");
        localStorage.removeItem("matrimonyRefreshToken");
        processQueue(new Error("Token refresh failed"), null);
        window.location.href = "/matrimony/login";
        return Promise.reject(new Error("Token refresh failed"));
      }
    } catch (error) {
      processQueue(error, null);
      localStorage.removeItem("matrimonyToken");
      localStorage.removeItem("matrimonyUser");
      localStorage.removeItem("matrimonyRefreshToken");
      window.location.href = "/matrimony/login";
      return Promise.reject(error);
    }
  }

  if (!response.ok) {
    throw new Error(data?.message || "API Error");
  }

  return data;
};

export default apiCall;
