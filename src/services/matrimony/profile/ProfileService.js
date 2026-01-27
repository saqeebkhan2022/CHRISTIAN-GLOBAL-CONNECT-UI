import apiCall from "../apiClient";

class MatrimonyProfileService {
  /**
   * Create a new profile
   */
  static async createProfile(profileData) {
    return await apiCall("/matrimony/profile", {
      method: "POST",
      body: profileData, // apiCall now handles JSON automatically
    });
  }

  /**
   * Get own profile
   */
  static async getOwnProfile() {
    return await apiCall("/matrimony/profile", {
      method: "GET",
    });
  }

  /**
   * Get another user's profile by ID (with unlock checks)
   */
  static async getProfile(profileId) {
    return await apiCall(`/matrimony/view-profile/${profileId}`, {
      method: "GET",
    });
  }

  /**
   * Update profile
   */
  static async updateProfile(profileData) {
    return await apiCall("/matrimony/profile", {
      method: "PUT",
      body: profileData,
    });
  }

  /**
   * Upload profile photo
   */
  static async uploadProfilePhoto(file) {
    const formData = new FormData();
    formData.append("photo", file);

    return await apiCall("/matrimony/profile/photo", {
      method: "POST",
      body: formData, // apiCall detects FormData and skips JSON headers
    });
  }

  /**
   * Upload multiple gallery photos (unlimited)
   */
  static async uploadGalleryPhotos(files) {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("photos", file);
    });

    return await apiCall("/matrimony/profile/gallery", {
      method: "POST",
      body: formData,
    });
  }

  /**
   * Get all gallery photos
   */
  static async getGalleryPhotos() {
    return await apiCall("/matrimony/profile/gallery/list", {
      method: "GET",
    });
  }

  /**
   * Delete a gallery photo
   */
  static async deleteGalleryPhoto(photoId) {
    return await apiCall(`/matrimony/profile/gallery/${photoId}`, {
      method: "DELETE",
    });
  }

  /**
   * Set a photo as primary
   */
  static async setPrimaryPhoto(photoId) {
    return await apiCall(`/matrimony/profile/gallery/${photoId}/primary`, {
      method: "PATCH",
    });
  }

  /**
   * Delete profile
   */
  static async deleteProfile() {
    return await apiCall("/matrimony/profile", {
      method: "DELETE",
    });
  }

  /**
   * Check unlock status for a profile
   */
  static async checkUnlockStatus(profileId) {
    return await apiCall(`/matrimony/unlock-status/${profileId}`, {
      method: "GET",
    });
  }

  /**
   * Unlock a profile
   */
  static async unlockProfile(profileId) {
    return await apiCall(`/matrimony/unlock-profile/${profileId}`, {
      method: "POST",
    });
  }

  /**
   * Get all unlocked profiles
   */
  static async getUnlockedProfiles() {
    return await apiCall("/matrimony/unlocked-profiles", {
      method: "GET",
    });
  }
}

export default MatrimonyProfileService;
