import React from "react";
import {
  ShieldCheck,
  Heart,
  Globe,
  Users,
  Briefcase,
  Sparkles,
} from "lucide-react";

const reasons = [
  {
    title: "Faith-First Platform",
    description:
      "Every opportunity is aligned with Christian values, ensuring a safe and purpose-driven career path.",
    icon: Heart,
  },
  {
    title: "Trusted Employers",
    description:
      "We carefully verify employers to maintain integrity, transparency, and ethical hiring.",
    icon: ShieldCheck,
  },
  {
    title: "Global Reach",
    description:
      "Access Christian-friendly job opportunities across countries and continents.",
    icon: Globe,
  },
  {
    title: "Community-Centered",
    description:
      "Built for Christians, by Christians — fostering meaningful connections beyond resumes.",
    icon: Users,
  },
  {
    title: "Diverse Roles",
    description:
      "From ministry to corporate roles, find jobs that fit your calling and skillset.",
    icon: Briefcase,
  },
  {
    title: "Purpose Over Pay",
    description:
      "We help you find work that aligns with your faith, passion, and long-term mission.",
    icon: Sparkles,
  },
];

const JobWhyChooseUs = () => {
  return (
    <section className="bg-background py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block mb-4 text-sm font-semibold text-primary bg-primary/10 px-4 py-1 rounded-full">
            Why Choose Us
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            More Than a Job Board —{" "}
            <span className="text-primary">A Calling Platform</span>
          </h2>

          <p className="mt-4 text-muted-foreground text-lg">
            We go beyond listings to help you discover meaningful careers rooted
            in faith, integrity, and purpose.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className="bg-card rounded-3xl p-8 shadow hover:shadow-xl transition"
              >
                <div className="w-14 h-14 mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Icon className="text-primary" size={26} />
                </div>

                <h3 className="text-lg font-bold text-foreground">
                  {reason.title}
                </h3>

                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JobWhyChooseUs;
