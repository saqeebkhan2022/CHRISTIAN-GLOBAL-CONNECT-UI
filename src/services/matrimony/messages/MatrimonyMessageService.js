import apiCall from "../apiClient";

class MatrimonyMessagingService {
  static socket = null; // Will be set from SocketContext
  static listeners = {};
  static isConnected = null;

  // Initialize with the socket from SocketContext
  static setSocket(socketInstance) {
    // If we already have this exact socket, skip
    if (this.socket && this.socket.id === socketInstance.id) {
      console.log("📡 [MessagingService] Socket already set with same ID");
      return;
    }

    // Remove old listeners if socket was previously set
    if (this.socket) {
      console.log("📡 [MessagingService] Replacing old socket instance");
      this.socket.off("receive_message");
      this.socket.off("messages_read");
      this.socket.off("message_deleted");
      this.socket.off("user_typing");
      this.socket.off("error");
    }

    console.log("📡 [MessagingService] Socket instance set");
    this.socket = socketInstance;

    if (!socketInstance) return;

    // Setup listeners on the socket
    this.isConnected = new Promise((resolve) => {
      if (socketInstance.connected) {
        console.log("✓ Socket already connected");
        resolve(true);
      } else {
        socketInstance.on("connect", () => {
          console.log(
            "✓ [MessagingService] Socket connected via SocketContext"
          );
          resolve(true);
        });
      }
    });

    socketInstance.on("disconnect", () => {
      console.log("🔴 Socket disconnected");
    });

    // Message event - CRITICAL: Register immediately when socket is set
    console.log(
      "🔌 [MessagingService] Registering socket.io event listeners..."
    );

    socketInstance.on("receive_message", (message) => {
      console.log("📨 [Socket.IO EVENT] receive_message fired with:", message);
      console.log("   Forwarding to local listeners...");
      this.emit("receive_message", message);
    });

    socketInstance.on("messages_read", (data) => {
      console.log("✓ Messages read:", data);
      this.emit("messages_read", data);
    });

    socketInstance.on("message_deleted", (data) => {
      console.log("🗑️ Message deleted:", data);
      this.emit("message_deleted", data);
    });

    socketInstance.on("user_typing", (data) => {
      console.log("✍️ User typing:", data);
      this.emit("user_typing", data);
    });

    socketInstance.on("error", (error) => {
      console.error("❌ Socket error:", error);
      this.emit("error", error);
    });

    console.log("✅ [MessagingService] All socket event listeners registered");
  }

  // For backward compatibility - if SocketContext hasn't set it yet
  static initializeSocket() {
    console.warn(
      "⚠️ initializeSocket called but socket should be set via setSocket from SocketContext"
    );
    return this.socket;
  }

  static async joinConversation(conversationId) {
    if (!this.socket) this.initializeSocket();
    if (!this.socket) return;

    // Wait for socket connection to be ready
    if (this.isConnected) await this.isConnected;

    this.socket.emit("join_conversation", { conversationId });
    console.log(`✓ Joined conversation: ${conversationId}`);
  }

  static async sendMessage(toUserId, content) {
    if (!toUserId || !content) {
      throw new Error("toUserId and content are required");
    }

    if (!this.socket || !this.socket.connected) {
      throw new Error("Socket not connected");
    }

    try {
      console.log(
        `📤 [WebSocket] Sending message to ${toUserId}: "${content}"`
      );

      return new Promise((resolve, reject) => {
        // Emit via Socket.IO
        this.socket.emit("send_message", {
          toUserId,
          content,
          conversationId: [this.getCurrentUserId(), toUserId].sort().join("_"),
        });

        // Wait for confirmation (message_sent event)
        const handleConfirmation = (response) => {
          console.log("✓ Message confirmed by server:", response);
          this.socket.off("message_sent", handleConfirmation);
          resolve(response);
        };

        const handleError = (error) => {
          console.error("✗ Message failed:", error);
          this.socket.off("error", handleError);
          reject(error);
        };

        this.socket.once("message_sent", handleConfirmation);
        this.socket.once("error", handleError);

        // Timeout after 10 seconds
        setTimeout(() => {
          this.socket.off("message_sent", handleConfirmation);
          this.socket.off("error", handleError);
          reject(new Error("Message send timeout"));
        }, 10000);
      });
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }

  static async getConversation(otherUserId, limit = 50, offset = 0) {
    try {
      const response = await apiCall(
        `/matrimony/messaging/conversation/${otherUserId}?limit=${limit}&offset=${offset}`,
        { method: "GET" }
      );
      console.log("✓ Conversation fetched:", response);
      return response;
    } catch (error) {
      console.error("Error fetching conversation:", error);
      throw error;
    }
  }

  static async getConversations() {
    try {
      const response = await apiCall("/matrimony/messaging/conversations", {
        method: "GET",
      });
      console.log("✓ Conversations fetched:", response);
      return response;
    } catch (error) {
      console.error("Error fetching conversations:", error);
      throw error;
    }
  }

  static async markAsRead(otherUserId) {
    try {
      const response = await apiCall("/matrimony/messaging/mark-read", {
        method: "POST",
        body: { otherUserId },
      });
      console.log("✓ Marked as read:", response);
      return response;
    } catch (error) {
      console.error("Error marking as read:", error);
      throw error;
    }
  }

  static async deleteMessage(messageId) {
    try {
      const response = await apiCall(`/matrimony/messaging/${messageId}`, {
        method: "DELETE",
      });
      console.log("✓ Message deleted:", response);
      return response;
    } catch (error) {
      console.error("Error deleting message:", error);
      throw error;
    }
  }

  static async checkMessagingAccess() {
    try {
      const response = await apiCall("/matrimony/messaging/access/check", {
        method: "GET",
      });
      console.log("✓ Access checked:", response);
      return response;
    } catch (error) {
      console.error("Error checking access:", error);
      throw error;
    }
  }

  static sendTyping(otherUserId) {
    if (this.socket) {
      this.socket.emit("typing", { toUserId: otherUserId });
    }
  }

  static disconnect() {
    if (this.socket) {
      console.log("🔌 [MessagingService] Disconnecting socket...");
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = null;
      this.listeners = {};
      console.log("✅ Socket disconnected and cleared");
    }
  }

  static on(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
    console.log(
      `✓ Listener registered for event: ${event}, total: ${this.listeners[event].length}`
    );
  }

  static off(event, callback) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(
      (cb) => cb !== callback
    );
    console.log(
      `✓ Listener removed for event: ${event}, remaining: ${this.listeners[event].length}`
    );
  }

  static emit(event, data) {
    const listenerCount = this.listeners[event]?.length || 0;
    console.log(
      `🔔 [LocalEmit] event: ${event}, calling ${listenerCount} listener(s)`
    );
    if (!this.listeners[event]) {
      console.warn(`   ⚠️ No listeners registered for event: ${event}`);
      return;
    }
    this.listeners[event].forEach((cb, index) => {
      console.log(`   → Calling listener ${index + 1}/${listenerCount}`);
      cb(data);
    });
  }

  static getCurrentUserId() {
    const user = localStorage.getItem("matrimonyUser");
    if (!user) return null;
    try {
      return JSON.parse(user).id || null;
    } catch (e) {
      return null;
    }
  }

  // Alias for backward compatibility
  static async getConversationHistory(otherUserId) {
    return this.getConversation(otherUserId);
  }
}

export default MatrimonyMessagingService;
