import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Download, ArrowRight } from "lucide-react";

export default function PaymentSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, transactionId, amount, plan, duration } =
    location.state || {};

  useEffect(() => {
    if (!orderId) {
      navigate("/matrimony/plans");
    }
  }, [orderId, navigate]);

  const handleDownloadReceipt = () => {
    // Receipt download logic would go here
    // For now, we'll just show a message
    alert("Receipt download feature coming soon!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 sm:p-12 text-center border-b border-slate-200">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
              Payment Successful!
            </h1>
            <p className="text-slate-600">
              Your subscription has been activated
            </p>
          </div>

          {/* Content */}
          <div className="p-8 sm:p-12">
            {/* Order Details */}
            <div className="bg-slate-50 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Order Details
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Order ID:</span>
                  <span className="font-mono text-sm text-slate-900 break-all">
                    {orderId}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Transaction ID:</span>
                  <span className="font-mono text-sm text-slate-900 break-all">
                    {transactionId}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Plan:</span>
                  <span className="font-semibold text-slate-900">{plan}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Duration:</span>
                  <span className="font-semibold text-slate-900">
                    {duration} Month{duration > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                  <span className="text-slate-900 font-semibold">Amount:</span>
                  <span className="text-2xl font-bold text-primary">
                    ₹{amount?.toFixed(0)}
                  </span>
                </div>
              </div>
            </div>

            {/* What's Next */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                What's Next?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-blue-900">
                    Your subscription is now active
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-blue-900">
                    You can now view all profiles and send interest requests
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-blue-900">
                    Start messaging your matches
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-blue-900">
                    A confirmation email has been sent to you
                  </span>
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <button
                onClick={handleDownloadReceipt}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-900 rounded-lg hover:bg-slate-200 transition-colors font-semibold"
              >
                <Download className="w-5 h-5" />
                Download Receipt
              </button>
              <button
                onClick={() => navigate("/matrimony")}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold"
              >
                Start Exploring
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Help Text */}
            <div className="text-center text-sm text-slate-600 bg-slate-50 rounded-lg p-4">
              <p>
                Need help? Contact our support team at{" "}
                <a
                  href="mailto:support@cgconnect.com"
                  className="text-primary hover:underline"
                >
                  support@cgconnect.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 text-slate-600">
          <p>Thank you for choosing Christian Global Connect!</p>
          <p className="text-sm mt-2">
            We're excited to help you find your perfect match.
          </p>
        </div>
      </div>
    </div>
  );
}
