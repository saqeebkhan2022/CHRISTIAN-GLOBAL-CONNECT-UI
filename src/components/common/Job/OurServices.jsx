import React from "react";
import {
  Briefcase,
  Users,
  Globe,
  ShieldCheck,
  GraduationCap,
  HeartHandshake,
} from "lucide-react";

const services = [
  {
    title: "Faith-Friendly Jobs",
    description:
      "Carefully curated job listings from Christian ministries, NGOs, and faith-aligned organizations.",
    icon: Briefcase,
  },
  {
    title: "Global Opportunities",
    description:
      "Explore job openings across countries and continents with Christian values at the core.",
    icon: Globe,
  },
  {
    title: "Verified Employers",
    description:
      "All employers are vetted to ensure safe, trustworthy, and value-driven workplaces.",
    icon: ShieldCheck,
  },
  {
    title: "Career Growth",
    description:
      "Access roles that support long-term growth, leadership, and calling-based careers.",
    icon: GraduationCap,
  },
  {
    title: "Community Hiring",
    description:
      "Connect with Christian-led companies and organizations seeking like-minded talent.",
    icon: Users,
  },
  {
    title: "Purpose-Driven Work",
    description:
      "Find work that aligns with your faith, passion, and professional goals.",
    icon: HeartHandshake,
  },
];

const JobOurServices = () => {
  return (
    <section className="bg-muted/40 py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block mb-4 text-sm font-semibold text-primary bg-primary/10 px-4 py-1 rounded-full">
            Our Services
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            Everything You Need for a{" "}
            <span className="text-primary">Purpose-Driven Career</span>
          </h2>

          <p className="mt-4 text-muted-foreground text-lg">
            We help Christians find meaningful careers by connecting talent with
            faith-aligned organizations worldwide.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-card rounded-3xl p-8 shadow hover:shadow-xl transition"
              >
                <div className="w-14 h-14 mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Icon className="text-primary" size={26} />
                </div>

                <h3 className="text-lg font-bold text-foreground">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JobOurServices;
