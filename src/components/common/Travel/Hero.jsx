import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Users, CalendarDays, Search, Minus, Plus } from "lucide-react";

const destinations = [
  "Rome",
  "Vatican City",
  "Jerusalem",
  "Goa",
  "Kerala",
  "Paris",
  "Dubai",
  "London",
];

const tripTypes = ["Couple", "Friends", "Honeymoon", "Family"];

export default function TravelHero() {
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");
  const [showDest, setShowDest] = useState(false);
  const [tripType, setTripType] = useState("Couple");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [showGuests, setShowGuests] = useState(false);

  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [rooms, setRooms] = useState(1);

  const filtered = destinations.filter((d) =>
    d.toLowerCase().includes(destination.toLowerCase())
  );

  const handleSearch = () => {
    const params = new URLSearchParams({
      destination,
      type: tripType,
      checkIn,
      checkOut,
      adults,
      children,
      infants,
      rooms,
    });
    navigate(`/travel/search?${params.toString()}`);
  };

  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl font-extrabold">
          Plan Your Perfect <span className="text-primary">Journey</span>
        </h1>

        {/* Trip Type */}
        <div className="mt-6 flex gap-3 justify-start sm:justify-center overflow-x-auto pb-2">
          {tripTypes.map((type) => (
            <label
              key={type}
              className={`px-5 py-2 rounded-full whitespace-nowrap border text-sm font-medium cursor-pointer
                ${
                  tripType === type
                    ? "bg-primary text-white border-primary"
                    : "bg-card"
                }`}
            >
              <input
                type="radio"
                hidden
                checked={tripType === type}
                onChange={() => setTripType(type)}
              />
              {type}
            </label>
          ))}
        </div>

        {/* Search Card */}
        <div
          className="mt-10 bg-card shadow-xl rounded-3xl p-4 sm:p-6
                        flex flex-col sm:flex-row gap-4 max-w-6xl mx-auto"
        >
          {/* Destination */}
          <div className="relative w-full sm:flex-1">
            <div className="border rounded-xl px-4 py-4 flex gap-2">
              <MapPin size={18} />
              <input
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setShowDest(true);
                }}
                onFocus={() => setShowDest(true)}
                placeholder="Destination"
                className="outline-none bg-transparent text-sm w-full"
              />
            </div>

            {showDest && destination && (
              <div className="absolute z-30 bg-card border rounded-xl mt-2 w-full max-h-56 overflow-auto shadow-lg">
                {filtered.map((d) => (
                  <div
                    key={d}
                    onClick={() => {
                      setDestination(d);
                      setShowDest(false);
                    }}
                    className="px-4 py-3 text-sm hover:bg-muted cursor-pointer"
                  >
                    {d}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dates */}
          <div className="flex gap-2 w-full sm:flex-1">
            <DateInput value={checkIn} setValue={setCheckIn} />
            <DateInput value={checkOut} setValue={setCheckOut} />
          </div>

          {/* Guests */}
          <div className="relative w-full sm:flex-1">
            <div
              onClick={() => setShowGuests(!showGuests)}
              className="border rounded-xl px-4 py-4 flex gap-2 cursor-pointer"
            >
              <Users size={18} />
              <span className="text-sm">
                {adults + children} Guests · {rooms} Room
              </span>
            </div>

            {showGuests && (
              <div className="absolute z-30 bg-card border rounded-xl mt-2 w-full shadow-xl p-4 space-y-4">
                <Counter label="Adults" value={adults} set={setAdults} />
                <Counter
                  label="Children"
                  sub="5–17"
                  value={children}
                  set={setChildren}
                />
                <Counter
                  label="Infants"
                  sub="<5"
                  value={infants}
                  set={setInfants}
                />
                <hr />
                <Counter label="Rooms" value={rooms} set={setRooms} />
              </div>
            )}
          </div>

          {/* Desktop Search */}
          <button
            onClick={handleSearch}
            className="hidden sm:flex bg-primary text-white px-10 rounded-xl items-center gap-2 font-semibold"
          >
            <Search size={18} />
            Search
          </button>
        </div>

        {/* Mobile Search Button */}
        <div className="sm:hidden fixed bottom-4 left-4 right-4 z-40">
          <button
            onClick={handleSearch}
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex justify-center gap-2"
          >
            <Search size={18} />
            Search Trips
          </button>
        </div>
      </div>
    </section>
  );
}

/* Helpers */

const DateInput = ({ value, setValue }) => (
  <div className="border rounded-xl px-4 py-4 flex gap-2 w-full">
    <CalendarDays size={18} />
    <input
      type="date"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="outline-none bg-transparent text-sm w-full"
    />
  </div>
);

const Counter = ({ label, sub, value, set }) => (
  <div className="flex justify-between items-center">
    <div>
      <p className="font-medium">{label}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
    <div className="flex items-center gap-3">
      <button
        onClick={() => set(Math.max(0, value - 1))}
        className="border rounded-full p-1"
      >
        <Minus size={14} />
      </button>
      <span className="w-6 text-center">{value}</span>
      <button
        onClick={() => set(value + 1)}
        className="border rounded-full p-1"
      >
        <Plus size={14} />
      </button>
    </div>
  </div>
);
