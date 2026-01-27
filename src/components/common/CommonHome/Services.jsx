import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Heart,
  Plane,
  Church,
  CalendarHeart,
  ArrowRight,
  Lock,
  Briefcase,
  Hotel,
  GraduationCap,
  Loader2,
} from "lucide-react";

const services = [
  {
    title: "Matrimony Portal",
    description:
      "Verified profiles, faith-based matching, and privacy-first communication.",
    icon: Heart,
    path: "/matrimony",
    color: "bg-primary",
    enabled: true,
  },
  {
    title: "Job Portal",
    description:
      "Christian-friendly job listings and career growth opportunities.",
    icon: Briefcase,
    path: "/jobs",
    color: "bg-primary",
    enabled: true,
  },

  {
    title: "Education Portal",
    description:
      "Faith-based schools, colleges, and online Christian education.",
    icon: GraduationCap,
    path: "/education",
    color: "bg-primary",
    enabled: true,
  },
  {
    title: "Travel Portal",
    description: "Romantic, faith-friendly travell packages curated with love.",
    icon: Plane,
    path: "/travel",
    color: "bg-primary",
    enabled: true,
  },
  {
    title: "Wedding Planning Portal",
    description:
      "End-to-end wedding planning aligned with Christian traditions.",
    icon: CalendarHeart,
    path: "/wedding",
    color: "bg-primary",
    enabled: true,
  },
  {
    title: "Pilgrim Stays Portal",
    description:
      "Safe, affordable stays near churches and pilgrimage destinations.",
    icon: Hotel,
    path: "/stays",
    color: "bg-primary",
    enabled: true,
  },
  {
    title: "Pre-Marriage Counseling",
    description: "Guided counseling sessions rooted in Christian values.",
    icon: Church,
    path: "/counseling",
    color: "bg-primary",
    enabled: false,
  },
];

export default function Services() {
  const navigate = useNavigate();
  const [redirectingIndex, setRedirectingIndex] = useState(null);

  const handleClick = (service, idx) => {
    if (!service.enabled) return;

    setRedirectingIndex(idx);

    setTimeout(() => {
      navigate(service.path);
    }, 1000);
  };

  return (
    <section className="bg-background py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            Our Services
          </h2>
          <p className="mt-4 text-muted-foreground">
            One platform. Many services. Faith-first foundation.
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const isEnabled = service.enabled;
            const isRedirecting = redirectingIndex === idx;

            return (
              <div
                key={idx}
                onClick={() => handleClick(service, idx)}
                className={`relative bg-card rounded-3xl p-8 transition
                  ${
                    isEnabled
                      ? "cursor-pointer hover:shadow-xl"
                      : "cursor-not-allowed opacity-70"
                  }`}
              >
                {/* Redirecting Overlay */}
                {isRedirecting && (
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center z-10">
                    <Loader2 className="animate-spin mb-3" />
                    <span className="text-sm font-semibold">Redirecting…</span>
                  </div>
                )}

                {/* Status badge */}
                {!isEnabled && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 text-xs font-semibold bg-muted px-3 py-1 rounded-full text-muted-foreground">
                    <Lock size={12} />
                    Coming Soon
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${
                    service.color
                  }
                  flex items-center justify-center text-white mb-6
                  ${!isEnabled ? "grayscale" : ""}`}
                >
                  <Icon size={26} />
                </div>

                <h3 className="text-lg font-bold text-foreground">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm text-muted-foreground">
                  {service.description}
                </p>

                <div
                  className={`mt-6 flex items-center gap-2 font-semibold transition-all
                    ${
                      isEnabled
                        ? "text-primary hover:gap-3"
                        : "text-muted-foreground"
                    }`}
                >
                  {isEnabled ? (
                    <>
                      Visit Now <ArrowRight size={16} />
                    </>
                  ) : (
                    "Launching Soon"
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
