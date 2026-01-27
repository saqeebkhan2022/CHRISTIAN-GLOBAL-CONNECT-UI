import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import books from "../data/books.json";
import ChapterGrid from "../components/ChapterGrid";

export default function BibleChapters() {
  const { book } = useParams();
  const navigate = useNavigate();
  const all = [...books.oldTestament, ...books.newTestament];
  const current = all.find((b) => b.id === book);

  if (!current) return <div className="p-20 text-center">Book not found</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <button
            onClick={() => navigate("/bible")}
            className="flex items-center gap-1 text-primary font-medium mb-4"
          >
            <ChevronLeft size={20} />
            Back to Library
          </button>

          <h1 className="text-4xl font-serif font-bold text-slate-900 leading-tight">
            {current.name}
          </h1>
          <p className="text-slate-500 mt-2 uppercase tracking-widest text-sm font-semibold">
            Select a Chapter
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
          <ChapterGrid bookId={book} chapters={current.chapters} />
        </div>
      </main>
    </div>
  );
}
