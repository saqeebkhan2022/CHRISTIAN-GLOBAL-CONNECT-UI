import React from "react";
import { GraduationCap, BookOpen, Users } from "lucide-react";

const EducationHero = () => {
  return (
    <section className="relative bg-background py-24 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <span className="inline-block mb-4 text-sm font-semibold text-primary bg-primary/10 px-4 py-1 rounded-full">
            Faith-based Education
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
            Learn, Grow & Build a Future <br />
            <span className="text-primary">Rooted in Faith</span>
          </h1>

          <p className="mt-6 text-muted-foreground text-lg">
            Discover Christian schools, colleges, universities, and online
            learning programs designed to nurture both academic excellence and
            spiritual growth.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition">
              Explore Institutions
            </button>
            <button className="border border-border px-6 py-3 rounded-xl font-semibold hover:bg-muted transition">
              Learn More
            </button>
          </div>

          {/* Highlights */}
          <div className="mt-10 flex gap-8">
            <div className="flex items-center gap-3">
              <GraduationCap className="text-primary" />
              <span className="text-sm font-medium">Trusted Institutions</span>
            </div>
            <div className="flex items-center gap-3">
              <BookOpen className="text-primary" />
              <span className="text-sm font-medium">Online & Offline</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="text-primary" />
              <span className="text-sm font-medium">Community Driven</span>
            </div>
          </div>
        </div>

        {/* Right Visual */}
        <div className="relative">
          <div className="bg-card shadow-xl rounded-3xl p-8">
            <h3 className="text-xl font-bold mb-4">What you’ll find here</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>• Christian Schools & Colleges</li>
              <li>• Universities & Seminaries</li>
              <li>• Online Courses & Certifications</li>
              <li>• Faith-centered Curriculum</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationHero;
