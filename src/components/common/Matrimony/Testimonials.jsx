"use client";

import { useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import happyChristianCouple from "../../../assets/happy-christian-couple.jpg";
import smilingChristianCouple from "../../../assets/smiling-christian-couple.jpg";
import christianWeddingCouple from "../../../assets/christian-wedding-couple.jpg";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Sarah & John",
      location: "California, USA",
      image: happyChristianCouple,
      testimony:
        "We found each other through this wonderful platform. Our shared faith brought us together, and now we're happily married with a beautiful family. Thank you for helping us find God's plan for our lives!",
      date: "Married in 2022",
    },
    {
      name: "Grace & Michael",
      location: "London, UK",
      image: smilingChristianCouple,
      testimony:
        "This platform gave us the opportunity to connect despite being in different countries. Our relationship is built on faith and trust. We couldn't be more grateful!",
      date: "Married in 2023",
    },
    {
      name: "Rachel & David",
      location: "Sydney, Australia",
      image: christianWeddingCouple,
      testimony:
        "Finding someone who shares your values is precious. This site made it possible for us to meet and fall in love. It's been the best decision of our lives!",
      date: "Married in 2021",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <p className="text-sm font-semibold text-primary">
              Success Stories
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Real Love Stories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Read how we've helped thousands of Christian couples find their
            perfect match
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-card rounded-2xl p-8 sm:p-12 shadow-xl border border-border/50">
            <div className="absolute top-8 left-8 text-primary/20">
              <Quote size={48} />
            </div>

            <div className="relative z-10">
              <div className="flex flex-col items-center text-center mb-8">
                <img
                  src={testimonials[currentIndex].image || "/placeholder.svg"}
                  alt={testimonials[currentIndex].name}
                  className="w-20 h-20 rounded-full mb-4 object-cover border-4 border-primary/20"
                />
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {testimonials[currentIndex].name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {testimonials[currentIndex].location}
                </p>
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  {testimonials[currentIndex].date}
                </span>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed text-center italic mb-8">
                "{testimonials[currentIndex].testimony}"
              </p>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors duration-200"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5 text-primary" />
                </button>

                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentIndex
                          ? "bg-primary w-8"
                          : "bg-primary/30"
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextTestimonial}
                  className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors duration-200"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5 text-primary" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
