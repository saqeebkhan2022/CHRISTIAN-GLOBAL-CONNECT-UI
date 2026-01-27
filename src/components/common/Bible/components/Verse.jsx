export default function Verse({ number, text, isFirst }) {
  return (
    <p
      className={`relative ${
        isFirst
          ? "first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-primary"
          : ""
      }`}
    >
      <span className="absolute -left-8 top-1 text-xs font-sans font-bold text-slate-300 select-none">
        {number}
      </span>
      <span className="inline leading-relaxed">{text}</span>
    </p>
  );
}
