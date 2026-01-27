import apiClient from "../apiClient";

class NotificationService {
  /**
   * Fetch all notifications for the current user
   */
  static async getNotifications(limit = 20, offset = 0) {
    try {
      const response = await apiClient.get(
        `/api/notifications?limit=${limit}&offset=${offset}`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  /**
   * Fetch unread notification count
   */
  static async getUnreadCount() {
    try {
      const response = await apiClient.get("/api/notifications/unread/count");
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  /**
   * Mark a notification as read
   */
  static async markAsRead(notificationId) {
    try {
      const response = await apiClient.put(
        `/api/notifications/${notificationId}/read`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  /**
   * Mark all notifications as read
   */
  static async markAllAsRead() {
    try {
      const response = await apiClient.put("/api/notifications/read/all");
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  /**
   * Delete a notification
   */
  static async deleteNotification(notificationId) {
    try {
      const response = await apiClient.delete(
        `/api/notifications/${notificationId}`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  /**
   * Fetch interest-related notifications
   */
  static async getInterestNotifications() {
    try {
      const response = await apiClient.get("/api/notifications/type/interest");
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  /**
   * Fetch message-related notifications
   */
  static async getMessageNotifications() {
    try {
      const response = await apiClient.get("/api/notifications/type/message");
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
}

export default NotificationService;
