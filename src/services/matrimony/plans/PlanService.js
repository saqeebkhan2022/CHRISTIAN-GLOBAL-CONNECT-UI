import apiCall from "../apiClient";

class MatrimonyPlanService {
  /**
   * Get all available plans
   */
  static async getPlans() {
    return await apiCall("/matrimony/plans", {
      method: "GET",
    });
  }

  /**
   * Get user's current subscription
   */
  static async getSubscription() {
    return await apiCall("/matrimony/subscription", {
      method: "GET",
    });
  }

  /**
   * Subscribe to a plan
   */
  static async subscribe(planId, paymentMethod = "CREDIT_CARD") {
    return await apiCall("/matrimony/subscribe", {
      method: "POST",
      body: JSON.stringify({ planId, paymentMethod }),
    });
  }

  /**
   * Cancel subscription
   */
  static async cancelSubscription(cancellationReason = "") {
    return await apiCall("/matrimony/subscription/cancel", {
      method: "PATCH",
      body: JSON.stringify({ cancellationReason }),
    });
  }

  /**
   * Renew subscription
   */
  static async renewSubscription() {
    return await apiCall("/matrimony/subscription/renew", {
      method: "POST",
    });
  }

  /**
   * Get payment history
   */
  static async getPaymentHistory(limit = 10, offset = 0) {
    return await apiCall(
      `/matrimony/payments?limit=${limit}&offset=${offset}`,
      {
        method: "GET",
      }
    );
  }

  /**
   * Get plan features
   */
  static async getPlanFeatures(planId) {
    return await apiCall(`/matrimony/plans/${planId}/features`, {
      method: "GET",
    });
  }
}

export default MatrimonyPlanService;
