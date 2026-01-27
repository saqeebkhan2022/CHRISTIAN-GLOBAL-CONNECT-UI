import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader, Check, AlertCircle } from "lucide-react";
import PaymentService from "../../../services/matrimony/payment/PaymentService";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan, durationMonths } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!plan || !durationMonths) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Invalid Plan
          </h2>
          <p className="text-slate-600 mb-6">
            Please select a plan before proceeding to checkout.
          </p>
          <button
            onClick={() => navigate("/matrimony/plans")}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Plans
          </button>
        </div>
      </div>
    );
  }

  const calculatePrice = () => {
    const basePrice = plan.price;
    const durationConfig = [
      { months: 1, discount: 0 },
      { months: 3, discount: 10 },
      { months: 6, discount: 20 },
    ].find((d) => d.months === durationMonths);

    if (!durationConfig) return basePrice;
    const discount = (basePrice * durationConfig.discount) / 100;
    return basePrice * durationMonths - discount;
  };

  const finalPrice = calculatePrice();
  const discountAmount = plan.price * durationMonths - finalPrice;

  const handlePayment = async () => {
    try {
      setPaymentProcessing(true);
      setError(null);

      // Create order on backend
      const orderResponse = await PaymentService.createRazorpayOrder(
        plan.id,
        durationMonths
      );

      if (!orderResponse.success || !orderResponse.data) {
        throw new Error(orderResponse.message || "Failed to create order");
      }

      const { orderId, amount } = orderResponse.data;
      const user = JSON.parse(localStorage.getItem("matrimonyUser") || "{}");

      // Razorpay payment options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: Math.round(amount * 100), // Convert to paise
        currency: "INR",
        name: "Christian Global Connect",
        description: `${plan.name} - ${durationMonths} Month${
          durationMonths > 1 ? "s" : ""
        }`,
        order_id: orderId,
        handler: async (response) => {
          try {
            // Verify payment on backend
            const verifyResponse = await PaymentService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyResponse.success) {
              // Payment successful
              navigate("/matrimony/payment-success", {
                state: {
                  orderId: response.razorpay_order_id,
                  transactionId: response.razorpay_payment_id,
                  amount: finalPrice,
                  plan: plan.name,
                  duration: durationMonths,
                },
              });
            } else {
              setError(verifyResponse.message || "Payment verification failed");
            }
          } catch (err) {
            setError(err.message || "Payment verification failed");
          } finally {
            setPaymentProcessing(false);
          }
        },
        prefill: {
          name: user.fullName || "",
          email: user.email || "",
          contact: user.phone || "",
        },
        theme: {
          color: "#7A1F3D",
        },
        modal: {
          ondismiss: () => {
            setPaymentProcessing(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      setError(err.message || "Failed to process payment");
      setPaymentProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/matrimony/plans")}
            className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Plans
          </button>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Checkout
          </h1>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Order Summary */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Order Summary
              </h2>

              {/* Plan Details */}
              <div className="border-b border-slate-200 pb-6 mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {plan.name}
                    </h3>
                    <p className="text-slate-600 text-sm mt-1">
                      {durationMonths} Month{durationMonths > 1 ? "s" : ""}{" "}
                      Subscription
                    </p>
                  </div>
                </div>
                <p className="text-slate-600 text-sm">{plan.description}</p>
              </div>

              {/* Plan Features */}
              <div className="mb-6">
                <h4 className="font-semibold text-slate-900 mb-4">
                  What's Included:
                </h4>
                <div className="space-y-2">
                  {typeof plan.features === "string" ? (
                    plan.features.split(",").map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{feature.trim()}</span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">
                          Access to all profiles
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">
                          Send interest requests
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">
                          Unlimited messaging
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </p>
              </div>
            )}
          </div>

          {/* Price Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">
                Price Summary
              </h3>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-600">
                    ₹{plan.price} × {durationMonths} month
                    {durationMonths > 1 ? "s" : ""}
                  </span>
                  <span className="text-slate-900 font-medium">
                    ₹{(plan.price * durationMonths).toFixed(0)}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>
                      Discount (
                      {100 - (finalPrice / (plan.price * durationMonths)) * 100}
                      %)
                    </span>
                    <span>-₹{discountAmount.toFixed(0)}</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-900">
                    Total:
                  </span>
                  <span className="text-3xl font-bold text-primary">
                    ₹{finalPrice.toFixed(0)}
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-2">
                  ₹{(finalPrice / durationMonths).toFixed(0)}/month
                </p>
              </div>

              {/* Security Info */}
              <div className="bg-slate-50 rounded-lg p-3 mb-6">
                <p className="text-xs text-slate-600">
                  ✓ Secure payment powered by Razorpay
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  ✓ Your payment information is encrypted
                </p>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                disabled={paymentProcessing || loading}
                className="w-full py-3 bg-gradient-to-r from-primary to-primary/90 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {paymentProcessing ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>Pay ₹{finalPrice.toFixed(0)}</>
                )}
              </button>

              {/* Terms */}
              <p className="text-xs text-slate-500 text-center mt-4">
                By clicking "Pay", you agree to our Terms of Service and Privacy
                Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
