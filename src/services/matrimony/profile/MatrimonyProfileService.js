import MatrimonyAuthService from "../auth/AuthService";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

class MatrimonyProfileService {
  static getHeaders() {
    const token = MatrimonyAuthService.getToken();
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  static async createProfile(profileData) {
    try {
      const response = await fetch(`${API_BASE_URL}/matrimony/profile`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(profileData),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to create profile");

      return data.data;
    } catch (error) {
      throw error;
    }
  }

  static async getMyProfile() {
    try {
      const response = await fetch(`${API_BASE_URL}/matrimony/profile`, {
        method: "GET",
        headers: this.getHeaders(),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch profile");

      return data.data;
    } catch (error) {
      throw error;
    }
  }

  static async getProfileById(profileId) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/matrimony/profile/${profileId}`,
        {
          method: "GET",
          headers: this.getHeaders(),
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch profile");

      return data.data;
    } catch (error) {
      throw error;
    }
  }

  static async updateProfile(profileData) {
    try {
      const response = await fetch(`${API_BASE_URL}/matrimony/profile`, {
        method: "PUT",
        headers: this.getHeaders(),
        body: JSON.stringify(profileData),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to update profile");

      return data.data;
    } catch (error) {
      throw error;
    }
  }

  static async uploadProfilePhoto(file) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `${API_BASE_URL}/matrimony/profile/upload-photo`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${MatrimonyAuthService.getToken()}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to upload photo");

      return data.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteProfile() {
    try {
      const response = await fetch(`${API_BASE_URL}/matrimony/profile`, {
        method: "DELETE",
        headers: this.getHeaders(),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to delete profile");

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async unlockProfile(profileId) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/matrimony/profile/${profileId}/unlock`,
        {
          method: "POST",
          headers: this.getHeaders(),
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to unlock profile");

      return data.data;
    } catch (error) {
      throw error;
    }
  }

  static async checkProfileUnlock(profileId) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/matrimony/profile/${profileId}/unlock-status`,
        {
          method: "GET",
          headers: this.getHeaders(),
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to check unlock status");

      return data.data;
    } catch (error) {
      throw error;
    }
  }
}

export default MatrimonyProfileService;
