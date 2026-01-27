import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, MapPin, Briefcase } from "lucide-react";

const JobHero = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [position, setPosition] = useState(searchParams.get("position") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (position) params.append("position", position);
    if (location) params.append("location", location);

    // Reset filters, sort, page for new search
    params.append("page", 1);

    navigate(`/jobs/search?${params.toString()}`);
  };

  return (
    <section className="bg-primary py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <span className="inline-block mb-4 text-sm font-semibold text-primary bg-background px-4 py-1 rounded-full">
            Christian Job Portal
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-background leading-tight">
            Find Jobs That Match Your{" "}
            <span className="text-background">Calling</span>
          </h1>

          <p className="mt-5 text-background text-lg">
            Explore faith-friendly job opportunities across ministries,
            organizations, and companies worldwide.
          </p>
        </div>

        {/* SEARCH BAR */}
        <form
          onSubmit={handleSearch}
          className="mt-12 max-w-5xl mx-auto bg-card shadow-2xl rounded-3xl p-4 md:p-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Position */}
            <div className="flex items-center gap-3 border rounded-2xl px-4 py-4">
              <Briefcase className="text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Job title or keyword"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full bg-transparent outline-none text-base"
              />
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 border rounded-2xl px-4 py-4">
              <MapPin className="text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent outline-none text-base"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="h-full bg-primary text-primary-foreground rounded-2xl font-semibold text-base flex items-center justify-center gap-2 hover:opacity-90 transition py-4"
            >
              <Search size={20} />
              Search Jobs
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default JobHero;
