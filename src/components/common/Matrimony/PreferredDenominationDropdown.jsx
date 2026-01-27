import { useEffect, useRef, useState } from "react";

export default function PreferredDenominationDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleValue = (val) => {
    onChange(
      value.includes(val) ? value.filter((x) => x !== val) : [...value, val]
    );
  };

  const selectAll = () =>
    onChange([
      "CATHOLIC",
      "BAPTIST",
      "PROTESTANT",
      "ORTHODOX",
      "PENTECOSTAL",
      "EVANGELICAL",
      "METHODIST",
      "PRESBYTERIAN",
      "LUTHERAN",
      "ANGLICAN",
      "NON_DENOMINATIONAL",
      "OTHER",
    ]);

  const clearAll = () => onChange([]);

  const show = (label) => label.toLowerCase().includes(search.toLowerCase());

  return (
    <div className="relative" ref={ref}>
      {/* Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-left bg-white"
      >
        {value.length ? value.join(", ") : "Select denominations"}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-30 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg p-3">
          {/* Search */}
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-2 px-2 py-1 border rounded text-sm"
          />

          {/* Actions */}
          <div className="flex justify-between mb-2 text-xs">
            <button type="button" onClick={selectAll} className="text-blue-600">
              Select All
            </button>
            <button type="button" onClick={clearAll} className="text-red-500">
              Clear All
            </button>
          </div>

          {/* Options (NO map – explicit) */}
          <div className="space-y-2 max-h-52 overflow-y-auto text-sm">
            {show("Catholic") && (
              <Checkbox
                label="Catholic"
                checked={value.includes("CATHOLIC")}
                onChange={() => toggleValue("CATHOLIC")}
              />
            )}
            {show("Baptist") && (
              <Checkbox
                label="Baptist"
                checked={value.includes("BAPTIST")}
                onChange={() => toggleValue("BAPTIST")}
              />
            )}
            {show("Protestant") && (
              <Checkbox
                label="Protestant"
                checked={value.includes("PROTESTANT")}
                onChange={() => toggleValue("PROTESTANT")}
              />
            )}
            {show("Orthodox") && (
              <Checkbox
                label="Orthodox"
                checked={value.includes("ORTHODOX")}
                onChange={() => toggleValue("ORTHODOX")}
              />
            )}
            {show("Pentecostal") && (
              <Checkbox
                label="Pentecostal"
                checked={value.includes("PENTECOSTAL")}
                onChange={() => toggleValue("PENTECOSTAL")}
              />
            )}
            {show("Evangelical") && (
              <Checkbox
                label="Evangelical"
                checked={value.includes("EVANGELICAL")}
                onChange={() => toggleValue("EVANGELICAL")}
              />
            )}
            {show("Methodist") && (
              <Checkbox
                label="Methodist"
                checked={value.includes("METHODIST")}
                onChange={() => toggleValue("METHODIST")}
              />
            )}
            {show("Presbyterian") && (
              <Checkbox
                label="Presbyterian"
                checked={value.includes("PRESBYTERIAN")}
                onChange={() => toggleValue("PRESBYTERIAN")}
              />
            )}
            {show("Lutheran") && (
              <Checkbox
                label="Lutheran"
                checked={value.includes("LUTHERAN")}
                onChange={() => toggleValue("LUTHERAN")}
              />
            )}
            {show("Anglican") && (
              <Checkbox
                label="Anglican"
                checked={value.includes("ANGLICAN")}
                onChange={() => toggleValue("ANGLICAN")}
              />
            )}
            {show("Non-denominational") && (
              <Checkbox
                label="Non-denominational"
                checked={value.includes("NON_DENOMINATIONAL")}
                onChange={() => toggleValue("NON_DENOMINATIONAL")}
              />
            )}
            {show("Other") && (
              <Checkbox
                label="Other"
                checked={value.includes("OTHER")}
                onChange={() => toggleValue("OTHER")}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Checkbox({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}
