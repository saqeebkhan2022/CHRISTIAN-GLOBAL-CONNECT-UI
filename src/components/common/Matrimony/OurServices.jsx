import {
  Heart,
  Shield,
  Search,
  Users,
  MessageCircle,
  CheckCircle,
} from "lucide-react";

export default function OurServices() {
  const services = [
    {
      icon: Search,
      title: "Advanced Search",
      description:
        "Find your perfect match with our powerful search filters including age, location, education, and faith preferences.",
    },
    {
      icon: Shield,
      title: "Verified Profiles",
      description:
        "All profiles are manually verified to ensure authenticity and safety for our community members.",
    },
    {
      icon: Heart,
      title: "Personalized Matches",
      description:
        "Receive daily recommendations based on your preferences and compatibility factors.",
    },
    {
      icon: MessageCircle,
      title: "Secure Messaging",
      description:
        "Connect safely with encrypted messaging and control who can contact you.",
    },
    {
      icon: Users,
      title: "Community Events",
      description:
        "Join virtual and in-person Christian events to meet like-minded singles in a safe environment.",
    },
    {
      icon: CheckCircle,
      title: "Success Support",
      description:
        "Get guidance from our relationship counselors and success stories from our community.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <p className="text-sm font-semibold text-primary">What We Offer</p>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Everything you need to find your perfect life partner in one place
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-card rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-primary/20 group"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
