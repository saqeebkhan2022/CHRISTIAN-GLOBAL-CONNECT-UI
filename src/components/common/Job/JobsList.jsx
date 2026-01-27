import React from "react";
import { useNavigate } from "react-router-dom";

const JobsList = ({ jobs }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="border rounded-xl p-4 sm:p-5 bg-white hover:shadow-md transition"
        >
          {/* Top section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold">{job.title}</h3>

              <p className="text-sm text-muted-foreground mt-1">
                {job.company} • {job.location}
              </p>

              <p className="text-sm mt-2">
                <span className="font-medium">Type:</span> {job.type}{" "}
                &nbsp;|&nbsp;
                <span className="font-medium">Category:</span> {job.category}
              </p>
            </div>

            {/* Button */}
            <div className="sm:self-start">
              <button
                onClick={() => navigate(`/jobs/${job.id}`)}
                className="w-full sm:w-auto px-5 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobsList;
