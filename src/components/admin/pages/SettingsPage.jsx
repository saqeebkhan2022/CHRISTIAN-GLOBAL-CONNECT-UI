import React from "react";
import {
  Save,
  Globe,
  Mail,
  DollarSign,
  Lock,
  Heart,
  Shield,
} from "lucide-react";

export default function SettingsPage() {
  // Common input classes for consistency
  const inputClass =
    "w-full border border-[#E6D3DA] rounded-lg px-4 py-2 text-gray-700 focus:border-[#7A1F3D] focus:ring focus:ring-[#7A1F3D]/20 transition duration-150 ease-in-out";
  const sectionHeaderClass =
    "flex items-center bg-[#F6E7EC] p-4 border-b border-[#E6D3DA]";

  const settingsData = {
    general: [
      {
        id: "siteName",
        label: "Website Name",
        type: "text",
        placeholder: "Christian Global Connect",
        defaultValue: "Christian Global Connect",
      },
      {
        id: "tagline",
        label: "Site Tagline / Slogan",
        type: "text",
        placeholder: "Find your life partner in Christ.",
        defaultValue: "Find your life partner in Christ.",
      },
      {
        id: "supportEmail",
        label: "Support Email",
        type: "email",
        icon: <Mail className="w-4 h-4 mr-1 text-gray-500" />,
        placeholder: "support@example.com",
        defaultValue: "support@admin.com",
      },
    ],
    monetization: [
      {
        id: "currency",
        label: "Default Currency",
        type: "select",
        icon: <DollarSign className="w-4 h-4 mr-1 text-gray-500" />,
        options: [
          { value: "INR", label: "INR (₹)" },
          { value: "USD", label: "USD ($)" },
          { value: "EUR", label: "EUR (€)" },
        ],
      },
      {
        id: "taxRate",
        label: "Applicable Tax Rate (%)",
        type: "number",
        placeholder: "18.0",
        defaultValue: "18.0",
      },
      {
        id: "freeMessageLimit",
        label: "Free Plan Message Limit (Daily)",
        type: "number",
        placeholder: "5",
        defaultValue: "5",
      },
    ],
    features: [
      {
        id: "matchmakingAlgorithm",
        label: "Matching Algorithm Weight (0-100)",
        type: "range",
        min: 0,
        max: 100,
        defaultValue: 85,
      },
      {
        id: "profileVerificationRequired",
        label: "Require Admin Approval for New Profiles",
        type: "toggle",
        defaultChecked: true,
      },
      {
        id: "ageDifferenceLimit",
        label: "Max Allowed Age Difference (Years)",
        type: "number",
        placeholder: "15",
        defaultValue: "15",
      },
    ],
  };

  const renderField = (field) => {
    switch (field.type) {
      case "text":
      case "email":
      case "number":
        return (
          <input
            id={field.id}
            type={field.type}
            className={inputClass}
            placeholder={field.placeholder}
            defaultValue={field.defaultValue}
          />
        );
      case "select":
        return (
          <select
            id={field.id}
            className={`${inputClass} bg-white`}
            defaultValue={field.options[0].value}
          >
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case "range":
        return (
          <div className="flex items-center space-x-4">
            <input
              id={field.id}
              type="range"
              min={field.min}
              max={field.max}
              defaultValue={field.defaultValue}
              className="w-full h-2 bg-[#F6E7EC] rounded-lg appearance-none cursor-pointer range-lg [&::-webkit-slider-thumb]:bg-[#7A1F3D] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4"
            />
            <span className="text-sm font-semibold text-[#7A1F3D] w-10 text-right">
              {field.defaultValue}
            </span>
          </div>
        );
      case "toggle":
        return (
          <div className="flex items-center justify-between py-2">
            <p className="text-sm font-medium text-gray-700">{field.label}</p>
            <label
              htmlFor={field.id}
              className="relative inline-flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                id={field.id}
                defaultChecked={field.defaultChecked}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#7A1F3D]/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7A1F3D]"></div>
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  const renderSection = (title, icon, fields) => (
    <section className="bg-white rounded-xl border border-[#E6D3DA] shadow-lg overflow-hidden">
      <div className={sectionHeaderClass}>
        {icon}
        <h2 className="text-xl font-semibold text-[#7A1F3D] ml-3">{title}</h2>
      </div>
      <div className="p-6 space-y-6">
        {fields.map((field) => (
          <div key={field.id}>
            {field.type !== "toggle" && (
              <label
                htmlFor={field.id}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {field.icon}
                {field.label}
              </label>
            )}
            {renderField(field)}
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-[#7A1F3D] mb-8 border-b border-[#E6D3DA] pb-3">
        <Shield className="w-6 h-6 inline mr-2 align-text-bottom" /> System
        Settings
      </h1>

      <div className="space-y-8">
        {/* General Settings */}
        {renderSection(
          "General Site Configuration",
          <Globe className="w-5 h-5 text-[#7A1F3D]" />,
          settingsData.general
        )}

        {/* Monetization Settings */}
        {renderSection(
          "Monetization & Financials",
          <DollarSign className="w-5 h-5 text-[#7A1F3D]" />,
          settingsData.monetization
        )}

        {/* Core Matrimonial Features */}
        {renderSection(
          "Core Feature Management",
          <Heart className="w-5 h-5 text-[#7A1F3D]" />,
          settingsData.features
        )}

        {/* Action Button */}
        <div className="pt-4 flex justify-end">
          <button className="flex items-center px-8 py-3 bg-[#7A1F3D] text-white font-bold rounded-lg shadow-xl hover:bg-[#5a1a33] transition duration-150 ease-in-out transform hover:scale-[1.02]">
            <Save className="w-5 h-5 mr-2" />
            SAVE ALL CHANGES
          </button>
        </div>
      </div>
    </div>
  );
}
