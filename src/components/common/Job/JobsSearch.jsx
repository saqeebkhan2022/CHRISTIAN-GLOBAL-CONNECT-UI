import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import json from "./json/Jobs.json";
import JobsList from "./JobsList";

const JobsSearch = () => {
  const [params, setParams] = useSearchParams();

  const [position, setPosition] = useState(params.get("position") || "");
  const [location, setLocation] = useState(params.get("location") || "");
  const [filters, setFilters] = useState({
    type: params.get("type") || "",
    category: params.get("category") || "",
  });
  const [sort, setSort] = useState(params.get("sort") || "latest");
  const [page, setPage] = useState(parseInt(params.get("page")) || 1);
  const [limit] = useState(5);

  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);

  // Filter, sort, paginate
  const fetchJobs = () => {
    let filteredJobs = [...json];

    if (position)
      filteredJobs = filteredJobs.filter((job) =>
        job.title.toLowerCase().includes(position.toLowerCase())
      );

    if (location)
      filteredJobs = filteredJobs.filter((job) =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );

    if (filters.type)
      filteredJobs = filteredJobs.filter((job) => job.type === filters.type);

    if (filters.category)
      filteredJobs = filteredJobs.filter(
        (job) => job.category === filters.category
      );

    // Sorting
    if (sort === "a-z")
      filteredJobs.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === "z-a")
      filteredJobs.sort((a, b) => b.title.localeCompare(a.title));
    else if (sort === "latest") filteredJobs = filteredJobs.reverse(); // assume JSON order
    // else oldest = original order

    // Pagination
    const start = (page - 1) * limit;
    setJobs(filteredJobs.slice(start, start + limit));
    setTotal(filteredJobs.length);
  };

  useEffect(() => {
    fetchJobs();
    // sync URL params
    const newParams = new URLSearchParams();
    if (position) newParams.set("position", position);
    if (location) newParams.set("location", location);
    if (filters.type) newParams.set("type", filters.type);
    if (filters.category) newParams.set("category", filters.category);
    if (sort) newParams.set("sort", sort);
    newParams.set("page", page);
    setParams(newParams);
  }, [position, location, filters, sort, page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row gap-6">
      {/* Sidebar filters */}
      <aside className="w-full md:w-64 bg-primary text-background border rounded p-4 space-y-4">
        <h3 className="font-bold mb-2">Filters</h3>

        <input
          type="text"
          placeholder="Search Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="border text-background rounded px-3 py-2 w-full"
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />

        <select
          name="type"
          value={filters.type}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, type: e.target.value }))
          }
          className="border rounded px-3 py-2 w-full"
        >
          <option value="">All Types</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="internship">Internship</option>
        </select>

        <select
          name="category"
          value={filters.category}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, category: e.target.value }))
          }
          className="border rounded px-3 py-2 w-full"
        >
          <option value="">All Categories</option>
          <option value="ministry">Ministry</option>
          <option value="company">Company</option>
          <option value="ngo">NGO</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
        </select>
      </aside>

      {/* Job list */}
      <div className="flex-1">
        <JobsList jobs={jobs} />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 border rounded ${
                  p === page ? "bg-primary text-background" : ""
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsSearch;
