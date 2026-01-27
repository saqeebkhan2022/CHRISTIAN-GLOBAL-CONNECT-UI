import React, { useEffect, useRef, useState } from "react";
import { Send, X, User, Clock, MessageCircle } from "lucide-react";
import MatrimonyMessagingService from "../../../services/matrimony/messages/MatrimonyMessageService";
import MatrimonyProfileService from "../../../services/matrimony/profile/ProfileService";

export default function MessageDrawer({ profileId, otherUserId, onClose }) {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(true);
  const [typing, setTyping] = useState(false);
  const [otherProfile, setOtherProfile] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const bottomRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const currentUserId = MatrimonyMessagingService.getCurrentUserId();

  useEffect(() => {
    const checkConnection = () => {
      const isConnected = MatrimonyMessagingService.socket?.connected;
      setSocketConnected(isConnected || false);
    };

    checkConnection();
    const interval = setInterval(checkConnection, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!otherUserId) return;

    const setupChat = async () => {
      setLoading(true);
      try {
        if (!MatrimonyMessagingService.socket) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        if (!MatrimonyMessagingService.socket?.connected) {
          if (MatrimonyMessagingService.isConnected) {
            await MatrimonyMessagingService.isConnected;
          }
        }

        const conversationId = [
          MatrimonyMessagingService.getCurrentUserId(),
          otherUserId,
        ]
          .sort()
          .join("_");

        await MatrimonyMessagingService.joinConversation(conversationId);

        const history = await MatrimonyMessagingService.getConversationHistory(
          otherUserId
        );

        if (history?.success) {
          setMessages(history.data?.map(normalizeMessage) || []);
        } else {
          setMessages([]);
        }

        const profile = await MatrimonyProfileService.getProfile(profileId);
        if (profile?.success) setOtherProfile(profile.data);

        MatrimonyMessagingService.on("receive_message", handleIncomingMessage);
        MatrimonyMessagingService.on("user_typing", handleTyping);
      } catch (err) {
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    setupChat();

    return () => {
      MatrimonyMessagingService.off("receive_message", handleIncomingMessage);
      MatrimonyMessagingService.off("user_typing", handleTyping);
    };
  }, [otherUserId, profileId]);

  const handleIncomingMessage = (msg) => {
    if (msg.toUserId !== currentUserId && msg.fromUserId !== currentUserId) {
      return;
    }

    const isFromOther =
      msg.fromUserId === otherUserId && msg.toUserId === currentUserId;
    const isFromMe =
      msg.fromUserId === currentUserId && msg.toUserId === otherUserId;

    if (!isFromOther && !isFromMe) {
      return;
    }

    setMessages((prev) => {
      const exists = prev.some(
        (m) =>
          m.id === msg.id ||
          m.id === `temp-${msg.timestamp}` ||
          (m.id === `temp-${Date.now()}` &&
            m.content === msg.content &&
            m.isMine === (msg.fromUserId === currentUserId))
      );
      if (exists) {
        return prev;
      }

      return [...prev, normalizeMessage(msg)];
    });
  };

  const handleTyping = () => {
    setTyping(true);
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => setTyping(false), 1500);
  };

  const normalizeMessage = (msg) => ({
    id: msg.id,
    content: msg.messageText || msg.content,
    isMine: msg.fromUserId === currentUserId,
    createdAt: msg.createdAt,
  });

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!messageText.trim() || isSending) return;

    setIsSending(true);
    const tempId = `temp-${Date.now()}`;
    const optimisticMessage = {
      id: tempId,
      content: messageText,
      isMine: true,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, optimisticMessage]);
    setMessageText("");

    try {
      await MatrimonyMessagingService.sendMessage(
        otherUserId,
        messageText,
        `${currentUserId}_${otherUserId}`
      );
    } catch (err) {
      setMessages((prev) =>
        prev.filter((m) => m.id !== tempId && m.content !== messageText)
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {/* Backdrop - Only on mobile */}
      <div
        className="fixed inset-0 bg-black/50 z-40 sm:hidden"
        onClick={onClose}
      />

      {/* Drawer Modal - Bottom-right like Facebook */}
      <div className="fixed bottom-0 right-0 top-0 sm:bottom-4 sm:right-4 sm:top-auto w-full sm:w-96 max-w-2xl bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl z-50 flex flex-col h-full sm:h-[600px]">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 p-4 sm:p-6 flex items-center justify-between rounded-t-3xl sm:rounded-t-2xl sticky top-0 z-10">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center text-white">
              {otherProfile?.profilePhotoUrl ? (
                <img
                  src={otherProfile.profilePhotoUrl}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User size={20} />
              )}
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-white text-base sm:text-lg truncate">
                {otherProfile?.user?.firstName} {otherProfile?.user?.lastName}
              </h3>
              <p className="text-xs sm:text-sm text-white/70 flex items-center gap-1 mt-1">
                <span
                  className={`w-2 h-2 rounded-full ${
                    socketConnected ? "bg-green-400" : "bg-gray-400"
                  }`}
                ></span>
                {socketConnected ? "Active" : "Offline"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
          >
            <X size={20} />
          </button>
        </div>{" "}
        {/* Messages */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50">
          {loading ? (
            <div className="flex justify-center pt-10">
              <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <MessageCircle className="w-16 h-16 text-slate-200 mb-4" />
              <p className="text-slate-500 font-medium">No messages yet</p>
              <p className="text-slate-400 text-sm mt-1">
                Start a conversation
              </p>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.isMine ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs sm:max-w-sm px-3 sm:px-4 py-2 sm:py-3 rounded-2xl text-sm shadow-sm ${
                      msg.isMine
                        ? "bg-primary text-white rounded-br-none"
                        : "bg-white text-slate-800 rounded-bl-none border border-slate-200"
                    }`}
                  >
                    <p className="leading-relaxed break-words">{msg.content}</p>
                    <div
                      className={`text-xs flex justify-end gap-1 opacity-70 mt-2 ${
                        msg.isMine ? "text-white" : "text-slate-500"
                      }`}
                    >
                      <Clock size={10} className="mt-0.5" />
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-white px-3 sm:px-4 py-2 sm:py-3 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </>
          )}
        </main>
        {/* Input */}
        <div className="border-t border-slate-200 bg-white p-4 sm:p-6 rounded-bl-3xl sticky bottom-0">
          <div className="flex items-end gap-2 sm:gap-3">
            <textarea
              rows={1}
              value={messageText}
              onChange={(e) => {
                setMessageText(e.target.value);
                MatrimonyMessagingService.sendTyping(otherUserId);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Type a message..."
              className="flex-1 resize-none bg-slate-100 rounded-2xl px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
            />
            <button
              onClick={sendMessage}
              disabled={!messageText.trim() || isSending}
              className="p-2 sm:p-3 bg-primary text-white rounded-full hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex-shrink-0"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
