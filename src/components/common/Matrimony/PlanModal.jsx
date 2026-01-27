// import React, { useState, useEffect } from "react";
// import { Check, X, Loader, AlertCircle } from "lucide-react";
// import PaymentService from "../../../services/matrimony/payment/PaymentService";

// export default function PlanModal({ isOpen, onClose }) {
//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedDuration, setSelectedDuration] = useState(1);
//   const [processing, setProcessing] = useState(false);
//   const [durationOptions] = useState([
//     { months: 1, label: "1 Month", discount: 0 },
//     { months: 3, label: "3 Months", discount: 10 },
//     { months: 6, label: "6 Months", discount: 20 },
//   ]);

//   // Load Razorpay script
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     document.body.appendChild(script);
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   // Load plans from API on mount
//   useEffect(() => {
//     if (isOpen) {
//       fetchPlans();
//     }
//   }, [isOpen]);

//   const fetchPlans = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await PaymentService.getPlans();
//       console.log("Plans API Response:", response);

//       if (!response?.success || !Array.isArray(response.data)) {
//         setError("Invalid plans response");
//         setPlans([]);
//         return;
//       }

//       // Only active plans
//       const activePlans = response.data.filter((plan) => plan.isActive);

//       // Sort by displayOrder (BEST PRACTICE)
//       activePlans.sort((a, b) => a.displayOrder - b.displayOrder);

//       if (activePlans.length === 0) {
//         setError("No active plans available");
//         setPlans([]);
//         return;
//       }

//       setPlans(activePlans);
//     } catch (err) {
//       console.error("Error fetching plans:", err);
//       setError(err?.message || "Failed to load plans");
//       setPlans([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const calculatePrice = (basePrice, months = 1) => {
//     try {
//       const price = Number(basePrice);
//       if (isNaN(price)) return "0.00";

//       const duration = durationOptions.find((opt) => opt.months === months);
//       const discount = duration?.discount || 0;

//       const total = price * months;
//       const discountAmount = (total * discount) / 100;

//       return (total - discountAmount).toFixed(2);
//     } catch (err) {
//       console.error("Price calculation error:", err);
//       return "0.00";
//     }
//   };

//   const handlePaymentClick = async (plan) => {
//     try {
//       setProcessing(true);
//       setError(null);

//       // Validate Razorpay key
//       const razorpayKey = process.env.REACT_APP_RAZORPAY_KEY_ID;
//       if (!razorpayKey) {
//         setError("Razorpay configuration error. Please contact support.");
//         setProcessing(false);
//         return;
//       }

//       // Check if Razorpay is loaded
//       if (!window.Razorpay) {
//         setError("Payment gateway not loaded. Please try again.");
//         setProcessing(false);
//         return;
//       }

//       // Create order
//       const orderResponse = await PaymentService.createRazorpayOrder(
//         plan.id,
//         selectedDuration
//       );

//       if (!orderResponse.success) {
//         setError(orderResponse.message || "Failed to create order");
//         setProcessing(false);
//         return;
//       }

//       const finalAmount = calculatePrice(plan.price, selectedDuration);

//       // Prepare Razorpay options
//       const options = {
//         key: razorpayKey,
//         amount: Math.round(parseFloat(finalAmount) * 100),
//         currency: "INR",
//         order_id: orderResponse.data.orderId,
//         name: "Christian Global Connect",
//         description: `${plan.name} Plan - ${selectedDuration} month(s)`,
//         prefill: {
//           email: localStorage.getItem("userEmail") || "",
//           contact: localStorage.getItem("userPhone") || "",
//         },
//         theme: {
//           color: "#DC2626",
//         },
//         handler: async (response) => {
//           try {
//             // Verify payment with backend
//             const verifyResponse = await PaymentService.verifyPayment({
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//             });

//             if (verifyResponse.success) {
//               alert("🎉 Payment successful! Your subscription is now active.");
//               setSelectedDuration(1);
//               setError(null);
//               onClose();
//               setTimeout(() => {
//                 window.location.reload();
//               }, 1000);
//             } else {
//               setError(verifyResponse.message || "Payment verification failed");
//               setProcessing(false);
//             }
//           } catch (err) {
//             console.error("Payment verification error:", err);
//             setError("Payment verification failed. Please contact support.");
//             setProcessing(false);
//           }
//         },
//         modal: {
//           ondismiss: () => {
//             setProcessing(false);
//           },
//         },
//       };

//       const paymentWindow = new window.Razorpay(options);
//       paymentWindow.open();
//     } catch (err) {
//       console.error("Payment initiation error:", err);
//       setError(err.message || "Failed to initiate payment");
//       setProcessing(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-auto flex items-center justify-center p-4">
//       {/* Backdrop */}
//       <div
//         className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
//         onClick={onClose}
//         role="button"
//         tabIndex={0}
//       />

