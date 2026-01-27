import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Heart,
  MessageCircle,
  Lock,
  ChevronLeft,
  ShieldCheck,
  Info,
  MapPin,
  Calendar,
  Briefcase,
  Users,
  BookOpen,
  Utensils,
  Music,
  Image,
} from "lucide-react";
import { MdMale, MdFemale } from "react-icons/md";
import MatrimonyProfileService from "../../../services/matrimony/profile/ProfileService";
import MatrimonyInterestService from "../../../services/matrimony/search/InterestService";
import PlanModal from "./PlanModal";
import MessageDrawer from "./Messages";

export default function ViewProfile() {
  const { profileId } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [interestSent, setInterestSent] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [error, setError] = useState(null);
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [rating, setRating] = useState(null);
  const [label, setLabel] = useState(null);

  const recipientUserId = profile?.userId || profile?.user?.id || null;

  useEffect(() => {
    if (!profileId || profileId === "undefined") {
      setError("Invalid profile ID");
      setIsLoading(false);
      return;
    }
    fetchProfile();
  }, [profileId]);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await MatrimonyProfileService.getProfile(profileId);

      if (response.success || response.requiresUnlock) {
        setProfile(response.data);
        setIsLocked(response.requiresUnlock || response.data.locked || false);
        setRating(response.match?.rating || null);
        setLabel(response.match?.label || null);
        // Only fetch gallery if profile is unlocked
        if (!response.requiresUnlock && !response.data.locked) {
          fetchGalleryPhotos();
        }
      } else {
        setError(response.message || "Failed to load profile");
      }
    } catch (err) {
      setError(err.message || "Failed to load profile");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGalleryPhotos = async () => {
    try {
      // Note: This would need a backend endpoint to fetch photos for a specific user
      // For now, we'll fetch the gallery from the current profile's photos if available
      const response = await MatrimonyProfileService.getGalleryPhotos();
      if (response.success) {
        setGalleryPhotos(response.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch gallery photos:", err);
    }
  };

  const handleSendInterest = async () => {
    if (!recipientUserId) return;

    try {
      const response = await MatrimonyInterestService.sendInterest(
        recipientUserId,
        "Interested in connecting."
      );
      if (response.success) {
        setInterestSent(true);
        alert("Interest sent successfully!");
      }
    } catch (err) {
      alert(err.message || "Failed to send interest");
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 max-w-md">
            <div className="text-5xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Profile Not Found
            </h2>
            <p className="text-slate-600 mb-6">{error}</p>
            <button
              onClick={() => navigate("/matrimony")}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );

  if (!profile) return null;

  const getPhotoUrl = (photoObj) => {
    if (!photoObj) return null;
    if (typeof photoObj === "string") return photoObj;
    return photoObj.photoUrl || photoObj.url;
  };

  const profilePhoto =
    profile.profilePhotoUrl || getPhotoUrl(profile.profilePhoto);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-600 hover:text-primary font-semibold transition-colors"
          >
            <ChevronLeft className="w-5 h-5" /> Back
          </button>
          {profile.isVerified && (
            <span className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 sm:px-4 py-2 rounded-full border border-emerald-200 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> Verified
            </span>
          )}
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* LEFT: Profile Image */}
          <div className="md:col-span-3 lg:col-span-4 sticky top-24 h-fit">
            <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="relative aspect-[3/4] bg-gradient-to-br from-slate-100 to-slate-200">
                {profilePhoto && !isLocked ? (
                  <img
                    src={profilePhoto}
                    className="w-full h-full object-cover"
                    alt="Profile"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200">
                    <Lock className="w-16 h-16 text-slate-300 mb-4" />
                    <p className="text-slate-500 font-semibold">Photo Locked</p>
                    <p className="text-slate-400 text-sm mt-2">
                      Upgrade to view
                    </p>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
                    {profile.User?.fullName || "User"}{" "}
                  </h1>
                  <p className="text-white/90 text-base sm:text-lg mt-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">
                      {profile.city || "City"}, {profile.country || "Country"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* MIDDLE & RIGHT: Details and Actions */}
          <div className="md:col-span-3 lg:col-span-8 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {profile.age && (
                <div className="bg-white rounded-2xl p-4 border border-slate-200 text-center">
                  <p className="text-slate-500 text-sm font-medium">Age</p>
                  <p className="text-2xl font-bold text-primary mt-1">
                    {profile.age} Years
                  </p>
                </div>
              )}
              {profile.gender && (
                <div className="bg-white rounded-2xl p-4 border border-slate-200 text-center flex flex-col items-center gap-1">
                  <p className="text-slate-500 text-sm font-medium">Gender</p>
                  <p className="text-lg font-bold text-slate-900 mt-1 capitalize flex items-center justify-center gap-2">
                    {profile.gender === "MALE" && (
                      <MdMale className="text-blue-500 text-xl" />
                    )}
                    {profile.gender === "FEMALE" && (
                      <MdFemale className="text-pink-500 text-xl" />
                    )}
                    {profile.gender}
                  </p>
                </div>
              )}
              {profile.denomination && (
                <div className="bg-white rounded-2xl p-4 border border-slate-200 text-center">
                  <p className="text-slate-500 text-sm font-medium">
                    Denomination
                  </p>
                  <p className="text-lg font-bold text-slate-900 mt-1">
                    {profile.denomination}
                  </p>
                </div>
              )}
            </div>

            {/* About Section */}
            {profile.bio && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-200">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <Info className="w-6 h-6 text-primary flex-shrink-0" /> About
                </h3>
                <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
                  {isLocked
                    ? "Upgrade your plan to read the full bio."
                    : profile.bio}
                </p>
              </div>
            )}

            {/* Detailed Information */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-200">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-primary flex-shrink-0" />{" "}
                Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {profile.occupation && (
                  <div className="flex items-start gap-4">
                    <Briefcase className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-slate-500 text-sm font-medium">
                        Occupation
                      </p>
                      <p className="text-slate-900 font-semibold mt-1">
                        {profile.occupation}
                      </p>
                    </div>
                  </div>
                )}
                {profile.qualification && (
                  <div className="flex items-start gap-4">
                    <BookOpen className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-slate-500 text-sm font-medium">
                        Education
                      </p>
                      <p className="text-slate-900 font-semibold mt-1">
                        {profile.qualification}
                      </p>
                    </div>
                  </div>
                )}
                {profile.caste && (
                  <div className="flex items-start gap-4">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-slate-500 text-sm font-medium">
                        Caste
                      </p>
                      <p className="text-slate-900 font-semibold mt-1">
                        {profile.caste}
                      </p>
                    </div>
                  </div>
                )}
                {profile.motherTongue && (
                  <div className="flex items-start gap-4">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-slate-500 text-sm font-medium">
                        Mother Tongue
                      </p>
                      <p className="text-slate-900 font-semibold mt-1">
                        {profile.motherTongue}
                      </p>
                    </div>
                  </div>
                )}
                {profile.industry && (
                  <div className="flex items-start gap-4">
                    <Briefcase className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-slate-500 text-sm font-medium">
                        Industry
                      </p>
                      <p className="text-slate-900 font-semibold mt-1">
                        {profile.industry}
                      </p>
                    </div>
                  </div>
                )}
                {profile.salaryRange && (
                  <div className="flex items-start gap-4">
                    <Briefcase className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-slate-500 text-sm font-medium">
                        Salary Range
                      </p>
                      <p className="text-slate-900 font-semibold mt-1">
                        {profile.salaryRange}
                      </p>
                    </div>
                  </div>
                )}
                {profile.maritalStatus && (
                  <div className="flex items-start gap-4">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-slate-500 text-sm font-medium">
                        Marital Status
                      </p>
                      <p className="text-slate-900 font-semibold mt-1 capitalize">
                        {profile.maritalStatus}
                      </p>
                    </div>
                  </div>
                )}
                {profile.denomination && (
                  <div className="flex items-start gap-4">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-slate-500 text-sm font-medium">
                        Denomination
                      </p>
                      <p className="text-slate-900 font-semibold mt-1 capitalize">
                        {profile.denomination}
                      </p>
                    </div>
                  </div>
                )}
                {profile.height && (
                  <div className="flex items-start gap-4">
                    <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-slate-500 text-sm font-medium">
                        Height
                      </p>
                      <p className="text-slate-900 font-semibold mt-1">
                        {profile.height} cm
                      </p>
                    </div>
                  </div>
                )}
                {profile.bodyType && (
                  <div className="flex items-start gap-4">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-slate-500 text-sm font-medium">
                        Body Type
                      </p>
                      <p className="text-slate-900 font-semibold mt-1 capitalize">
                        {profile.bodyType}
                      </p>
                    </div>
                  </div>
                )}
                {profile.skinTone && (
                  <div className="flex items-start gap-4">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-slate-500 text-sm font-medium">
                        Skin Tone
                      </p>
                      <p className="text-slate-900 font-semibold mt-1 capitalize">
                        {profile.skinTone}
                      </p>
                    </div>
                  </div>
                )}
                {profile.diet && (
                  <div className="flex items-start gap-4">
                    <Utensils className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-slate-500 text-sm font-medium">Diet</p>
                      <p className="text-slate-900 font-semibold mt-1 capitalize">
                        {profile.diet.replace(/_/g, " ")}
                      </p>
                    </div>
                  </div>
                )}
                {profile.smoking && (
                  <div className="flex items-start gap-4">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-slate-500 text-sm font-medium">
                        Smoking
                      </p>
                      <p className="text-slate-900 font-semibold mt-1">
                        {profile.smoking}
                      </p>
                    </div>
                  </div>
                )}
                {profile.drinking && (
                  <div className="flex items-start gap-4">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-slate-500 text-sm font-medium">
                        Drinking
                      </p>
                      <p className="text-slate-900 font-semibold mt-1">
                        {profile.drinking}
                      </p>
                    </div>
                  </div>
                )}
                {profile.state && (
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-slate-500 text-sm font-medium">
                        State
                      </p>
                      <p className="text-slate-900 font-semibold mt-1">
                        {profile.state}
                      </p>
                    </div>
                  </div>
                )}
                {profile.profileFor && (
                  <div className="flex items-start gap-4">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-slate-500 text-sm font-medium">
                        Profile For
                      </p>
                      <p className="text-slate-900 font-semibold mt-1 capitalize">
                        {profile.profileFor}
                      </p>
                    </div>
                  </div>
                )}
                {profile.lookingFor && (
                  <div className="flex items-start gap-4">
                    <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-slate-500 text-sm font-medium">
                        Looking For
                      </p>
                      <p className="text-slate-900 font-semibold mt-1 capitalize">
                        {profile.lookingFor}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Interests & Hobbies */}
            {(profile.interests || profile.hobbies) && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-200">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Music className="w-6 h-6 text-primary flex-shrink-0" />
                  Interests & Hobbies
                </h3>
                <div className="space-y-4">
                  {profile.interests && (
                    <div>
                      <p className="text-slate-600 font-medium mb-3">
                        Interests
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {(Array.isArray(profile.interests)
                          ? profile.interests
                          : profile.interests.split(",")
                        ).map((interest, idx) => (
                          <span
                            key={idx}
                            className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium"
                          >
                            {typeof interest === "string"
                              ? interest.trim()
                              : interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {profile.hobbies && (
                    <div>
                      <p className="text-slate-600 font-medium mb-3">Hobbies</p>
                      <div className="flex flex-wrap gap-2">
                        {(Array.isArray(profile.hobbies)
                          ? profile.hobbies
                          : profile.hobbies.split(",")
                        ).map((hobby, idx) => (
                          <span
                            key={idx}
                            className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-medium"
                          >
                            {typeof hobby === "string" ? hobby.trim() : hobby}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Photo Gallery - Only show if profile is unlocked */}
            {!isLocked && galleryPhotos && galleryPhotos.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Image className="w-6 h-6" />
                  Photo Gallery
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {galleryPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    >
                      <img
                        src={photo.photoUrl}
                        alt="Gallery"
                        className="w-full h-40 object-cover"
                      />
                      {photo.isPrimary && (
                        <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded text-xs font-semibold">
                          Primary
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Actions Sidebar */}
          <div className="md:col-span-3 lg:col-span-4 lg:sticky lg:top-24 lg:h-fit space-y-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-4">
              <button
                onClick={handleSendInterest}
                disabled={interestSent || isLocked || !recipientUserId}
                className="w-full py-3 sm:py-4 bg-gradient-to-r from-primary to-primary/90 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-primary/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                <Heart
                  className={`w-5 h-5 ${interestSent ? "fill-white" : ""}`}
                />
                {interestSent ? "Interest Sent" : "Send Interest"}
              </button>

              <button
                onClick={() =>
                  showMessages || recipientUserId ? setShowMessages(true) : null
                }
                disabled={isLocked || !recipientUserId}
                className="w-full py-3 sm:py-4 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-2xl font-bold flex items-center justify-center gap-2 border border-slate-300 transition-all disabled:opacity-60 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                <MessageCircle className="w-5 h-5" /> Message
              </button>

              {isLocked && (
                <button
                  onClick={() => setShowPlanModal(true)}
                  className="w-full py-3 sm:py-4 bg-gradient-to-r from-amber-50 to-amber-100 text-amber-900 rounded-2xl font-bold border border-amber-200 flex items-center justify-center gap-2 hover:shadow-lg hover:bg-amber-200 transition-all text-sm sm:text-base"
                >
                  <Lock className="w-4 h-4" /> Unlock Profile
                </button>
              )}
            </div>

            {/* Profile Badge */}
            {profile.isVerified && (
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl p-6 border border-emerald-200 text-center">
                <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                <p className="text-emerald-900 font-semibold">
                  Verified Member
                </p>
                <p className="text-emerald-700 text-xs mt-2">
                  This profile has been verified
                </p>
              </div>
            )}

            {/* Match Rating Badge - Display match info if available */}
            {typeof window !== "undefined" &&
              window.location.pathname.includes("/profile") && (
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-6 border border-blue-200 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Heart className="w-6 h-6 text-blue-600 fill-blue-600" />
                    <span className="text-2xl font-bold text-blue-900">
                      Match
                    </span>
                  </div>
                  <p className="text-blue-900 font-semibold text-lg">
                    {rating + "%" || "Compatibility Analysis"}
                  </p>
                  <p className="text-blue-900 font-semibold text-lg">
                    {label || "Compatibility Analysis"}
                  </p>
                  <p className="text-blue-700 text-xs mt-2">
                    Based on profile compatibility
                  </p>
                </div>
              )}
          </div>
        </div>
      </main>

      <PlanModal
        isOpen={showPlanModal}
        onClose={() => setShowPlanModal(false)}
      />

      {showMessages && recipientUserId && (
        <MessageDrawer
          profileId={profileId}
          otherUserId={recipientUserId}
          onClose={() => setShowMessages(false)}
        />
      )}
    </div>
  );
}
