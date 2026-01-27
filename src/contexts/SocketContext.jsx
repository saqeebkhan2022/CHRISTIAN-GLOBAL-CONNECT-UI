// src/contexts/SocketContext.jsx
import React, { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import MatrimonyMessagingService from "../services/matrimony/messages/MatrimonyMessageService";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);

  useEffect(() => {
    // Prevent double connection
    if (socketRef.current) {
      return;
    }

    const token = localStorage.getItem("matrimonyToken");
    if (!token) {
      return;
    }

    const socketUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const socket = io(socketUrl, {
      auth: { token },
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      MatrimonyMessagingService.setSocket(socket);
    });

    socket.on("disconnect", (reason) => {
      // Handle disconnect silently
    });

    socket.on("connect_error", (err) => {
      // Handle connection error silently
    });

    socket.on("reconnect_attempt", () => {
      // Handle reconnection attempt silently
    });

    socket.on("reconnect", () => {
      MatrimonyMessagingService.setSocket(socket);
    });

    // Attach socket to MessagingService
    MatrimonyMessagingService.setSocket(socket);

    // Socket stays open until logout
    return () => {
      // Cleanup on provider unmount
    };
  }, []);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

// Optional hook (if you need raw socket)
export const useSocket = () => {
  return useContext(SocketContext);
};
