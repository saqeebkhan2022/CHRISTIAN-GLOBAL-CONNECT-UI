import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeft, Filter, Lock } from "lucide-react";

import MatrimonySearchService from "../../../services/matrimony/search/SearchService";
import MatrimonyInterestService from "../../../services/matrimony/search/InterestService";

const LIMIT = 12;

const ProfilesPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [sentInterests, setSentInterests] = useState(new Set());

  const [filters, setFilters] = useState({
    gender: searchParams.get("lookingFor") === "bride" ? "FEMALE" : "MALE",
    country:
      searchParams.get("country") && searchParams.get("country") !== "all"
        ? searchParams.get("country")
        : "",
    denomination: "",
    ageMin: parseInt(searchParams.get("ageFrom"), 10) || 21,
    ageMax: parseInt(searchParams.get("ageTo"), 10) || 35,
  });

  /* -----------------------------
     FETCH PROFILES (FIXED)
  ------------------------------ */
  const fetchProfiles = useCallback(async () => {
    try {
      setLoading(true);

      const response = await MatrimonySearchService.searchProfiles(
        filters,
        page,
        LIMIT,
      );

      if (response?.success) {
        const payload = response.data || {};

        setProfiles(Array.isArray(payload.data) ? payload.data : []);
        setTotalCount(payload.count || 0);
        setIsUnlocked(payload.isProfileUnlockActive || false);
      } else {
        setProfiles([]);
        setTotalCount(0);
      }
    } catch (error) {
      console.error("Failed to fetch profiles:", error);
      setProfiles([]);
      setTotalCount(0);
      alert("Failed to load profiles");
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  /* Fetch on load & change */
  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  /* Reset page when filters change */
  useEffect(() => {
    setPage(1);
  }, [filters]);

  /* -----------------------------
     HELPERS
  ------------------------------ */
  const calculateAge = (dob) => {
    if (!dob) return null;
    const today = new Date();
    const birthDate = new Date(dob);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleSendInterest = async (e, profileId) => {
    e.stopPropagation();

    if (sentInterests.has(profileId)) return;

    try {
      const response = await MatrimonyInterestService.sendInterest(
        profileId,
        "Hi, I am interested in connecting with you!",
      );

      if (response?.success) {
        setSentInterests((prev) => new Set([...prev, profileId]));
        alert("Interest sent!");
      }
    } catch (error) {
      alert(error?.message || "Failed to send interest");
    }
  };

  const handleViewProfile = (profileId) => {
    navigate(`/matrimony/profiles/${profileId}/view`);
  };

  const totalPages = Math.ceil(totalCount / LIMIT);

  /* -----------------------------
     RENDER
  ------------------------------ */
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-gradient-to-br from-accent via-background to-secondary py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-primary hover:underline mb-4"
          >
            <ChevronLeft size={20} />
            Back to Search
          </button>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Search Results</h1>
              <p className="text-muted-foreground">
                Age: {filters.ageMin}-{filters.ageMax}
                {filters.country && ` • Country: ${filters.country}`}
                {filters.denomination &&
                  ` • Denomination: ${filters.denomination}`}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Found {totalCount} profiles
              </p>
            </div>

            <button
              onClick={() => setShowFilters((prev) => !prev)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border"
            >
              <Filter size={18} />
              Filters
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">Loading profiles...</div>
          ) : profiles.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold">No profiles found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                {profiles.map((profile) => (
                  <div
                    key={profile.id}
                    className="bg-white rounded-3xl shadow-2xl overflow-hidden w-72 hover:shadow-3xl transition-shadow duration-300 cursor-pointer"
                    onClick={() => handleViewProfile(profile.id)}
                  >
                    {/* Profile Image */}
                    {/* Profile Image */}
                    <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-200 relative">
                      {!profile.profilePhotoUrl || !profile.isUnlocked ? (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200">
                          <Lock className="w-16 h-16 text-slate-300 mb-4" />
                          <p className="text-slate-500 font-semibold">
                            Photo Locked
                          </p>
                          <p className="text-slate-400 text-sm mt-2">
                            Upgrade to view
                          </p>
                        </div>
                      ) : (
                        <img
                          src={profile.profilePhotoUrl}
                          alt={profile.fullName || "Profile"}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      )}

                      {/* Optional gradient overlay */}
                      {!isUnlocked && (
                        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                      )}
                    </div>

                    {/* Profile Info */}
                    <div className="p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">
                          {profile.User.fullName}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {profile?.age && `${profile.age} years`}
                          {profile?.denomination &&
                            ` • ${profile.denomination}`}
                          {profile?.city && ` • ${profile.city.toUpperCase()}`}
                          {profile?.state && `, ${profile.state.toUpperCase()}`}
                          {profile?.country &&
                            `, ${profile.country.toUpperCase()}`}
                        </p>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={async (e) => {
                          e.stopPropagation();

                          if (profile.hasSentInterest) return; // already sent

                          try {
                            const success = await handleSendInterest(
                              profile.userId,
                            ); // call API
                            if (success) {
                              // mark locally as sent
                              profile.hasSentInterest = true;
                              setProfiles((prev) =>
                                prev.map((p) =>
                                  p.userId === profile.userId
                                    ? { ...p, hasSentInterest: true }
                                    : p,
                                ),
                              );
                            }
                          } catch (err) {
                            console.error("Failed to send interest:", err);
                            alert("Failed to send interest");
                          }
                        }}
                        disabled={profile.hasSentInterest}
                        className={`mt-4 w-full py-2 rounded-lg font-medium text-white transition-colors duration-200 ${
                          profile.hasSentInterest
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-primary hover:bg-primary/90"
                        }`}
                      >
                        {profile.hasSentInterest
                          ? "Interest Already Sent"
                          : "Send Interest"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center gap-4 mt-8">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    Previous
                  </button>

                  <span>
                    Page {page} of {totalPages}
                  </span>

                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProfilesPage;
