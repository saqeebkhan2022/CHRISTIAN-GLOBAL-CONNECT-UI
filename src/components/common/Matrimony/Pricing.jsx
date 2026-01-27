"use client";

import { Check } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "0",
      period: "Forever",
      description: "Perfect for getting started",
      features: [
        "Create Profile",
        "Browse Limited Profiles",
        "Send 5 Interests per month",
        "Basic Search Filters",
        "Community Support",
      ],
      highlighted: false,
    },
    {
      name: "Premium",
      price: "29",
      period: "per month",
      description: "Most popular choice",
      features: [
        "Everything in Free",
        "Unlimited Profile Browsing",
        "Unlimited Interests",
        "Advanced Search Filters",
        "Priority Support",
        "Profile Boost",
        "See Who Viewed Your Profile",
        "Chat with Matches",
      ],
      highlighted: true,
    },
    {
      name: "Platinum",
      price: "49",
      period: "per month",
      description: "For serious seekers",
      features: [
        "Everything in Premium",
        "Featured Profile",
        "Top Search Rankings",
        "Dedicated Matchmaker",
        "Background Verification",
        "Personal Consultation",
        "Exclusive Events Access",
        "Priority Matching",
      ],
      highlighted: false,
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-6 py-2 bg-primary/10 rounded-full">
            <p className="text-sm font-semibold text-primary">
              Affordable Plans
            </p>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
            Choose Your Perfect Plan
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Find the right plan to help you meet your life partner
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                plan.highlighted
                  ? "bg-primary text-primary-foreground border-primary shadow-2xl scale-105"
                  : "bg-card border-border shadow-lg"
              }`}
            >
              {plan.highlighted && (
                <div className="inline-block mb-4 px-4 py-1 bg-primary-foreground/20 rounded-full">
                  <p className="text-xs font-bold text-primary-foreground">
                    MOST POPULAR
                  </p>
                </div>
              )}
              <h3
                className={`text-2xl font-bold mb-2 ${
                  plan.highlighted
                    ? "text-primary-foreground"
                    : "text-foreground"
                }`}
              >
                {plan.name}
              </h3>
              <p
                className={`text-sm mb-6 ${
                  plan.highlighted
                    ? "text-primary-foreground/90"
                    : "text-muted-foreground"
                }`}
              >
                {plan.description}
              </p>

              <div className="mb-8">
                <span
                  className={`text-5xl font-bold ${
                    plan.highlighted
                      ? "text-primary-foreground"
                      : "text-foreground"
                  }`}
                >
                  ${plan.price}
                </span>
                <span
                  className={`text-lg ml-2 ${
                    plan.highlighted
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground"
                  }`}
                >
                  /{plan.period}
                </span>
              </div>

              <button
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 mb-8 ${
                  plan.highlighted
                    ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                Get Started
              </button>

              <ul className="space-y-4">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <Check
                      size={20}
                      className={`flex-shrink-0 mt-0.5 ${
                        plan.highlighted
                          ? "text-primary-foreground"
                          : "text-primary"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        plan.highlighted
                          ? "text-primary-foreground/90"
                          : "text-muted-foreground"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            All plans include secure payment processing and can be cancelled
            anytime
          </p>
        </div>
      </div>
    </section>
  );
}
