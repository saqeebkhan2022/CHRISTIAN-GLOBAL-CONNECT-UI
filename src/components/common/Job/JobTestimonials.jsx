import React from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "HR Manager, FaithWorks",
    message:
      "Christian Global Connect helped us hire people who share our values. The quality of candidates is exceptional.",
  },
  {
    name: "Daniel Thomas",
    role: "Software Engineer",
    message:
      "I finally found a job where my faith and career align. This platform changed my life.",
  },
  {
    name: "Maria Fernandez",
    role: "NGO Director",
    message:
      "Trusted employers, genuine candidates, and a faith-first approach. Highly recommended.",
  },
];

const JobTestimonials = () => {
  return (
    <section className="bg-background py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block mb-4 text-sm font-semibold text-primary bg-primary/10 px-4 py-1 rounded-full">
            Testimonials
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            Trusted by{" "}
            <span className="text-primary">Christians Worldwide</span>
          </h2>

          <p className="mt-4 text-muted-foreground text-lg">
            Hear from employers and professionals who found purpose-driven
            success.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-card rounded-3xl p-8 shadow hover:shadow-xl transition"
            >
              <Quote className="text-primary mb-4" size={28} />

              <p className="text-sm text-muted-foreground leading-relaxed">
                “{t.message}”
              </p>

              <div className="mt-6">
                <p className="font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobTestimonials;
