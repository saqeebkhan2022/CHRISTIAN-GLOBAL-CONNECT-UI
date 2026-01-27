import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  FileText,
  Heart,
  Users,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Check,
  ChevronRight,
  Upload,
} from "lucide-react";
import MatrimonyProfileService from "../../../services/matrimony/profile/ProfileService";
import MatrimonyAuthService from "../../../services/matrimony/auth/AuthService";

const STEPS = [
  { id: 1, title: "Basic Info", icon: User },
  { id: 2, title: "Location & Work", icon: MapPin },
  { id: 3, title: "Preferences", icon: Heart },
  { id: 4, title: "Photo", icon: Upload },
];

export default function CreateProfile() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    denomination: "",
    maritalStatus: "",
    bodyType: "",
    height: "",
    bio: "",

    // Step 2: Location & Work
    country: "",
    city: "",
    occupation: "",
    qualification: "",

    // Step 3: Preferences
    gender: "",
    ageMin: 21,
    ageMax: 35,
    interests: "",
    hobbies: "",

    // Step 4: Photo
    profilePhotoUrl: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep = () => {
    if (currentStep === 1) {
      if (!formData.denomination || !formData.bodyType || !formData.height) {
        setError("Please fill all required fields");
        return false;
      }
    } else if (currentStep === 2) {
      if (
        !formData.country ||
        !formData.city ||
        !formData.occupation ||
        !formData.qualification
      ) {
        setError("Please fill all required fields");
        return false;
      }
    } else if (currentStep === 3) {
      if (!formData.gender || !formData.interests) {
        setError("Please fill all required fields");
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (currentStep !== STEPS.length) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Create profile first (without photo)
      const profileData = {
        denomination: formData.denomination.toUpperCase(),
        maritalStatus: formData.maritalStatus, // Already uppercase from dropdown
        bodyType: formData.bodyType, // Already uppercase from dropdown
        height: formData.height,
        bio: formData.bio,
        country: formData.country,
        city: formData.city,
        occupation: formData.occupation,
        qualification: String(formData.qualification).trim(),
        gender: formData.gender.toUpperCase(),
        ageMin: parseInt(formData.ageMin),
        ageMax: parseInt(formData.ageMax),
        interests: formData.interests.split(",").map((i) => i.trim()),
        hobbies: formData.hobbies.split(",").map((h) => h.trim()),
      };

      const response = await MatrimonyProfileService.createProfile(profileData);

      if (response.success) {
        // Upload photo if selected (after profile is created)
        if (photoFile) {
          try {
            const uploadFormData = new FormData();
            uploadFormData.append("photo", photoFile);
            const photoResponse =
              await MatrimonyProfileService.uploadProfilePhoto(photoFile);
            if (photoResponse.success) {
              // Photo uploaded successfully
            }
          } catch (photoError) {
            // Photo upload failed (non-critical)
          }
        }

        // Redirect to profile page
        navigate("/matrimony/my-profile", { replace: true });
      }
    } catch (err) {
      setError(err.message || "Failed to create profile");
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Denomination *
        </label>
        <select
          name="denomination"
          value={formData.denomination}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
        >
          <option value="">Select denomination</option>
          <option value="Catholic">Catholic</option>
          <option value="Baptist">Baptist</option>
          <option value="Methodist">Methodist</option>
          <option value="Presbyterian">Presbyterian</option>
          <option value="Pentecostal">Pentecostal</option>
          <option value="Lutheran">Lutheran</option>
          <option value="Anglican">Anglican</option>
          <option value="Non-denominational">Non-denominational</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Marital Status *
        </label>
        <select
          name="maritalStatus"
          value={formData.maritalStatus}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
        >
          <option value="">Select marital status</option>
          <option value="SINGLE">Single</option>
          <option value="DIVORCED">Divorced</option>
          <option value="WIDOWED">Widowed</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Body Type *
        </label>
        <select
          name="bodyType"
          value={formData.bodyType}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
        >
          <option value="">Select body type</option>
          <option value="SLIM">Slim</option>
          <option value="ATHLETIC">Athletic</option>
          <option value="AVERAGE">Average</option>
          <option value="HEAVY">Heavy</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Height (cm) *
        </label>
        <input
          type="number"
          name="height"
          value={formData.height}
          onChange={handleInputChange}
          placeholder="e.g., 170"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          About You
        </label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          placeholder="Tell us about yourself..."
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        Location & Profession
      </h2>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Country *
        </label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          placeholder="e.g., India, USA, Canada"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          City *
        </label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          placeholder="e.g., Mumbai, New York"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Occupation *
        </label>
        <input
          type="text"
          name="occupation"
          value={formData.occupation}
          onChange={handleInputChange}
          placeholder="e.g., Software Engineer, Teacher"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Qualification *
        </label>
        <select
          name="qualification"
          value={formData.qualification}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
        >
          <option value="">Select qualification</option>
          <option value="HIGH_SCHOOL">High School</option>
          <option value="DIPLOMA">Diploma</option>
          <option value="BACHELOR">Bachelor's</option>
          <option value="MASTER">Master's</option>
          <option value="PHD">PhD</option>
          <option value="PROFESSIONAL">Professional</option>
        </select>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Preferences</h2>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Looking For *
        </label>
        <div className="flex gap-4">
          {["Male", "Female"].map((gender) => (
            <label key={gender} className="flex items-center">
              <input
                type="radio"
                name="gender"
                value={gender}
                checked={formData.gender === gender}
                onChange={handleInputChange}
                className="w-4 h-4 text-rose-500"
              />
              <span className="ml-2 text-gray-700">{gender}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Min Age *
          </label>
          <input
            type="number"
            name="ageMin"
            value={formData.ageMin}
            onChange={handleInputChange}
            min="18"
            max="80"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Max Age *
          </label>
          <input
            type="number"
            name="ageMax"
            value={formData.ageMax}
            onChange={handleInputChange}
            min="18"
            max="80"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Interests (comma-separated) *
        </label>
        <input
          type="text"
          name="interests"
          value={formData.interests}
          onChange={handleInputChange}
          placeholder="e.g., Reading, Sports, Travel, Cooking"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Hobbies (comma-separated)
        </label>
        <input
          type="text"
          name="hobbies"
          value={formData.hobbies}
          onChange={handleInputChange}
          placeholder="e.g., Hiking, Painting, Music"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
        />
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Profile Photo</h2>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        {photoPreview ? (
          <div>
            <img
              src={photoPreview}
              alt="Preview"
              className="w-48 h-48 object-cover rounded-lg mx-auto mb-4"
            />
            <button
              type="button"
              onClick={() => {
                setPhotoFile(null);
                setPhotoPreview(null);
              }}
              className="text-rose-600 hover:text-rose-700 font-medium"
            >
              Change Photo
            </button>
          </div>
        ) : (
          <div>
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <label className="cursor-pointer">
              <span className="text-rose-600 hover:text-rose-700 font-medium">
                Click to upload
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
            <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 5MB</p>
          </div>
        )}
      </div>

      <p className="text-sm text-gray-600">
        📸 A clear profile photo increases your chances of getting matches!
      </p>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {STEPS.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center flex-1"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                      isActive
                        ? "bg-primary text-white"
                        : isCompleted
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <StepIcon className="w-6 h-6" />
                    )}
                  </div>
                  <p
                    className={`text-xs text-center font-semibold ${
                      isActive ? "text-primary" : "text-gray-600"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {currentStep < STEPS.length ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold  transition"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Profile..." : "Complete Profile"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
