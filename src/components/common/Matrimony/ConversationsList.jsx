import React, { useEffect, useState } from "react";
import { MessageCircle, X, Search, Clock, Check } from "lucide-react";
import MatrimonyMessagingService from "../../../services/matrimony/messages/MatrimonyMessageService";
import MatrimonyProfileService from "../../../services/matrimony/profile/ProfileService";
import MessageDrawer from "./Messages";

export default function ConversationsList() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    fetchConversations();

    // Listen for online status updates via socket
    if (MatrimonyMessagingService.socket) {
      MatrimonyMessagingService.socket.on("user_online", (userId) => {
        setOnlineUsers((prev) => new Set([...prev, userId]));
      });

      MatrimonyMessagingService.socket.on("user_offline", (userId) => {
        setOnlineUsers((prev) => {
          const updated = new Set(prev);
          updated.delete(userId);
          return updated;
        });
      });
    }

    const interval = setInterval(fetchConversations, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const response = await MatrimonyMessagingService.getConversations();

      if (response?.success && response.data) {
        // Fetch profile details for each conversation
        const conversationsWithProfiles = await Promise.all(
          response.data
            .filter((conv) => conv.userId) // Filter out undefined userIds
            .map(async (conv) => {
              try {
                // Get profile for the other user
                const profileResponse =
                  await MatrimonyProfileService.getProfile(conv.userId);
                return {
                  ...conv,
                  otherUserId: conv.userId, // Ensure otherUserId is set
                  profileId: conv.userId,
                  profile: profileResponse.data,
                };
              } catch (err) {
                return {
                  ...conv,
                  otherUserId: conv.userId,
                  profileId: conv.userId,
                  profile: null,
                };
              }
            })
        );

        // Sort by online status (online first), then by last message time
        const sorted = conversationsWithProfiles.sort((a, b) => {
          const aOnline = onlineUsers.has(a.otherUserId);
          const bOnline = onlineUsers.has(b.otherUserId);

          if (aOnline !== bOnline) {
            return bOnline ? 1 : -1; // Online users at bottom
          }

          const aTime = new Date(a.lastMessageTime).getTime();
          const bTime = new Date(b.lastMessageTime).getTime();
          return bTime - aTime;
        });

        setConversations(sorted);
      }
    } catch (err) {
      // Handle error silently
    } finally {
      setLoading(false);
    }
  };

  const filteredConversations = conversations.filter((conv) => {
    const name = `${conv.profile?.user?.firstName || ""} ${
      conv.profile?.user?.lastName || ""
    }`.toLowerCase();
    return name.includes(searchTerm.toLowerCase());
  });

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedConversation(null);
    fetchConversations(); // Refresh list after closing
  };

  if (loading && conversations.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <MessageCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">Loading conversations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 p-4 text-white sticky top-0 z-10">
        <h2 className="text-xl font-bold mb-3">Messages</h2>
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-white/60" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/20 text-white placeholder-white/60 pl-10 pr-4 py-2 rounded-lg focus:bg-white/30 transition-all outline-none"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="p-6 text-center">
            <MessageCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">
              {conversations.length === 0
                ? "No conversations yet"
                : "No matches found"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredConversations.map((conversation) => {
              const isOnline = onlineUsers.has(conversation.otherUserId);
              const profile = conversation.profile;
              const firstName = profile?.user?.firstName || "User";
              const lastName = profile?.user?.lastName || "";
              const photoUrl = profile?.profilePhoto?.photoUrl;

              return (
                <button
                  key={conversation.otherUserId}
                  onClick={() => handleSelectConversation(conversation)}
                  className="w-full p-4 hover:bg-slate-50 transition-colors text-left border-l-4 border-transparent hover:border-primary"
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={
                          photoUrl ||
                          `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=7A1F3D&color=fff`
                        }
                        alt={firstName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>

                    {/* Conversation Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold text-slate-900 truncate">
                          {firstName} {lastName}
                        </h3>
                        <span className="text-xs text-slate-500 flex-shrink-0">
                          {new Date(
                            conversation.lastMessageTime
                          ).toLocaleDateString()}
                        </span>
                      </div>

                      {/* Last Message Preview */}
                      <p className="text-sm text-slate-600 truncate mt-1">
                        {conversation.lastMessage ||
                          "No messages yet. Start a conversation!"}
                      </p>

                      {/* Status Indicator */}
                      <div className="flex items-center gap-1 mt-2">
                        {isOnline ? (
                          <span className="inline-flex items-center gap-1 text-xs text-green-600">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            Online
                          </span>
                        ) : (
                          <span className="text-xs text-slate-500">
                            Offline
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Unread Indicator */}
                    {conversation.unreadCount > 0 && (
                      <div className="w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-bold">
                        {conversation.unreadCount}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Message Drawer */}
      {isDrawerOpen && selectedConversation && (
        <MessageDrawer
          profileId={selectedConversation.profileId}
          otherUserId={selectedConversation.otherUserId}
          onClose={handleCloseDrawer}
        />
      )}
    </div>
  );
}