//       {/* Modal Container */}
//       <div className="relative bg-slate-50 w-full max-w-6xl max-h-screen overflow-y-auto rounded-4xl shadow-2xl animate-in zoom-in-95 duration-300">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           disabled={processing}
//           className="absolute top-6 right-6 p-2 bg-white rounded-full shadow-md hover:bg-slate-50 transition-colors z-10 disabled:opacity-50"
//           aria-label="Close modal"
//         >
//           <X className="w-6 h-6 text-slate-400" />
//         </button>

//         <div className="p-8 sm:p-12">
//           {/* Header */}
//           <div className="text-center mb-12">
//             <span className="inline-block mb-3 px-4 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest">
//               Unlock Premium Features
//             </span>
//             <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
//               Choose Your Perfect Plan
//             </h2>
//             <p className="text-slate-500 max-w-xl mx-auto">
//               Unlock profile details, unlimited messaging, and exclusive
//               features to find your perfect match.
//             </p>
//           </div>

//           {/* Duration Selector */}
//           <div className="flex justify-center gap-3 mb-12 flex-wrap">
//             {durationOptions.map((option) => (
//               <button
//                 key={option.months}
//                 onClick={() => setSelectedDuration(option.months)}
//                 disabled={processing}
//                 className={`px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 ${
//                   selectedDuration === option.months
//                     ? "bg-primary text-white shadow-lg"
//                     : "bg-slate-100 text-slate-700 hover:bg-slate-200"
//                 }`}
//               >
//                 {option.label}
//                 {option.discount > 0 && (
//                   <span className="ml-1 text-xs bg-green-500 text-white px-2 py-1 rounded">
//                     Save {option.discount}%
//                   </span>
//                 )}
//               </button>
//             ))}
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
//               <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
//               <div>
//                 <h4 className="font-semibold text-red-900">Error</h4>
//                 <p className="text-red-700 text-sm mt-1">{error}</p>
//               </div>
//             </div>
//           )}

//           {/* Loading State */}
//           {loading ? (
//             <div className="flex justify-center items-center py-20">
//               <div className="text-center">
//                 <Loader className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
//                 <p className="text-slate-600 font-medium">Loading plans...</p>
//               </div>
//             </div>
//           ) : plans.length === 0 ? (
//             <div className="text-center py-20">
//               <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
//               <p className="text-slate-600 font-medium">No plans available</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {plans.map((plan, index) => {
//                 const isPremium = index === plans.length - 1;
//                 const finalPrice = calculatePrice(plan.price, selectedDuration);

//                 return (
//                   <div
//                     key={plan.id}
//                     className={`rounded-3xl p-8 border transition-all duration-300 flex flex-col ${
//                       isPremium
//                         ? "bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-105 z-10"
//                         : "bg-white border-slate-200 hover:border-primary/50 shadow-sm"
//                     }`}
//                   >
//                     {isPremium && (
//                       <div className="bg-white/20 text-[10px] font-bold py-1 px-3 rounded-full self-start mb-4">
//                         MOST POPULAR
//                       </div>
//                     )}

//                     <h3
//                       className={`text-xl font-bold mb-1 ${
//                         isPremium ? "text-white" : "text-slate-900"
//                       }`}
//                     >
//                       {plan.name}
//                     </h3>

//                     <p
//                       className={`text-sm mb-6 ${
//                         isPremium ? "text-white/80" : "text-slate-500"
//                       }`}
//                     >
//                       {plan.description || plan.planType}
//                     </p>

//                     <div className="mb-8">
//                       <span
//                         className={`text-4xl font-black ${
//                           isPremium ? "text-white" : "text-slate-900"
//                         }`}
//                       >
//                         ₹{finalPrice}
//                       </span>
//                       <span
//                         className={`text-sm ml-1 ${
//                           isPremium ? "text-white/70" : "text-slate-400"
//                         }`}
//                       >
//                         /{selectedDuration} month
//                         {selectedDuration > 1 ? "s" : ""}
//                       </span>
//                     </div>

//                     {/* Features List */}
//                     <ul className="space-y-4 mb-8 flex-1">
//                       <li className="flex items-center gap-3">
//                         <div
//                           className={`p-1 rounded-full ${
//                             isPremium ? "bg-white/20" : "bg-primary/10"
//                           }`}
//                         >
//                           <Check
//                             size={14}
//                             className={
//                               isPremium ? "text-white" : "text-primary"
//                             }
//                           />
//                         </div>
//                         <span
//                           className={`text-sm ${
//                             isPremium ? "text-white/90" : "text-slate-600"
//                           }`}
//                         >
//                           {plan.canViewFullProfile
//                             ? "Full Profile Access"
//                             : "Limited Profile Access"}
//                         </span>
//                       </li>

