import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapPin, Users, CalendarDays, Bed, ArrowRight } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

/* ---------------- MOCK DATA (replace with API later) ---------------- */
const ALL_PACKAGES = Array.from({ length: 20 }).map(() => ({
  id: uuidv4(),
  title: "Faith-Friendly Travel Package",
  nights: 3 + Math.floor(Math.random() * 7),
  price: 35000 + Math.floor(Math.random() * 30000),
  image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
}));

/* ---------------- MAIN ---------------- */

const TravelSearch = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const destination = params.get("destination");
  const type = params.get("type");
  const checkIn = params.get("checkIn");
  const checkOut = params.get("checkOut");
  const adults = Number(params.get("adults") || 0);
  const children = Number(params.get("children") || 0);
  const infants = Number(params.get("infants") || 0);
  const rooms = params.get("rooms");

  const totalGuests = adults + children;

  /* ---------------- STATE ---------------- */
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("price_low");
  const [visibleCount, setVisibleCount] = useState(6);
  const [results, setResults] = useState([]);

  /* ---------------- FETCH SIMULATION ---------------- */
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setResults(ALL_PACKAGES);
      setLoading(false);
    }, 1200);
  }, []);

  /* ---------------- SORT ---------------- */
  const sortedResults = useMemo(() => {
    const data = [...results];
    if (sortBy === "price_low") data.sort((a, b) => a.price - b.price);
    if (sortBy === "price_high") data.sort((a, b) => b.price - a.price);
    if (sortBy === "duration") data.sort((a, b) => a.nights - b.nights);
    return data;
  }, [results, sortBy]);

  const visibleResults = sortedResults.slice(0, visibleCount);

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* ---------------- SUMMARY BAR ---------------- */}
        <div className="bg-card rounded-2xl shadow p-5 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold">
              {type} Trip to <span className="text-primary">{destination}</span>
            </h2>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
              <span className="flex items-center gap-1">
                <CalendarDays size={14} />
                {checkIn} → {checkOut}
              </span>
              <span className="flex items-center gap-1">
                <Users size={14} />
                {totalGuests} Guests {infants > 0 && `+ ${infants} Infants`}
              </span>
              <span className="flex items-center gap-1">
                <Bed size={14} />
                {rooms} Room
              </span>
            </div>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-xl px-4 py-2 text-sm"
          >
            <option value="price_low">Price: Low → High</option>
            <option value="price_high">Price: High → Low</option>
            <option value="duration">Duration</option>
          </select>
        </div>

        {/* ---------------- CONTENT ---------------- */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* FILTERS */}
          <aside className="hidden lg:block bg-card rounded-2xl p-6 shadow h-fit">
            <h3 className="font-bold mb-4">Filters</h3>

            <FilterSection title="Trip Type">
              <FilterItem label="Couple" />
              <FilterItem label="Family" />
              <FilterItem label="Friends" />
              <FilterItem label="Honeymoon" />
            </FilterSection>

            <FilterSection title="Duration">
              <FilterItem label="3–5 Nights" />
              <FilterItem label="6–9 Nights" />
              <FilterItem label="10+ Nights" />
            </FilterSection>
          </aside>

          {/* RESULTS */}
          <section className="lg:col-span-3">
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <TravelCardSkeleton key={i} />
                  ))
                : visibleResults.map((pkg) => (
                    <TravelCard
                      key={pkg.id}
                      data={pkg}
                      destination={destination}
                      onView={() => navigate(`/travel/details/${pkg.id}`)}
                    />
                  ))}
            </div>

            {/* LOAD MORE */}
            {!loading && visibleCount < sortedResults.length && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => setVisibleCount((c) => c + 6)}
                  className="px-8 py-3 rounded-xl border font-semibold hover:bg-muted"
                >
                  Load More
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default TravelSearch;

/* ---------------- COMPONENTS ---------------- */

const FilterSection = ({ title, children }) => (
  <div className="mb-6">
    <h4 className="font-semibold mb-2">{title}</h4>
    <div className="space-y-2">{children}</div>
  </div>
);

const FilterItem = ({ label }) => (
  <label className="flex items-center gap-2 text-sm cursor-pointer">
    <input type="checkbox" />
    {label}
  </label>
);

const TravelCard = ({ data, destination, onView }) => (
  <div className="bg-card rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
    <img src={data.image} alt="travel" className="h-44 w-full object-cover" />

    <div className="p-4">
      <h3 className="font-bold text-lg">
        {destination} · {data.nights} Nights
      </h3>

      <p className="text-sm text-muted-foreground mt-1">
        Faith-friendly stays · Guided tours
      </p>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Starting from</p>
          <p className="text-lg font-bold text-primary">
            ₹{data.price.toLocaleString()}
          </p>
        </div>

        <button
          onClick={onView}
          className="flex items-center gap-1 bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold"
        >
          View
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  </div>
);

const TravelCardSkeleton = () => (
  <div className="bg-card rounded-2xl shadow animate-pulse overflow-hidden">
    <div className="h-44 bg-muted" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-muted rounded w-3/4" />
      <div className="h-3 bg-muted rounded w-full" />
      <div className="flex justify-between items-center mt-4">
        <div className="h-6 bg-muted rounded w-24" />
        <div className="h-8 bg-muted rounded w-20" />
      </div>
    </div>
  </div>
);
