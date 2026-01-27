import apiCall from "../apiClient";

class PaymentService {
  static async getPlans() {
    return apiCall("/matrimony/plans", {
      method: "GET",
    });
  }

  static async getPlanById(planId) {
    return apiCall(`/matrimony/plans/${planId}`, {
      method: "GET",
    });
  }

  static async createRazorpayOrder(planId, durationMonths) {
    return apiCall("/matrimony/payments/create-order", {
      method: "POST",
      body: { planId, durationMonths },
    });
  }

  static async verifyPayment(paymentData) {
    return apiCall("/matrimony/payments/verify-payment", {
      method: "POST",
      body: paymentData,
    });
  }

  static async getCurrentSubscription() {
    return apiCall("/matrimony/subscriptions/current", {
      method: "GET",
    });
  }

  static async getSubscriptionHistory() {
    return apiCall("/matrimony/subscriptions/history", {
      method: "GET",
    });
  }

  static async cancelSubscription() {
    return apiCall("/matrimony/subscriptions/cancel", {
      method: "POST",
    });
  }

  static async getPaymentHistory() {
    return apiCall("/matrimony/payments/history", {
      method: "GET",
    });
  }
}

export default PaymentService;
