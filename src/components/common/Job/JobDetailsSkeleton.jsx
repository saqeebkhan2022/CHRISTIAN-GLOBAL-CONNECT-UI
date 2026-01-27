const JobDetailsSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 animate-pulse">
      <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>

      <div className="bg-white border rounded-2xl p-6 space-y-4">
        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>

        <div className="flex gap-3">
          <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      <div className="mt-6 bg-white border rounded-2xl p-6 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-40"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  );
};

export default JobDetailsSkeleton;
