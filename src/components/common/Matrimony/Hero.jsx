import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import heroImg from "../../../assets/images/hero-bg.jpg";

export default function Hero() {
  const navigate = useNavigate();
  const [lookingFor, setLookingFor] = useState("bride");
  const [ageFrom, setAgeFrom] = useState("21");
  const [ageTo, setAgeTo] = useState("35");
  const [country, setCountry] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams({
      lookingFor,
      ageFrom,
      ageTo,
      country: country || "all",
    });
    navigate(`/matrimony/profiles?${params.toString()}`);
  };

  return (
    <section className="relative bg-gradient-to-br from-accent via-background to-secondary min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/80 via-background/85 to-secondary/80 z-10" />
        <img
          src={heroImg}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 w-full py-20">
        <div className="text-center mb-16">
          <div className="inline-block mb-6 px-6 py-3 bg-primary/10 rounded-full backdrop-blur-sm border border-primary/20">
            <p className="text-sm font-semibold text-primary">
              Trusted Christian Matrimony
            </p>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-8 text-balance leading-tight">
            Find Your God-Ordained
            <span className="block text-primary mt-3">Life Partner</span>
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
            Join thousands of Christian singles finding meaningful connections
            built on faith, values, and lasting love
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-card/98 backdrop-blur-md rounded-3xl shadow-2xl p-8 sm:p-10 border border-border/50">
          <form onSubmit={handleSearch} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Looking For
                </label>
                <select
                  value={lookingFor}
                  onChange={(e) => setLookingFor(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="bride">Bride</option>
                  <option value="groom">Groom</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Age From
                </label>
                <select
                  value={ageFrom}
                  onChange={(e) => setAgeFrom(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {Array.from({ length: 43 }, (_, i) => i + 18).map((age) => (
                    <option key={age} value={age}>
                      {age}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Age To
                </label>
                <select
                  value={ageTo}
                  onChange={(e) => setAgeTo(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {Array.from({ length: 43 }, (_, i) => i + 18).map((age) => (
                    <option key={age} value={age}>
                      {age}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Country
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">All Countries</option>
                  <option value="usa">United States</option>
                  <option value="canada">Canada</option>
                  <option value="uk">United Kingdom</option>
                  <option value="australia">Australia</option>
                  <option value="india">India</option>
                  <option value="philippines">Philippines</option>
                  <option value="nigeria">Nigeria</option>
                  <option value="kenya">Kenya</option>
                  <option value="southafrica">South Africa</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              onSubmit={handleSearch}
              className="w-full bg-primary text-primary-foreground py-5 rounded-xl font-bold text-xl hover:bg-primary/90 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Search size={24} />
              Search Profiles
            </button>
          </form>
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="bg-card/95 backdrop-blur-md rounded-2xl p-10 shadow-2xl border border-border/50 hover:shadow-3xl hover:-translate-y-2 transition-all duration-300">
            <div className="text-6xl font-bold text-primary mb-4">10,000+</div>
            <div className="text-muted-foreground font-semibold text-lg">
              Active Members
            </div>
          </div>
          <div className="bg-card/95 backdrop-blur-md rounded-2xl p-10 shadow-2xl border border-border/50 hover:shadow-3xl hover:-translate-y-2 transition-all duration-300">
            <div className="text-6xl font-bold text-primary mb-4">2,500+</div>
            <div className="text-muted-foreground font-semibold text-lg">
              Success Stories
            </div>
          </div>
          <div className="bg-card/95 backdrop-blur-md rounded-2xl p-10 shadow-2xl border border-border/50 hover:shadow-3xl hover:-translate-y-2 transition-all duration-300">
            <div className="text-6xl font-bold text-primary mb-4">50+</div>
            <div className="text-muted-foreground font-semibold text-lg">
              Countries
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
