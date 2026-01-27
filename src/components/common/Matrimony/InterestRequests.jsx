// src/components/common/Matrimony/InterestRequests.jsx
import React, { useState, useEffect } from "react";
import { Heart, X, Check, Loader, Filter, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MatrimonyInterestService from "../../../services/matrimony/interest/InterestService";
import MatrimonyProfileService from "../../../services/matrimony/profile/ProfileService";
import { useSocket } from "../../../contexts/SocketContext";

export default function InterestRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [responding, setResponding] = useState(null);
  const [filterStatus, setFilterStatus] = useState("PENDING"); // PENDING, ACCEPTED, REJECTED, ALL
  const [searchTerm, setSearchTerm] = useState("");
  const socket = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllRequests();

    // Listen for new requests via socket
    if (socket) {
      socket.on("new_interest_request", (data) => {
        setRequests((prev) => [
          {
            id: data.interestId,
            fromUserId: data.fromUserId,
            senderName: data.senderName,
            profilePhotoUrl: data.profilePhotoUrl,
            city: data.city,
            country: data.country,
            status: "PENDING",
            createdAt: new Date().toISOString(),
          },
          ...prev,
        ]);
      });
    }

    return () => {
      if (socket) {
        socket.off("new_interest_request");
      }
    };
  }, [socket]);

  const fetchAllRequests = async () => {
    try {
      setLoading(true);
      setError("");

      // Fetch both pending and accepted requests
      const [pendingResponse, acceptedResponse] = await Promise.all([
        MatrimonyInterestService.getPendingRequests(),
        MatrimonyInterestService.getAcceptedRequests?.() ||
          Promise.resolve({ success: true, data: [] }),
      ]);

      let allRequests = [];

      if (pendingResponse.success) {
        allRequests = allRequests.concat(
          (pendingResponse.data || []).map((req) => ({
            ...req,
            status: "PENDING",
          }))
        );
      }

      if (acceptedResponse.success) {
        allRequests = allRequests.concat(
          (acceptedResponse.data || []).map((req) => ({
            ...req,
            status: "ACCEPTED",
          }))
        );
      }

      setRequests(allRequests);
    } catch (err) {
      setError(err.message || "Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  const handleResponse = async (interestId, action) => {
    try {
      setResponding(interestId);
      const response = await MatrimonyInterestService.respondToInterest(
        interestId,
        action
      );

      if (response.success) {
        setRequests((prev) =>
          prev.map((req) =>
            req.id === interestId
              ? {
                  ...req,
                  status: action === "ACCEPTED" ? "ACCEPTED" : "REJECTED",
                }
              : req
          )
        );
      } else {
        setError(response.message || "Failed to respond");
      }
    } catch (err) {
      setError(err.message || "Failed to respond to request");
    } finally {
      setResponding(null);
    }
  };

  const handleViewProfile = (userId) => {
    navigate(`/matrimony/profile/${userId}`);
  };

  // Filter requests based on status and search term
  const filteredRequests = requests.filter((req) => {
    const matchesStatus = filterStatus === "ALL" || req.status === filterStatus;
    const matchesSearch =
      req.senderName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.city?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const pendingCount = requests.filter((r) => r.status === "PENDING").length;
  const acceptedCount = requests.filter((r) => r.status === "ACCEPTED").length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mb-4"></div>
          <p className="text-slate-600 font-medium">
            Loading interest requests...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-2">
                  <Heart className="w-8 h-8 text-red-500" />
                  Interest Requests
                </h1>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center justify-between">
              <span>{error}</span>
              <button
                onClick={() => setError("")}
                className="text-red-600 hover:text-red-800"
              >
                <X size={20} />
              </button>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              onClick={() => setFilterStatus("PENDING")}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                filterStatus === "PENDING"
                  ? "bg-primary text-white shadow-lg"
                  : "bg-white text-slate-900 hover:shadow-md"
              }`}
            >
              <p className="text-sm opacity-75">Pending</p>
              <p className="text-3xl font-bold">{pendingCount}</p>
            </div>
            <div
              onClick={() => setFilterStatus("ACCEPTED")}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                filterStatus === "ACCEPTED"
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-white text-slate-900 hover:shadow-md"
              }`}
            >
              <p className="text-sm opacity-75">Accepted</p>
              <p className="text-3xl font-bold">{acceptedCount}</p>
            </div>
            <div
              onClick={() => setFilterStatus("ALL")}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                filterStatus === "ALL"
                  ? "bg-slate-600 text-white shadow-lg"
                  : "bg-white text-slate-900 hover:shadow-md"
              }`}
            >
              <p className="text-sm opacity-75">Total</p>
              <p className="text-3xl font-bold">{requests.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Search and Filter */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>

        {/* Empty State */}
        {filteredRequests.length === 0 ? (
          <div className="text-center bg-white rounded-2xl p-12 shadow-lg">
            <div className="mb-4">
              {filterStatus === "PENDING" ? (
                <Heart className="w-16 h-16 text-slate-300 mx-auto" />
              ) : filterStatus === "ACCEPTED" ? (
                <Check className="w-16 h-16 text-green-300 mx-auto" />
              ) : (
                <Filter className="w-16 h-16 text-slate-300 mx-auto" />
              )}
            </div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">
              {filterStatus === "PENDING"
                ? "No Pending Requests"
                : filterStatus === "ACCEPTED"
                ? "No Accepted Requests"
                : "No Requests Found"}
            </h2>
            <p className="text-slate-600">
              {filterStatus === "PENDING"
                ? "When someone sends you an interest request, it will appear here"
                : filterStatus === "ACCEPTED"
                ? "Your accepted requests will appear here"
                : "Try adjusting your filters"}
            </p>
          </div>
        ) : (
          /* Requests Grid */
          <div className="grid gap-6 md:grid-cols-2">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-slate-100"
              >
                {/* Header with Status Badge */}
                <div className="relative h-32 bg-gradient-to-r from-primary/20 to-primary/10">
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        request.status === "PENDING"
                          ? "bg-amber-100 text-amber-800"
                          : request.status === "ACCEPTED"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {request.status}
                    </span>
                  </div>

                  {/* Profile Photo Overlay */}
                  <div className="absolute -bottom-6 left-6">
                    <img
                      src={
                        request.profilePhotoUrl ||
                        `https://ui-avatars.com/api/?name=${request.senderName}&background=7A1F3D&color=fff&size=120`
                      }
                      alt={request.senderName}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="pt-12 px-6 pb-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {request.senderName}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    {request.city}, {request.country}
                  </p>

                  <p className="text-xs text-slate-500 mb-6">
                    Sent{" "}
                    {new Date(request.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>

                  {/* Action Buttons */}
                  {request.status === "PENDING" ? (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleResponse(request.id, "ACCEPTED")}
                        disabled={responding === request.id}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                      >
                        {responding === request.id ? (
                          <Loader size={18} className="animate-spin" />
                        ) : (
                          <Check size={18} />
                        )}
                        Accept
                      </button>
                      <button
                        onClick={() => handleResponse(request.id, "REJECTED")}
                        disabled={responding === request.id}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                      >
                        {responding === request.id ? (
                          <Loader size={18} className="animate-spin" />
                        ) : (
                          <X size={18} />
                        )}
                        Decline
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleViewProfile(request.fromUserId)}
                      className="w-full px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-medium"
                    >
                      View Profile
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
