import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check, X, Zap, Gift, Crown, ArrowRight, Loader } from "lucide-react";
import PaymentService from "../../../services/matrimony/payment/PaymentService";

export default function PlansPage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(1); // 1, 3, or 6 months
  const navigate = useNavigate();

  const durations = [
    { months: 1, label: "1 Month", discount: 0 },
    { months: 3, label: "3 Months", discount: 10 },
    { months: 6, label: "6 Months", discount: 20 },
  ];

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await PaymentService.getPlans();
      if (response.success) {
        setPlans(response.data || []);
      } else {
        setError(response.message || "Failed to load plans");
      }
    } catch (err) {
      setError(err.message || "Failed to load plans");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const getPlanIcon = (planType) => {
    switch (planType?.toUpperCase()) {
      case "BASIC":
        return <Zap className="w-8 h-8" />;
      case "PREMIUM":
        return <Gift className="w-8 h-8" />;
      case "ELITE":
        return <Crown className="w-8 h-8" />;
      default:
        return <Zap className="w-8 h-8" />;
    }
  };

  const getPlanColor = (planType) => {
    switch (planType?.toUpperCase()) {
      case "BASIC":
        return {
          bg: "from-blue-50 to-blue-100",
          border: "border-blue-200",
          accent: "text-blue-600",
        };
      case "PREMIUM":
        return {
          bg: "from-purple-50 to-purple-100",
          border: "border-purple-200",
          accent: "text-purple-600",
        };
      case "ELITE":
        return {
          bg: "from-amber-50 to-amber-100",
          border: "border-amber-200",
          accent: "text-amber-600",
        };
      default:
        return {
          bg: "from-slate-50 to-slate-100",
          border: "border-slate-200",
          accent: "text-slate-600",
        };
    }
  };

  const calculatePrice = (basePrice, months) => {
    const durationConfig = durations.find((d) => d.months === months);
    if (!durationConfig) return basePrice;
    const discount = (basePrice * durationConfig.discount) / 100;
    return basePrice * months - discount;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <Loader className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
          <p className="text-slate-600 font-medium">Loading plans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md text-center">
          <X className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Error</h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <button
            onClick={fetchPlans}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-3">
            Choose Your Plan
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Find the perfect plan to meet your matrimony needs and connect with
            your ideal match.
          </p>
        </div>

        {/* Duration Selector */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {durations.map((duration) => (
            <button
              key={duration.months}
              onClick={() => setSelectedDuration(duration.months)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedDuration === duration.months
                  ? "bg-primary text-white shadow-lg"
                  : "bg-white text-slate-900 border-2 border-slate-200 hover:border-primary"
              }`}
            >
              {duration.label}
              {duration.discount > 0 && (
                <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  Save {duration.discount}%
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Plans Grid */}
      <div className="max-w-6xl mx-auto">
        {plans.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">No plans available</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const colors = getPlanColor(plan.planType);
              const finalPrice = calculatePrice(plan.price, selectedDuration);
              const monthlyPrice = finalPrice / selectedDuration;
              const isSelected = selectedPlan?.id === plan.id;

              return (
                <div
                  key={plan.id}
                  onClick={() => handleSelectPlan(plan)}
                  className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2 ${
                    isSelected
                      ? "border-primary shadow-2xl"
                      : "border-slate-200"
                  }`}
                >
                  {/* Badge */}
                  <div
                    className={`absolute top-0 right-0 bg-gradient-to-r ${colors.bg} px-4 py-2 rounded-bl-2xl rounded-tr-2xl`}
                  >
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${colors.accent}`}
                    >
                      {plan.planType}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-8">
                    {/* Icon */}
                    <div className={colors.accent + " mb-4"}>
                      {getPlanIcon(plan.planType)}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-slate-600 text-sm mb-6">
                      {plan.description}
                    </p>

                    {/* Pricing */}
                    <div className="mb-6 p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="text-3xl font-bold text-primary">
                          ₹{finalPrice.toFixed(0)}
                        </span>
                        <span className="text-slate-600">/</span>
                        <span className="text-slate-600">
                          {selectedDuration} months
                        </span>
                      </div>
                      <p className="text-sm text-slate-500">
                        ₹{monthlyPrice.toFixed(0)}/month
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 mb-6">
                      {plan.features && typeof plan.features === "string" ? (
                        plan.features.split(",").map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700 text-sm">
                              {feature.trim()}
                            </span>
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700 text-sm">
                              View all profiles
                            </span>
                          </div>
                          <div className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700 text-sm">
                              Send interests
                            </span>
                          </div>
                          <div className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700 text-sm">
                              Messaging
                            </span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() =>
                        navigate("/matrimony/checkout", {
                          state: { plan, durationMonths: selectedDuration },
                        })
                      }
                      className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                        isSelected
                          ? "bg-primary text-white hover:bg-primary/90 shadow-lg"
                          : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                      }`}
                    >
                      Choose Plan
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto mt-20">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "Can I cancel my subscription anytime?",
              a: "Yes, you can cancel your subscription at any time. Your access will remain active until the end of your billing period.",
            },
            {
              q: "Is my payment information secure?",
              a: "Absolutely! We use Razorpay, a PCI-DSS certified payment gateway, to securely process all payments.",
            },
            {
              q: "What happens after my subscription expires?",
              a: "Your account will revert to free features. You'll receive a reminder before expiration to renew your plan.",
            },
            {
              q: "Can I upgrade or downgrade my plan?",
              a: "Yes, you can change your plan anytime. The price difference will be adjusted proportionally.",
            },
          ].map((faq, idx) => (
            <div key={idx} className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
              <p className="text-slate-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
