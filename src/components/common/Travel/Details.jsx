import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CalendarDays, Users, MapPin } from "lucide-react";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <img
        src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34"
        className="w-full h-72 object-cover rounded-3xl"
        alt="package"
      />

      <div className="mt-6 grid md:grid-cols-3 gap-8">
        {/* Info */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold">Rome Faith-Friendly Package</h1>

          <div className="flex gap-6 text-sm text-muted-foreground mt-3">
            <span className="flex gap-1 items-center">
              <CalendarDays size={14} /> 5 Nights
            </span>
            <span className="flex gap-1 items-center">
              <Users size={14} /> Couple / Family
            </span>
            <span className="flex gap-1 items-center">
              <MapPin size={14} /> Rome, Vatican
            </span>
          </div>

          <p className="mt-6 text-muted-foreground leading-relaxed">
            Experience a spiritually enriching journey with curated stays,
            guided pilgrimages, and faith-based hospitality.
          </p>
        </div>

        {/* Price Card */}
        <div className="bg-card shadow rounded-2xl p-6 h-fit">
          <p className="text-sm text-muted-foreground">Starting from</p>
          <p className="text-3xl font-bold text-primary mt-2">₹49,999</p>

          <button
            onClick={() => navigate(`/travel/booking/${id}`)}
            className="mt-6 w-full bg-primary text-white py-3 rounded-xl font-semibold"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
