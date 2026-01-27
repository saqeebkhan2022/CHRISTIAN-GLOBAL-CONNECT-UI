import { UserPlus, Search, MessageCircle, Heart } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      step: "01",
      title: "Create Your Profile",
      description:
        "Sign up and create a detailed profile with your faith background, values, and what you're looking for in a partner.",
    },
    {
      icon: Search,
      step: "02",
      title: "Search & Browse",
      description:
        "Use our advanced search to find compatible matches based on your preferences, or browse daily recommendations.",
    },
    // {
    //   icon: MessageCircle,
    //   step: "03",
    //   title: "Connect & Chat",
    //   description:
    //     "Send interest, chat securely, and get to know potential partners in a safe, faith-based environment.",
    // },
    {
      icon: Heart,
      step: "03",
      title: "Find Your Match",
      description:
        "Build a meaningful relationship based on shared faith and values, leading to a Christ-centered marriage.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <p className="text-sm font-semibold text-primary">Simple Process</p>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Find your perfect match in four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/50 to-primary/20" />
                )}

                <div className="relative bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-primary/20">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-sm">
                        {item.step}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <a
            href="/register"
            className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 hover:shadow-lg transition-all duration-200"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  );
}
