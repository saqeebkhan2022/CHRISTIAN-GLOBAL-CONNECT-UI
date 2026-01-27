// frontend/services/SocketService.js
import { io } from "socket.io-client";
import MatrimonyAuthService from "../auth/MatrimonyAuthService";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

class SocketService {
  static socket = null;
  static listeners = {};

  // Connect to socket server
  static connect() {
    if (this.socket) return this.socket;

    const token = MatrimonyAuthService.getToken();
    if (!token) throw new Error("No auth token found");

    this.socket = io(SOCKET_URL, {
      auth: { token },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    // Socket events
    this.socket.on("connect", () =>
      console.log("Socket connected:", this.socket.id)
    );

    this.socket.on("disconnect", (reason) =>
      console.log("Socket disconnected:", reason)
    );

    // Message received
    this.socket.on("receive_message", (msg) =>
      this.emitEvent("receive_message", msg)
    );
    this.socket.on("new_message", (msg) => this.emitEvent("new_message", msg));

    // Typing indicator
    this.socket.on("user_typing", (data) =>
      this.emitEvent("user_typing", data)
    );

    // Messages marked as read
    this.socket.on("messages_read", (data) =>
      this.emitEvent("messages_read", data)
    );

    // Handle errors
    this.socket.on("error", (err) => console.error("Socket error:", err));

    return this.socket;
  }

  // Disconnect
  static disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.listeners = {};
    }
  }

  // Emit event to backend
  static emit(event, data) {
    if (this.socket) this.socket.emit(event, data);
  }

  // Join a conversation room
  static joinConversation(conversationId) {
    if (this.socket) {
      this.socket.emit("join_conversation", { conversationId });
    }
  }

  // Register local listeners
  static on(event, cb) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(cb);
  }

  // Remove local listener
  static off(event, cb) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter((fn) => fn !== cb);
  }

  // Trigger local listeners
  static emitEvent(event, data) {
    (this.listeners[event] || []).forEach((cb) => cb(data));
  }
}

export default SocketService;
