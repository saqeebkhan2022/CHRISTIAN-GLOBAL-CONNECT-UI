import { Heart, Target, Award, Users } from "lucide-react";

export default function AboutUs() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
              <p className="text-sm font-semibold text-primary">
                About Our Platform
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Bringing Christian Hearts Together
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Founded on Christian principles and values, our matrimonial
              platform is dedicated to helping believers find their God-ordained
              life partners. We understand that faith is the foundation of a
              strong marriage.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              With over a decade of experience, we've helped thousands of
              Christian singles across the globe connect, communicate, and build
              lasting relationships centered on Christ.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">10+</div>
                  <div className="text-sm text-muted-foreground">
                    Years Experience
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">10K+</div>
                  <div className="text-sm text-muted-foreground">
                    Happy Couples
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl p-6 shadow-lg border border-border/50">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Our Mission
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To create a safe, faith-based environment where Christian
                    singles can find their perfect match and build
                    Christ-centered relationships.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-lg border border-border/50">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Our Values
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We uphold Christian values of honesty, integrity, respect,
                    and love in everything we do. Your safety and privacy are
                    our top priorities.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-lg border border-border/50">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Our Promise
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We promise to provide a trustworthy platform with verified
                    profiles, secure communication, and continuous support
                    throughout your journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
