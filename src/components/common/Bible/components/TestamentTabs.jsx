export default function TestamentTabs({ active, onChange }) {
  return (
    <div className="flex gap-2 mb-6">
      {["old", "new"].map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`px-4 py-2 rounded-full text-sm font-medium
            ${active === t ? "bg-primary text-white" : "bg-muted"}`}
        >
          {t === "old" ? "Old Testament" : "New Testament"}
        </button>
      ))}
    </div>
  );
}
