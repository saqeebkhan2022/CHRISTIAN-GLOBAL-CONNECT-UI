import apiCall from "../apiClient";

class MatrimonySearchService {
  /**
   * Search profiles with filters
   */
  static async searchProfiles(filters = {}, page = 1, limit = 20) {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    params.append("page", page);
    params.append("limit", limit);

    return await apiCall(`/matrimony/search?${params.toString()}`, {
      method: "GET",
    });
  }

  /**
   * Get matching profiles
   */
  static async getMatches(page = 1, limit = 50) {
    return await apiCall(`/matrimony/matches?page=${page}&limit=${limit}`, {
      method: "GET",
    });
  }

  /**
   * Get filter options
   */
  static async getFilterOptions() {
    return await apiCall("/matrimony/filters", {
      method: "GET",
    });
  }

  /**
   * Save search filter
   */
  static async saveSearchFilter(filterName, filters) {
    return await apiCall("/matrimony/saved-filters", {
      method: "POST",
      body: JSON.stringify({ filterName, filters }),
    });
  }

  /**
   * Get saved filters
   */
  static async getSavedFilters() {
    return await apiCall("/matrimony/saved-filters", {
      method: "GET",
    });
  }

  /**
   * Delete saved filter
   */
  static async deleteSavedFilter(filterId) {
    return await apiCall(`/matrimony/saved-filters/${filterId}`, {
      method: "DELETE",
    });
  }
}

export default MatrimonySearchService;
