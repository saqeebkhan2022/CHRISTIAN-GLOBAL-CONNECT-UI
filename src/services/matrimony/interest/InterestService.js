// src/services/matrimony/interest/InterestService.js
import apiCall from "../apiClient";

class MatrimonyInterestService {
  static async sendInterest(toUserId, message = "") {
    try {
      return await apiCall("/matrimony/interests/send", {
        method: "POST",
        body: { toUserId, message },
      });
    } catch (error) {
      console.error("Error sending interest:", error);
      throw error;
    }
  }

  static async respondToInterest(interestId, action) {
    try {
      return await apiCall("/matrimony/interests/respond", {
        method: "POST",
        body: { interestId, action },
      });
    } catch (error) {
      console.error("Error responding to interest:", error);
      throw error;
    }
  }

  static async getPendingRequests() {
    try {
      return await apiCall("/matrimony/interests/pending", {
        method: "GET",
      });
    } catch (error) {
      console.error("Error fetching pending requests:", error);
      throw error;
    }
  }

  static async getSentRequests() {
    try {
      return await apiCall("/matrimony/interests/sent", {
        method: "GET",
      });
    } catch (error) {
      console.error("Error fetching sent requests:", error);
      throw error;
    }
  }

  static async getMatches() {
    try {
      return await apiCall("/matrimony/interests/matches", {
        method: "GET",
      });
    } catch (error) {
      console.error("Error fetching matches:", error);
      throw error;
    }
  }
}

export default MatrimonyInterestService;
