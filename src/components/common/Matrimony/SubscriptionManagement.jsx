import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  Loader,
  ArrowRight,
  X,
} from "lucide-react";
import PaymentService from "../../../services/matrimony/payment/PaymentService";

export default function SubscriptionManagement() {
  const [subscription, setSubscription] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [canceling, setCanceling] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  const fetchSubscriptionData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [subResponse, paymentResponse] = await Promise.all([
        PaymentService.getCurrentSubscription(),
        PaymentService.getPaymentHistory(),
      ]);

      if (subResponse.success) {
        setSubscription(subResponse.data);
      }
      if (paymentResponse.success) {
        setPaymentHistory(paymentResponse.data || []);
      }
    } catch (err) {
      setError(err.message || "Failed to load subscription data");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      setCanceling(true);
      const response = await PaymentService.cancelSubscription();
      if (response.success) {
        setSubscription(null);
        setCancelDialogOpen(false);
      } else {
        setError(response.message || "Failed to cancel subscription");
      }
    } catch (err) {
      setError(err.message || "Failed to cancel subscription");
    } finally {
      setCanceling(false);
    }
  };

  const getSubscriptionStatus = (status) => {
    switch (status?.toUpperCase()) {
      case "ACTIVE":
        return { color: "text-green-600", bg: "bg-green-50", label: "Active" };
      case "EXPIRED":
        return { color: "text-red-600", bg: "bg-red-50", label: "Expired" };
      case "CANCELLED":
        return { color: "text-gray-600", bg: "bg-gray-50", label: "Cancelled" };
      case "PENDING":
        return {
          color: "text-yellow-600",
          bg: "bg-yellow-50",
          label: "Pending",
        };
      default:
        return { color: "text-slate-600", bg: "bg-slate-50", label: status };
    }
  };

  const getPaymentStatus = (status) => {
    switch (status?.toUpperCase()) {
      case "SUCCESS":
        return {
          icon: CheckCircle,
          color: "text-green-600",
          label: "Successful",
        };
      case "FAILED":
        return { icon: X, color: "text-red-600", label: "Failed" };
      case "PENDING":
        return { icon: Clock, color: "text-yellow-600", label: "Pending" };
      default:
        return { icon: CreditCard, color: "text-slate-600", label: status };
    }
  };

  const isSubscriptionActive = subscription?.status?.toUpperCase() === "ACTIVE";
  const daysRemaining = subscription
    ? Math.ceil(
        (new Date(subscription.endDate) - new Date()) / (1000 * 60 * 60 * 24)
      )
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <Loader className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
          <p className="text-slate-600 font-medium">
            Loading your subscription...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Subscription Management
          </h1>
          <p className="text-slate-600">
            Manage your plan and view payment history
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900">Error</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Current Subscription */}
          <div className="lg:col-span-2">
            {subscription ? (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Status Header */}
                <div
                  className={`p-6 sm:p-8 ${
                    getSubscriptionStatus(subscription.status).bg
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p
                        className={`text-sm font-semibold uppercase tracking-wider ${
                          getSubscriptionStatus(subscription.status).color
                        }`}
                      >
                        {getSubscriptionStatus(subscription.status).label}
                      </p>
                      <h2 className="text-3xl font-bold text-slate-900 mt-2">
                        {subscription.planName || "Premium Plan"}
                      </h2>
                    </div>
                    <CreditCard
                      className={`w-12 h-12 ${
                        getSubscriptionStatus(subscription.status).color
                      }`}
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 sm:p-8">
                  <div className="grid sm:grid-cols-2 gap-6 mb-8">
                    <div>
                      <p className="text-slate-600 text-sm font-medium mb-2">
                        Start Date
                      </p>
                      <p className="text-lg font-semibold text-slate-900">
                        {new Date(subscription.startDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-600 text-sm font-medium mb-2">
                        End Date
                      </p>
                      <p className="text-lg font-semibold text-slate-900">
                        {new Date(subscription.endDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-600 text-sm font-medium mb-2">
                        Duration
                      </p>
                      <p className="text-lg font-semibold text-slate-900">
                        {subscription.durationMonths} Month
                        {subscription.durationMonths > 1 ? "s" : ""}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-600 text-sm font-medium mb-2">
                        Amount Paid
                      </p>
                      <p className="text-lg font-semibold text-primary">
                        ₹{subscription.amount?.toFixed(0)}
                      </p>
                    </div>
                  </div>

                  {/* Days Remaining */}
                  {isSubscriptionActive && daysRemaining > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                      <p className="text-blue-900">
                        <span className="font-bold text-lg">
                          {daysRemaining}
                        </span>{" "}
                        days remaining on your current plan
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-4 flex-wrap">
                    <button
                      onClick={() => navigate("/matrimony/plans")}
                      className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold flex items-center gap-2"
                    >
                      Upgrade Plan
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    {isSubscriptionActive && (
                      <button
                        onClick={() => setCancelDialogOpen(true)}
                        className="px-6 py-3 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors font-semibold"
                      >
                        Cancel Subscription
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
                <CreditCard className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  No Active Subscription
                </h2>
                <p className="text-slate-600 mb-6">
                  Get started with a plan to unlock premium features
                </p>
                <button
                  onClick={() => navigate("/matrimony/plans")}
                  className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold inline-flex items-center gap-2"
                >
                  Browse Plans
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <p className="text-slate-600 text-sm font-medium mb-2">Status</p>
              <p
                className={`text-2xl font-bold ${
                  isSubscriptionActive ? "text-green-600" : "text-slate-600"
                }`}
              >
                {isSubscriptionActive ? "Active" : "Inactive"}
              </p>
              <p className="text-xs text-slate-500 mt-2">
                {isSubscriptionActive
                  ? "Your subscription is running"
                  : "No active subscription"}
              </p>
            </div>

            {/* Plan Type Card */}
            {subscription && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <p className="text-slate-600 text-sm font-medium mb-2">
                  Plan Type
                </p>
                <p className="text-2xl font-bold text-primary">
                  {subscription.planType || "Premium"}
                </p>
                <p className="text-xs text-slate-500 mt-2">Current plan type</p>
              </div>
            )}

            {/* Last Payment Card */}
            {paymentHistory.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <p className="text-slate-600 text-sm font-medium mb-2">
                  Last Payment
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  ₹{paymentHistory[0].amount?.toFixed(0)}
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  {new Date(paymentHistory[0].createdAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Payment History */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Payment History
          </h2>
          {paymentHistory.length > 0 ? (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                        Plan
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                        Transaction ID
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentHistory.map((payment) => {
                      const statusInfo = getPaymentStatus(payment.status);
                      const Icon = statusInfo.icon;
                      return (
                        <tr
                          key={payment.id}
                          className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                        >
                          <td className="px-6 py-4 text-sm text-slate-900">
                            {new Date(payment.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-900 font-medium">
                            {payment.planName || "N/A"}
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold text-primary">
                            ₹{payment.amount?.toFixed(0)}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Icon className={`w-4 h-4 ${statusInfo.color}`} />
                              <span
                                className={`font-medium ${statusInfo.color}`}
                              >
                                {statusInfo.label}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600 font-mono text-xs">
                            {payment.transactionId || "-"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600">No payment history</p>
            </div>
          )}
        </div>
      </div>

      {/* Cancel Subscription Dialog */}
      {cancelDialogOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Cancel Subscription?
            </h2>
            <p className="text-slate-600 mb-6">
              Are you sure you want to cancel your subscription? You'll lose
              access to premium features at the end of your billing period.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setCancelDialogOpen(false)}
                className="flex-1 px-4 py-2 bg-slate-100 text-slate-900 rounded-lg hover:bg-slate-200 transition-colors font-semibold"
              >
                Keep Subscription
              </button>
              <button
                onClick={handleCancelSubscription}
                disabled={canceling}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {canceling ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Canceling...
                  </>
                ) : (
                  "Yes, Cancel"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