//                       <li className="flex items-center gap-3">
//                         <div
//                           className={`p-1 rounded-full ${
//                             isPremium ? "bg-white/20" : "bg-primary/10"
//                           }`}
//                         >
//                           <Check
//                             size={14}
//                             className={
//                               isPremium ? "text-white" : "text-primary"
//                             }
//                           />
//                         </div>
//                         <span
//                           className={`text-sm ${
//                             isPremium ? "text-white/90" : "text-slate-600"
//                           }`}
//                         >
//                           {plan.maxMessagesSent || 100} Messages/month
//                         </span>
//                       </li>

//                       <li className="flex items-center gap-3">
//                         <div
//                           className={`p-1 rounded-full ${
//                             isPremium ? "bg-white/20" : "bg-primary/10"
//                           }`}
//                         >
//                           <Check
//                             size={14}
//                             className={
//                               isPremium ? "text-white" : "text-primary"
//                             }
//                           />
//                         </div>
//                         <span
//                           className={`text-sm ${
//                             isPremium ? "text-white/90" : "text-slate-600"
//                           }`}
//                         >
//                           {plan.maxProfileViews || 100} Profile Views
//                         </span>
//                       </li>

//                       {plan.canViewPhoneNumber && (
//                         <li className="flex items-center gap-3">
//                           <div
//                             className={`p-1 rounded-full ${
//                               isPremium ? "bg-white/20" : "bg-primary/10"
//                             }`}
//                           >
//                             <Check
//                               size={14}
//                               className={
//                                 isPremium ? "text-white" : "text-primary"
//                               }
//                             />
//                           </div>
//                           <span
//                             className={`text-sm ${
//                               isPremium ? "text-white/90" : "text-slate-600"
//                             }`}
//                           >
//                             View Contact Numbers
//                           </span>
//                         </li>
//                       )}

//                       {plan.verificationBadge && (
//                         <li className="flex items-center gap-3">
//                           <div
//                             className={`p-1 rounded-full ${
//                               isPremium ? "bg-white/20" : "bg-primary/10"
//                             }`}
//                           >
//                             <Check
//                               size={14}
//                               className={
//                                 isPremium ? "text-white" : "text-primary"
//                               }
//                             />
//                           </div>
//                           <span
//                             className={`text-sm ${
//                               isPremium ? "text-white/90" : "text-slate-600"
//                             }`}
//                           >
//                             Verification Badge
//                           </span>
//                         </li>
//                       )}

//                       {plan.advancedSearchEnabled && (
//                         <li className="flex items-center gap-3">
//                           <div
//                             className={`p-1 rounded-full ${
//                               isPremium ? "bg-white/20" : "bg-primary/10"
//                             }`}
//                           >
//                             <Check
//                               size={14}
//                               className={
//                                 isPremium ? "text-white" : "text-primary"
//                               }
//                             />
//                           </div>
//                           <span
//                             className={`text-sm ${
//                               isPremium ? "text-white/90" : "text-slate-600"
//                             }`}
//                           >
//                             Advanced Search Filters
//                           </span>
//                         </li>
//                       )}
//                     </ul>

//                     <button
//                       onClick={() => handlePaymentClick(plan)}
//                       disabled={processing}
//                       className={`w-full py-4 rounded-2xl font-bold text-sm transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 ${
//                         isPremium
//                           ? "bg-white text-primary hover:bg-slate-50 shadow-lg"
//                           : "bg-primary text-white hover:bg-primary/90"
//                       }`}
//                     >
//                       {processing ? (
//                         <>
//                           <Loader className="w-4 h-4 animate-spin" />
//                           Processing...
//                         </>
//                       ) : (
//                         <>Get Started</>
//                       )}
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           <p className="text-center text-xs text-slate-400 mt-8">
//             💳 Secure Razorpay payment • Cancel anytime • No hidden charges
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { Check, X, Loader, AlertCircle } from "lucide-react";
import PaymentService from "../../../services/matrimony/payment/PaymentService";

