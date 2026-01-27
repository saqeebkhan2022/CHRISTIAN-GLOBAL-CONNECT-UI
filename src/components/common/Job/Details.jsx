import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import json from "./json/Jobs.json";

import JobDetailsSkeleton from "./JobDetailsSkeleton";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApply, setShowApply] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const foundJob = json.find((j) => j.id === id);
      setJob(foundJob);
      setLoading(false);
    }, 800); // simulate API delay
  }, [id]);

  if (loading) return <JobDetailsSkeleton />;

  if (!job) return <p className="p-6">Job not found</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 pb-28">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm px-4 py-2 border rounded hover:bg-gray-100"
      >
        ← Back to Jobs
      </button>

      {/* Job Header */}
      <div className="bg-white border rounded-2xl p-5 sm:p-6 shadow-sm">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">{job.title}</h1>

        <p className="text-muted-foreground mb-3">
          {job.company} • {job.location}
        </p>

        <div className="flex flex-wrap gap-3 text-sm font-medium">
          <span className="px-3 py-1 rounded-full bg-gray-100">{job.type}</span>
          <span className="px-3 py-1 rounded-full bg-gray-100">
            {job.category}
          </span>
        </div>

        {/* Desktop Apply Button */}
        <div className="hidden sm:block mt-6">
          <button
            onClick={() => setShowApply(true)}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90"
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* Job Description */}
      <div className="mt-6 bg-white border rounded-2xl p-5 sm:p-6">
        <h2 className="text-lg font-semibold mb-3">Job Description</h2>
        <p className="text-sm leading-relaxed text-gray-700">
          {job.description}
        </p>
      </div>

      {/* Apply Form */}
      {showApply && (
        <div className="mt-6 bg-white border rounded-2xl p-5 sm:p-6">
          <h2 className="text-lg font-semibold mb-4">Apply for this Job</h2>

          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="border rounded-lg px-4 py-3 w-full"
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              className="border rounded-lg px-4 py-3 w-full"
              required
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="border rounded-lg px-4 py-3 w-full"
            />

            <input type="file" className="border rounded-lg px-4 py-3 w-full" />

            <textarea
              placeholder="Cover Letter"
              rows="4"
              className="border rounded-lg px-4 py-3 w-full sm:col-span-2"
            />

            <button
              type="submit"
              className="sm:col-span-2 mt-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90"
            >
              Submit Application
            </button>
          </form>
        </div>
      )}

      {/* Sticky Apply Button (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-white border-t p-3">
        <button
          onClick={() => setShowApply(true)}
          className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default Details;
