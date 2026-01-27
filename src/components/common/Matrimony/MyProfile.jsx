import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Heart,
  Edit,
  Save,
  X,
  Camera,
  Upload,
  ShieldCheck,
  Ruler,
  Target,
  Utensils,
  Cigarette,
  GlassWater,
  Baby,
  Palette,
  Sparkles,
  Languages,
  Trash2,
  Plus,
} from "lucide-react";
import MatrimonyProfileService from "../../../services/matrimony/profile/ProfileService";
import PreferredDenomination from "./PreferredDenominationDropdown";

export default function MyProfile() {
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState(null);
  const [editData, setEditData] = useState({});
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(false);

  useEffect(() => {
    fetchProfile();
    fetchGalleryPhotos();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await MatrimonyProfileService.getOwnProfile();
      if (response.success && response.data) {
        setProfile(response.data);
        setEditData(response.data);
      }
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchGalleryPhotos = async () => {
    try {
      setLoadingGallery(true);
      const response = await MatrimonyProfileService.getGalleryPhotos();
      if (response.success) {
        setGalleryPhotos(response.data || []);
      }
    } catch (err) {
      console.error("Fetch gallery error", err);
    } finally {
      setLoadingGallery(false);
    }
  };

  const handleGalleryUpload = async (files) => {
    if (!files || files.length === 0) return;

    const totalPhotos = galleryPhotos.length + files.length;
    if (totalPhotos > 5) {
      alert(
        `You can only upload maximum 5 photos. Currently you have ${galleryPhotos.length}`
      );
      return;
    }

    try {
      const res = await MatrimonyProfileService.uploadGalleryPhotos(
        Array.from(files)
      );
      if (res.success) {
        await fetchGalleryPhotos();
        alert("Photos uploaded successfully!");
      } else {
        alert(res.message || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error", err);
      alert("Upload failed. Please try again.");
    }
  };

  const handleDeletePhoto = async (photoId) => {
    if (!window.confirm("Are you sure you want to delete this photo?")) return;

    try {
      const res = await MatrimonyProfileService.deleteGalleryPhoto(photoId);
      if (res.success) {
        await fetchGalleryPhotos();
        alert("Photo deleted successfully!");
      } else {
        alert(res.message || "Delete failed");
      }
    } catch (err) {
      console.error("Delete error", err);
      alert("Delete failed. Please try again.");
    }
  };

  const handleChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await MatrimonyProfileService.updateProfile(editData);
      if (response.success) {
        setProfile(response.data);
        setEditing(false);
      }
    } catch (err) {
      console.error("Save error", err);
    } finally {
      setSaving(false);
    }
  };

  const formatEnum = (val) => (val ? val.replace(/_/g, " ") : "Not Specified");

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );

  const getFullImageUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http")) return url; // already absolute
    return `http://localhost:5000${url}`; // prepend backend host
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* HEADER CARD */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="h-40 bg-primary relative">
            <div className="absolute top-6 right-8 flex gap-3">
              {editing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-5 py-2.5 bg-green-500  text-white rounded-xl text-sm font-bold transition"
                  >
                    <Save className="w-4 h-4" /> SAVE
                  </button>
                  <button
                    onClick={() => {
                      setEditing(false);
                      setEditData(profile);
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-bold transition"
                  >
                    <X className="w-4 h-4" /> CANCEL
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-xl text-sm font-bold backdrop-blur-md transition"
                >
                  <Edit className="w-4 h-4" /> EDIT PROFILE
                </button>
              )}
            </div>
          </div>

          <div className="px-12 pb-10 flex flex-col md:flex-row items-end gap-8 -mt-16">
            {/* Profile Photo */}
            <div className="relative w-48 h-48">
              <div className="w-48 h-48 rounded-3xl border-[6px] border-white bg-slate-100 overflow-hidden shadow-2xl relative flex items-center justify-center">
                {/* Image Preview */}

                <img
                  src={getFullImageUrl(
                    editData?.profilePhotoUrl || profile?.profilePhotoUrl
                  )}
                  alt="Profile"
                  className="w-full h-full object-fit-cover rounded-3xl"
                  onError={(e) => {
                    e.target.src =
                      "https://ui-avatars.com/api/?name=" +
                      profile?.User?.fullName;
                  }}
                />

                {editing && (
                  <>
                    {/* Hidden File Input */}
                    <input
                      type="file"
                      accept="image/*"
                      id="profile-upload"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;

                        try {
                          const res =
                            await MatrimonyProfileService.uploadProfilePhoto(
                              file
                            );

                          if (res.success) {
                            handleChange("profilePhotoUrl", res.data.photoUrl);
                          } else {
                            alert(res.message || "Upload failed");
                          }
                        } catch (err) {
                          console.error("Upload error", err);
                          alert("Upload failed. Please try again.");
                        }
                      }}
                    />

                    {/* Camera Icon Button */}
                    <label
                      htmlFor="profile-upload"
                      className="absolute bottom-2 right-2 bg-white p-2 rounded-xl shadow-md hover:bg-gray-100 cursor-pointer"
                    >
                      <Camera className="w-5 h-5 text-gray-700" />
                    </label>
                  </>
                )}
              </div>

              {/* Verified Badge */}
              {profile?.photoVerificationStatus === "VERIFIED" && (
                <div className="absolute -bottom-3 -right-3 bg-white p-1.5 rounded-2xl shadow-lg">
                  <div className="bg-green-500 text-white p-1.5 rounded-xl flex items-center gap-1">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="text-[10px] font-black pr-1 uppercase">
                      Verified
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Name & Basic Info */}
            <div className="mb-2 flex-1">
              {editing ? (
                <input
                  type="text"
                  value={editData?.User?.fullName || ""}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      user: {
                        ...(editData?.user || {}),
                        fullName: e.target.value,
                      },
                    })
                  }
                  className="text-4xl font-black text-slate-900 tracking-tight mb-1 w-full border-b border-gray-300"
                />
              ) : (
                <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-1">
                  {profile?.User?.fullName}
                </h1>
              )}

              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-slate-500 font-bold uppercase text-xs tracking-widest">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-primary" />
                  {editing ? (
                    <>
                      <input
                        type="text"
                        value={editData.city || ""}
                        onChange={(e) => handleChange("city", e.target.value)}
                        className="border-b border-gray-300 text-xs font-bold uppercase"
                      />
                      <input
                        type="text"
                        value={editData.state || ""}
                        onChange={(e) => handleChange("state", e.target.value)}
                        className="border-b border-gray-300 text-xs font-bold uppercase"
                      />

                      <input
                        type="text"
                        value={editData.country || ""}
                        onChange={(e) =>
                          handleChange("country", e.target.value)
                        }
                        className="border-b border-gray-300 text-xs font-bold uppercase"
                      />
                    </>
                  ) : (
                    `${profile?.city},${profile?.state}, ${profile?.country}`
                  )}
                </span>

                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-primary" />
                  {editing ? (
                    <input
                      type="text"
                      value={editData.occupation || ""}
                      onChange={(e) =>
                        handleChange("occupation", e.target.value)
                      }
                      className="border-b border-gray-300 text-xs font-bold uppercase"
                    />
                  ) : (
                    profile?.occupation
                  )}
                </span>

                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-primary" />{" "}
                  {profile?.profileCompleteness}% Complete
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* PHOTO GALLERY SECTION */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8 p-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">
              📸 Photo Gallery
            </h3>
            <span className="text-sm font-bold text-slate-600">
              {galleryPhotos.length}/5 Photos
            </span>
          </div>

          {/* Upload Area - Only in Edit Mode */}
          {editing && galleryPhotos.length < 5 && (
            <label className="flex items-center justify-center w-full p-8 border-2 border-dashed border-primary/30 rounded-2xl cursor-pointer hover:border-primary/60 transition mb-6 bg-primary/5">
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => handleGalleryUpload(e.target.files)}
                disabled={galleryPhotos.length >= 5}
              />
              <div className="text-center">
                <Plus className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-700">
                  Click to add photos
                </p>
                <p className="text-xs text-slate-500">
                  (Max {5 - galleryPhotos.length} more photos)
                </p>
              </div>
            </label>
          )}

          {/* Photos Grid */}
          {galleryPhotos.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {galleryPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="relative group rounded-xl overflow-hidden bg-gray-100"
                >
                  <img
                    src={
                      photo.photoUrl.startsWith("http")
                        ? photo.photoUrl
                        : `http://localhost:5000${photo.photoUrl}`
                    }
                    alt="Gallery"
                    className="w-full h-32 object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/150?text=Photo";
                    }}
                  />
                  {editing && (
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleDeletePhoto(photo.id)}
                        className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                        title="Delete photo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  {photo.isPrimary && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-[10px] font-bold rounded">
                      PRIMARY
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              <p className="text-sm font-semibold">No photos yet</p>
              {editing && (
                <p className="text-xs text-slate-400 mt-1">
                  Click above to add photos
                </p>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* LEFT SIDEBAR */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            <Section title="Quick Details">
              <InfoRow
                icon={<Mail />}
                label="Email"
                value={
                  editing ? (
                    <input
                      type="email"
                      value={editData?.User?.email || ""}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          User: {
                            ...(editData?.User || {}),
                            email: e.target.value,
                          },
                        })
                      }
                      className="border-b border-gray-300 w-full text-sm font-black text-slate-800"
                    />
                  ) : (
                    profile?.User?.email
                  )
                }
              />
              <InfoRow
                icon={<Heart />}
                label="Phone Number"
                value={
                  editing ? (
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={editData.User.phone ?? ""}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          phone: e.target.value,
                        })
                      }
                      className="border-b border-gray-300 w-full text-sm font-black text-slate-800"
                    />
                  ) : (
                    profile?.User?.phoneCountryCode + profile?.User?.phone
                  )
                }
              />

              <InfoRow
                icon={<Heart />}
                label="Status"
                value={
                  editing ? (
                    <select
                      value={editData.maritalStatus || ""}
                      onChange={(e) =>
                        handleChange("maritalStatus", e.target.value)
                      }
                      className="border-b border-gray-300 w-full text-sm font-black text-slate-800"
                    >
                      <option value="">Select marital status</option>
                      <option value="SINGLE">Single</option>
                      <option value="MARRIED">Married</option>
                      <option value="DIVORCED">Divorced</option>
                      <option value="WIDOWED">Widowed</option>
                    </select>
                  ) : (
                    formatEnum(profile?.maritalStatus)
                  )
                }
              />

              <InfoRow
                icon={<Languages />}
                label="Denomination"
                value={
                  editing ? (
                    <select
                      value={editData.denomination || ""}
                      onChange={(e) =>
                        handleChange("denomination", e.target.value)
                      }
                      className="border-b border-gray-300 w-full text-sm font-black text-slate-800"
                    >
                      <option value="">Select denomination</option>

                      <option value="CATHOLIC">Catholic</option>
                      <option value="BAPTIST">Baptist</option>
                      <option value="PROTESTANT">Protestant</option>
                      <option value="ORTHODOX">Orthodox</option>
                      <option value="PENTECOSTAL">Pentecostal</option>
                      <option value="EVANGELICAL">Evangelical</option>

                      <option value="METHODIST">Methodist</option>
                      <option value="PRESBYTERIAN">Presbyterian</option>
                      <option value="LUTHERAN">Lutheran</option>
                      <option value="ANGLICAN">Anglican</option>

                      <option value="NON_DENOMINATIONAL">
                        Non-denominational
                      </option>
                      <option value="OTHER">Other</option>
                    </select>
                  ) : (
                    formatEnum(profile?.denomination)
                  )
                }
              />

              <InfoRow
                icon={<Baby />}
                label="Children"
                value={
                  editing ? (
                    <input
                      type="number"
                      value={editData.childrenCount || 0}
                      onChange={(e) =>
                        handleChange("childrenCount", e.target.value)
                      }
                      className="border-b border-gray-300 w-full text-sm font-black text-slate-800"
                    />
                  ) : profile?.hasChildren ? (
                    `${profile.childrenCount} Children`
                  ) : (
                    "No Children"
                  )
                }
              />
            </Section>

            <Section title="Hobbies & Interests">
              <div className="flex flex-wrap gap-2 pt-2">
                {editing ? (
                  <>
                    {/* Hobbies */}
                    <div className="flex flex-wrap gap-2">
                      {(editData?.hobbies || []).map((h, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-1 px-3 py-1 bg-primary/20 text-primary text-[10px] font-black uppercase rounded-full"
                        >
                          {h}
                          <button
                            type="button"
                            onClick={() =>
                              handleChange(
                                "hobbies",
                                editData.hobbies.filter((_, idx) => idx !== i)
                              )
                            }
                            className="text-xs font-bold"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      {(editData?.hobbies?.length || 0) < 5 && (
                        <input
                          type="text"
                          placeholder="Add hobby"
                          className="border-b border-gray-300 w-32 text-sm p-1 rounded-md"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && e.target.value.trim()) {
                              const newHobby = e.target.value.trim();
                              if ((editData?.hobbies?.length || 0) < 5) {
                                handleChange("hobbies", [
                                  ...(editData?.hobbies || []),
                                  newHobby,
                                ]);
                                e.target.value = "";
                              }
                              e.preventDefault();
                            }
                          }}
                        />
                      )}
                    </div>

                    {/* Interests */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(editData?.interests || []).map((i, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1 px-3 py-1 bg-slate-200 text-slate-600 text-[10px] font-black uppercase rounded-full"
                        >
                          {i}
                          <button
                            type="button"
                            onClick={() =>
                              handleChange(
                                "interests",
                                editData.interests.filter(
                                  (_, index) => index !== idx
                                )
                              )
                            }
                            className="text-xs font-bold"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      {(editData?.interests?.length || 0) < 5 && (
                        <input
                          type="text"
                          placeholder="Add interest"
                          className="border-b border-gray-300 w-32 text-sm p-1 rounded-md"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && e.target.value.trim()) {
                              const newInterest = e.target.value.trim();
                              if ((editData?.interests?.length || 0) < 5) {
                                handleChange("interests", [
                                  ...(editData?.interests || []),
                                  newInterest,
                                ]);
                                e.target.value = "";
                              }
                              e.preventDefault();
                            }
                          }}
                        />
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {profile?.hobbies?.map((h, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase rounded-full"
                      >
                        # {h}
                      </span>
                    ))}
                    {profile?.interests?.map((h, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-black uppercase rounded-full"
                      >
                        # {h}
                      </span>
                    ))}
                  </>
                )}
              </div>
            </Section>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
              {/* Biography */}
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-4">
                Biography
              </h3>
              {editing ? (
                <textarea
                  value={editData.bio || ""}
                  onChange={(e) => handleChange("bio", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 text-lg italic text-slate-700 font-medium"
                  rows={4}
                />
              ) : (
                <p className="text-lg text-slate-700 font-medium leading-relaxed italic">
                  "{profile?.bio}"
                </p>
              )}

              <hr className="my-10 border-slate-100" />

              {/* DETAILS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Physical Appearance */}
                <DetailGrid title="Physical Appearance" icon={<Ruler />}>
                  <GridItem
                    label="Height"
                    value={
                      editing ? (
                        <input
                          type="number"
                          value={editData.height || ""}
                          onChange={(e) =>
                            handleChange("height", e.target.value)
                          }
                          className="border-b border-gray-300 w-full"
                        />
                      ) : (
                        `${profile?.height} cm`
                      )
                    }
                  />
                  <GridItem
                    label="Weight"
                    value={
                      editing ? (
                        <input
                          type="number"
                          value={editData.weight || ""}
                          onChange={(e) =>
                            handleChange("weight", e.target.value)
                          }
                          className="border-b border-gray-300 w-full"
                        />
                      ) : (
                        `${profile?.weight} kg` || "—"
                      )
                    }
                  />
                  <GridItem
                    label="Body Type"
                    value={
                      editing ? (
                        <select
                          value={editData.bodyType || ""}
                          onChange={(e) =>
                            handleChange("bodyType", e.target.value)
                          }
                          className="border-b border-gray-300 w-full"
                        >
                          <option value="">Select</option>
                          <option value="SLIM">Slim</option>
                          <option value="AVERAGE">Average</option>
                          <option value="ATHLETIC">Athletic</option>
                          <option value="HEAVY">Heavy</option>
                        </select>
                      ) : (
                        formatEnum(profile?.bodyType)
                      )
                    }
                  />
                  <GridItem
                    label="Skin Tone"
                    value={
                      editing ? (
                        <select
                          value={editData.skinTone || ""}
                          onChange={(e) =>
                            handleChange("skinTone", e.target.value)
                          }
                          className="border-b border-gray-300 w-full"
                        >
                          <option value="">Select</option>
                          <option value="FAIR">Fair</option>
                          <option value="MEDIUM">Medium</option>
                          <option value="DARK">Dark</option>
                        </select>
                      ) : (
                        formatEnum(profile?.skinTone)
                      )
                    }
                  />
                  <GridItem
                    label="Complexion"
                    value={
                      editing ? (
                        <input
                          type="text"
                          value={editData.complexion || ""}
                          onChange={(e) =>
                            handleChange("complexion", e.target.value)
                          }
                          className="border-b border-gray-300 w-full"
                        />
                      ) : (
                        profile?.complexion || "Not Disclosed"
                      )
                    }
                  />
                </DetailGrid>

                {/* Professional Life */}
                <DetailGrid title="Professional Life" icon={<GraduationCap />}>
                  <GridItem
                    label="Education"
                    value={
                      editing ? (
                        <select
                          value={editData.qualification || ""}
                          onChange={(e) =>
                            handleChange("qualification", e.target.value)
                          }
                          className="border-b border-gray-300 w-full"
                        >
                          <option value="">Select</option>
                          <option value="BACHELOR">Bachelor</option>
                          <option value="MASTER">Master</option>
                          <option value="PHD">PhD</option>
                        </select>
                      ) : (
                        formatEnum(profile?.qualification)
                      )
                    }
                  />
                  <GridItem
                    label="Industry"
                    value={
                      editing ? (
                        <input
                          type="text"
                          value={editData.industry || ""}
                          onChange={(e) =>
                            handleChange("industry", e.target.value)
                          }
                          className="border-b border-gray-300 w-full"
                        />
                      ) : (
                        profile?.industry || "Not Specified"
                      )
                    }
                  />
                  <GridItem
                    label="Occupation"
                    value={
                      editing ? (
                        <input
                          type="text"
                          value={editData.occupation || ""}
                          onChange={(e) =>
                            handleChange("occupation", e.target.value)
                          }
                          className="border-b border-gray-300 w-full"
                        />
                      ) : (
                        profile?.occupation
                      )
                    }
                  />
                  <GridItem
                    label="Annual Salary"
                    value={
                      editing ? (
                        <select
                          value={editData.salaryRange || ""}
                          onChange={(e) =>
                            handleChange("salaryRange", e.target.value)
                          }
                          className="border-b border-gray-300 w-full"
                        >
                          <option value="">Select Salary</option>
                          <option value="0-3L">0-3L</option>
                          <option value="3-5L">3-5L</option>
                          <option value="5-10L">5-10L</option>
                          <option value="10-15L">10-15L</option>
                          <option value="15-20L">15-20L</option>
                          <option value="20L+">20L+</option>
                        </select>
                      ) : (
                        profile?.salaryRange || "null"
                      )
                    }
                  />
                </DetailGrid>

                {/* Lifestyle */}
                <DetailGrid title="Lifestyle" icon={<Utensils />}>
                  <GridItem
                    label="Diet"
                    value={
                      editing ? (
                        <select
                          value={editData.diet || ""}
                          onChange={(e) => handleChange("diet", e.target.value)}
                          className="border-b border-gray-300 w-full"
                        >
                          <option value="">Select</option>
                          <option value="VEGETARIAN">Vegetarian</option>
                          <option value="NON_VEGETARIAN">Non Vegetarian</option>
                          <option value="VEGAN">Vegan</option>
                          <option value="EGGETARIAN">Eggetarian</option>
                        </select>
                      ) : (
                        formatEnum(profile?.diet)
                      )
                    }
                  />
                  <GridItem
                    label="Drinking"
                    value={
                      editing ? (
                        <select
                          value={editData.drinking || ""}
                          onChange={(e) =>
                            handleChange("drinking", e.target.value)
                          }
                          className="border-b border-gray-300 w-full"
                        >
                          <option value="NO">No</option>
                          <option value="YES">Yes</option>
                          <option value="OCCASIONALLY">Occasionally</option>
                        </select>
                      ) : (
                        profile?.drinking
                      )
                    }
                  />
                  <GridItem
                    label="Smoking"
                    value={
                      editing ? (
                        <select
                          value={editData.smoking || ""}
                          onChange={(e) =>
                            handleChange("smoking", e.target.value)
                          }
                          className="border-b border-gray-300 w-full"
                        >
                          <option value="NO">No</option>
                          <option value="YES">Yes</option>
                          <option value="OCCASIONALLY">Occasionally</option>
                        </select>
                      ) : (
                        profile?.smoking
                      )
                    }
                  />
                </DetailGrid>

                {/* Partner Preferences */}
                <DetailGrid title="Partner Preferences" icon={<Target />}>
                  <GridItem
                    label="Profile For"
                    value={
                      editing ? (
                        <select
                          value={editData.profileFor || ""}
                          onChange={(e) =>
                            handleChange("profileFor", e.target.value)
                          }
                          className="border-b border-gray-300 w-full"
                        >
                          <option value="">Select Profile For</option>
                          <option value="SELF">Self</option>
                          <option value="SON">Son</option>
                          <option value="DAUGHTER">Daughter</option>
                          <option value="SIBLING">Sibling</option>
                          <option value="OTHER_RELATIVE">Other Relative</option>
                          <option value="FRIEND">Friend</option>
                        </select>
                      ) : (
                        formatEnum(profile?.profileFor)
                      )
                    }
                  />
                  <GridItem
                    label="Age Preference"
                    value={
                      editing ? (
                        <div className="flex gap-2">
                          <input
                            type="number"
                            value={editData.agePreferenceMin || ""}
                            onChange={(e) =>
                              handleChange("agePreferenceMin", e.target.value)
                            }
                            className="border-b border-gray-300 w-1/2"
                          />
                          <input
                            type="number"
                            value={editData.agePreferenceMax || ""}
                            onChange={(e) =>
                              handleChange("agePreferenceMax", e.target.value)
                            }
                            className="border-b border-gray-300 w-1/2"
                          />
                        </div>
                      ) : (
                        `${profile?.agePreferenceMin} - ${profile?.agePreferenceMax} Years`
                      )
                    }
                  />
                  <GridItem
                    label="Height Preference"
                    value={
                      editing ? (
                        <div className="flex gap-2">
                          <input
                            type="number"
                            value={editData.heightPreferenceMin || ""}
                            onChange={(e) =>
                              handleChange(
                                "heightPreferenceMin",
                                e.target.value
                              )
                            }
                            className="border-b border-gray-300 w-1/2"
                          />
                          <input
                            type="number"
                            value={editData.heightPreferenceMax || ""}
                            onChange={(e) =>
                              handleChange(
                                "heightPreferenceMax",
                                e.target.value
                              )
                            }
                            className="border-b border-gray-300 w-1/2"
                          />
                        </div>
                      ) : profile?.heightPreferenceMin ? (
                        `${profile?.heightPreferenceMin} - ${profile?.heightPreferenceMax} cm`
                      ) : (
                        "—"
                      )
                    }
                  />
                  <GridItem
                    label="Preferred Qualification"
                    value={
                      editing ? (
                        <input
                          type="text"
                          value={
                            editData.preferredQualification.join(", ") || ""
                          }
                          onChange={(e) =>
                            handleChange(
                              "preferredQualification",
                              e.target.value.split(",").map((x) => x.trim())
                            )
                          }
                          className="border-b border-gray-300 w-full"
                        />
                      ) : (
                        profile?.preferredQualification.join(", ")
                      )
                    }
                  />
                  <GridItem
                    label="Preferred Denomination"
                    value={
                      editing ? (
                        <PreferredDenomination
                          value={editData.preferredDenomination || []}
                          onChange={(val) =>
                            handleChange("preferredDenomination", val)
                          }
                        />
                      ) : (
                        <span>
                          {profile?.preferredDenomination?.length
                            ? profile.preferredDenomination.join(", ")
                            : "Any"}
                        </span>
                      )
                    }
                  />
                  <GridItem
                    label="Visibility"
                    value={
                      editing ? (
                        <select
                          value={editData.profileVisibility || ""}
                          onChange={(e) =>
                            handleChange("profileVisibility", e.target.value)
                          }
                          className="border-b border-gray-300 w-full"
                        >
                          <option value="PUBLIC">Public</option>
                          <option value="PRIVATE">Private</option>
                          <option value="FRIENDS_ONLY">Friends Only</option>
                        </select>
                      ) : (
                        profile?.profileVisibility
                      )
                    }
                  />
                </DetailGrid>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- UI Helper Components ---
const Section = ({ title, children }) => (
  <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">
      {title}
    </h3>
    <div className="space-y-5">{children}</div>
  </div>
);

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-4">
    <div className="p-2 bg-slate-50 text-primary rounded-xl">
      {React.cloneElement(icon, { size: 18 })}
    </div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">
        {label}
      </p>
      <div className="text-sm font-black text-slate-800">{value || "N/A"}</div>
    </div>
  </div>
);

const DetailGrid = ({ title, icon, children }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-2 text-primary">
      {React.cloneElement(icon, { size: 16 })}
      <span className="text-[10px] font-black uppercase tracking-widest">
        {title}
      </span>
    </div>
    <div className="grid grid-cols-2 gap-x-4 gap-y-6">{children}</div>
  </div>
);

const GridItem = ({ label, value }) => (
  <div>
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">
      {label}
    </p>
    <div className="text-sm font-black text-slate-800 uppercase tracking-tight leading-tight">
      {value || "—"}
    </div>
  </div>
);
