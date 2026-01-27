import React, { useEffect, useState } from "react";

const stats = [
  { label: "Active Job Listings", value: 1250 },
  { label: "Verified Employers", value: 430 },
  { label: "Countries Covered", value: 52 },
  { label: "Successful Placements", value: 9800 },
];

const Counter = ({ end }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = Math.ceil(end / (duration / 16));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return <span>{count.toLocaleString()}+</span>;
};

const JobStats = () => {
  return (
    <section className="bg-primary/5 py-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, idx) => (
          <div key={idx}>
            <p className="text-3xl md:text-4xl font-extrabold text-primary">
              <Counter end={stat.value} />
            </p>
            <p className="mt-2 text-sm font-medium text-muted-foreground">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default JobStats;
