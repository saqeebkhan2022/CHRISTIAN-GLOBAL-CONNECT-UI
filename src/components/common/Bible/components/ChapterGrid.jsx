import { Link } from "react-router-dom";

export default function ChapterGrid({ bookId, chapters }) {
  return (
    <div className="grid grid-cols-5 sm:grid-cols-8 gap-3">
      {Array.from({ length: chapters }).map((_, i) => (
        <Link
          key={i}
          to={`/bible/${bookId}/${i + 1}`}
          className="border rounded-lg py-2 text-center hover:bg-primary hover:text-white"
        >
          {i + 1}
        </Link>
      ))}
    </div>
  );
}
