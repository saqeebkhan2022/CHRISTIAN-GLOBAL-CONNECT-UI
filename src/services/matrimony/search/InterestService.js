import apiCall from "../apiClient";

class MatrimonyInterestService {
  /**
   * Send interest to profile
   */
  static async sendInterest(toUserId, message = "", interestType = "INTEREST") {
    return await apiCall("/matrimony/interests", {
      method: "POST",
      body: { toUserId, message, interestType },
    });
  }

  /**
   * Accept interest
   */
  static async acceptInterest(interestId) {
    return await apiCall(`/matrimony/interests/${interestId}`, {
      method: "PATCH",
      body: JSON.stringify({ status: "ACCEPTED" }),
    });
  }

  /**
   * Reject interest
   */
  static async rejectInterest(interestId) {
    return await apiCall(`/matrimony/interests/${interestId}`, {
      method: "PATCH",
      body: JSON.stringify({ status: "REJECTED" }),
    });
  }

  /**
   * Get received interests
   */
  static async getReceivedInterests(status = null) {
    const url = status
      ? `/matrimony/interests/received?status=${status}`
      : "/matrimony/interests/received";

    return await apiCall(url, {
      method: "GET",
    });
  }

  /**
   * Get sent interests
   */
  static async getSentInterests(status = null) {
    const url = status
      ? `/matrimony/interests/sent?status=${status}`
      : "/matrimony/interests/sent";

    return await apiCall(url, {
      method: "GET",
    });
  }

  /**
   * Withdraw interest
   */
  static async withdrawInterest(interestId) {
    return await apiCall(`/matrimony/interests/${interestId}`, {
      method: "DELETE",
    });
  }

  /**
   * Get matches (mutual interests)
   */
  static async getMatches() {
    return await apiCall("/matrimony/matches", {
      method: "GET",
    });
  }
}

export default MatrimonyInterestService;
