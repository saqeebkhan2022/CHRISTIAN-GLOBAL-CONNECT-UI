import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import christ from "../../../assets/hero.jpeg";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-accent via-background to-secondary text-white">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      <div className="relative max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT */}
        <div>
          <p className="uppercase tracking-[0.3em] text-sm text-black mb-4">
            Christian Global Connect
          </p>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-black">
            Building <span className="text-primary">God-Centered</span>
            <br /> Relationships Worldwide
          </h1>

          <p className="mt-6 text-lg text-primary max-w-xl">
            From finding your life partner to planning your divine honeymoon —
            everything crafted with faith, trust, and love.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/matrimony")}
              className="px-8 py-4 rounded-full bg-primary text-white font-bold flex items-center gap-2 hover:scale-105 transition"
            >
              Explore Services <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* RIGHT */}
        {/* RIGHT */}
        <div className="relative hidden md:flex items-center justify-center">
          {/* The container now controls the max-height to match the text content height */}
          <div className="relative w-full max-w-md lg:max-w-lg aspect-[4/5] md:aspect-square overflow-hidden rounded-[2.5rem] shadow-2xl border-8 border-white">
            <img
              src={christ}
              alt="Christian Global Connect"
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
            />

            {/* Gradient Overlay to soften the dark image against the light background */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          {/* Decorative element behind the image to make it "pop" */}
          <div className="absolute -z-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl -top-10 -right-10" />
        </div>
      </div>
    </section>
  );
}
