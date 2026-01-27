import MatrimonyAuthService from "../auth/MatrimonyAuthService";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

class MatrimonySearchService {
  static getHeaders() {
    const token = MatrimonyAuthService.getToken();
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  static async searchProfiles(filters = {}, page = 1, limit = 20) {
    try {
      const queryParams = new URLSearchParams();

      // Add filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "") {
          queryParams.append(key, value);
        }
      });

      queryParams.append("page", page);
      queryParams.append("limit", limit);

      const response = await fetch(
        `${API_BASE_URL}/matrimony/search?${queryParams}`,
        {
          method: "GET",
          headers: this.getHeaders(),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Search failed");

      return data.data;
    } catch (error) {
      throw error;
    }
  }

  static async getMatchingProfiles(page = 1, limit = 20) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/matrimony/matches?page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: this.getHeaders(),
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch matches");

      return data.data;
    } catch (error) {
      throw error;
    }
  }

  static async getFilterOptions() {
    try {
      const response = await fetch(`${API_BASE_URL}/matrimony/filters`, {
        method: "GET",
        headers: this.getHeaders(),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch filters");

      return data.data;
    } catch (error) {
      throw error;
    }
  }

  static async sendInterest(toUserId, message = "", interestType = "INTEREST") {
    try {
      const response = await fetch(`${API_BASE_URL}/matrimony/interests`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({
          toUserId,
          message,
          interestType,
        }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to send interest");

      return data.data;
    } catch (error) {
      throw error;
    }
  }

  static async getReceivedInterests(status = null) {
    try {
      const url = status
        ? `${API_BASE_URL}/matrimony/interests/received?status=${status}`
        : `${API_BASE_URL}/matrimony/interests/received`;

      const response = await fetch(url, {
        method: "GET",
        headers: this.getHeaders(),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch interests");

      return data.data;
    } catch (error) {
      throw error;
    }
  }

  static async getSentInterests(status = null) {
    try {
      const url = status
        ? `${API_BASE_URL}/matrimony/interests/sent?status=${status}`
        : `${API_BASE_URL}/matrimony/interests/sent`;

      const response = await fetch(url, {
        method: "GET",
        headers: this.getHeaders(),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch sent interests");

      return data.data;
    } catch (error) {
      throw error;
    }
  }

  static async respondToInterest(interestId, status) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/matrimony/interests/${interestId}`,
        {
          method: "PATCH",
          headers: this.getHeaders(),
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to respond to interest");

      return data.data;
    } catch (error) {
      throw error;
    }
  }

  static async withdrawInterest(interestId) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/matrimony/interests/${interestId}`,
        {
          method: "DELETE",
          headers: this.getHeaders(),
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to withdraw interest");

      return data.data;
    } catch (error) {
      throw error;
    }
  }

  static async getMatches() {
    try {
      const response = await fetch(`${API_BASE_URL}/matrimony/matches`, {
        method: "GET",
        headers: this.getHeaders(),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch matches");

      return data.data;
    } catch (error) {
      throw error;
    }
  }
}

export default MatrimonySearchService;