export default function PlanModal({ isOpen, onClose }) {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [processingPlanId, setProcessingPlanId] = useState(null);

  const durationOptions = [
    { months: 1, label: "1 Month", discount: 0 },
    { months: 3, label: "3 Months", discount: 10 },
    { months: 6, label: "6 Months", discount: 20 },
  ];

  /* ---------------- Load Razorpay ---------------- */
  useEffect(() => {
    if (!isOpen) return;

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [isOpen]);

  /* ---------------- Load Plans ---------------- */
  useEffect(() => {
    if (isOpen) fetchPlans();
  }, [isOpen]);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await PaymentService.getPlans();

      if (!res?.success || !Array.isArray(res.data)) {
        throw new Error("Invalid plans response");
      }

      const activePlans = res.data
        .filter((p) => p.isActive)
        .sort((a, b) => a.displayOrder - b.displayOrder);

      setPlans(activePlans);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load plans");
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Price Calculation ---------------- */
  const calculatePrice = (basePrice, months) => {
    const price = Number(basePrice);
    if (isNaN(price)) return "0.00";

    const duration = durationOptions.find((d) => d.months === months);
    const discount = duration?.discount || 0;

    const total = price * months;
    const discounted = total - (total * discount) / 100;

    return discounted.toFixed(2);
  };

  /* ---------------- Payment ---------------- */
  const handlePaymentClick = async (plan) => {
    try {
      setProcessingPlanId(plan.id);
      setError(null);

      if (!window.Razorpay) {
        throw new Error("Payment gateway not loaded");
      }

      const orderRes = await PaymentService.createRazorpayOrder(
        plan.id,
        selectedDuration
      );

      if (!orderRes.success) {
        throw new Error(orderRes.message || "Order creation failed");
      }

      const amount = calculatePrice(plan.price, selectedDuration);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        order_id: orderRes.data.orderId,
        amount: Math.round(Number(amount) * 100),
        currency: "INR",
        name: "Christian Global Connect",
        description: `${plan.name} (${selectedDuration} month${
          selectedDuration > 1 ? "s" : ""
        })`,
        prefill: {
          email: localStorage.getItem("userEmail") || "",
          contact: localStorage.getItem("userPhone") || "",
        },
        theme: { color: "#DC2626" },

        handler: async (response) => {
          try {
            const verify = await PaymentService.verifyPayment(response);
            if (!verify.success) {
              throw new Error("Payment verification failed");
            }

            alert("🎉 Payment successful!");
            onClose();
            setTimeout(() => window.location.reload(), 800);
          } catch (err) {
            setError(err.message);
            setProcessingPlanId(null);
          }
        },

        modal: {
          ondismiss: () => setProcessingPlanId(null),
        },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error(err);
      setError(err.message);
      setProcessingPlanId(null);
    }
  };

  if (!isOpen) return null;

  /* ---------------- UI ---------------- */
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white max-w-6xl w-full rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full bg-white shadow"
        >
          <X className="w-5 h-5 text-slate-500" />
        </button>

        <div className="p-8 sm:p-12">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black mb-3">
              Choose Your Plan
            </h2>
            <p className="text-slate-500">
              Upgrade to unlock premium matrimony features
            </p>
          </div>

          {/* Duration */}
          <div className="flex justify-center gap-3 mb-10 flex-wrap">
            {durationOptions.map((opt) => (
              <button
                key={opt.months}
                onClick={() => setSelectedDuration(opt.months)}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  selectedDuration === opt.months
                    ? "bg-primary text-white"
                    : "bg-slate-100 hover:bg-slate-200"
                }`}
              >
                {opt.label}
                {opt.discount > 0 && (
                  <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded">
                    -{opt.discount}%
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
              <AlertCircle className="text-red-600 w-5 h-5 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Plans */}
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader className="animate-spin text-primary w-10 h-10" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan, idx) => {
                const isPopular = idx === plans.length - 1;
                const price = calculatePrice(plan.price, selectedDuration);

                return (
                  <div
                    key={plan.id}
                    className={`rounded-3xl p-8 flex flex-col border ${
                      isPopular
                        ? "bg-primary text-white scale-105 shadow-xl"
                        : "bg-white"
                    }`}
                  >
                    {isPopular && (
                      <span className="text-xs bg-white/20 px-3 py-1 rounded-full mb-4 self-start">
                        MOST POPULAR
                      </span>
                    )}

                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="text-sm opacity-80 mb-6">
                      {plan.description}
                    </p>

                    <div className="mb-8">
                      <span className="text-4xl font-black">₹{price}</span>
                      <span className="text-sm opacity-70">
                        /{selectedDuration} mo
                      </span>
                    </div>

                    <ul className="space-y-3 mb-8 flex-1">
                      <li className="flex gap-2">
                        <Check size={16} /> {plan.maxMessagesSent} Messages
                      </li>
                      <li className="flex gap-2">
                        <Check size={16} /> {plan.maxProfileViews} Profile Views
                      </li>
                      {plan.canViewPhoneNumber && (
                        <li className="flex gap-2">
                          <Check size={16} /> View Contact Number
                        </li>
                      )}
                    </ul>

                    <button
                      onClick={() => handlePaymentClick(plan)}
                      disabled={processingPlanId === plan.id}
                      className={`py-3 rounded-xl font-bold ${
                        isPopular
                          ? "bg-white text-primary"
                          : "bg-primary text-white"
                      }`}
                    >
                      {processingPlanId === plan.id ? (
                        <Loader className="w-4 h-4 animate-spin mx-auto" />
                      ) : (
                        "Get Started"
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          <p className="text-center text-xs text-slate-400 mt-8">
            Secure Razorpay payment • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
}
