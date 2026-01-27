import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronLeft, BookOpen, ArrowRight, ArrowLeft } from "lucide-react";
import { loadChapterFromApi } from "../utils/loadBook";
import Skeleton from "../components/Skeleton";
import Verse from "../components/Verse";

export default function BibleChapter() {
  const { book, chapter } = useParams();
  const navigate = useNavigate();
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxChapters, setMaxChapters] = useState(0);

  const chapterNum = parseInt(chapter);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    // Window scroll to top on chapter change
    window.scrollTo(0, 0);

    loadChapterFromApi(book, chapter).then((res) => {
      if (isMounted && res) {
        setVerses(res.verses);
        setMaxChapters(res.maxChapters);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [book, chapter]);

  if (loading)
    return (
      <div className="max-w-3xl mx-auto p-8">
        <Skeleton lines={15} />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8F5F2] text-slate-900 pb-20 selection:bg-primary/20">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-orange-100/50 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate(`/bible/${book}`)}
            className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors group"
          >
            <ChevronLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="font-medium hidden sm:inline">Library</span>
          </button>

          <h2 className="font-serif font-bold text-xl capitalize flex items-center gap-2">
            {book.replace(/-/g, " ")}
            <span className="bg-primary/10 text-primary px-3 py-0.5 rounded-full text-lg">
              {chapter}
            </span>
          </h2>

          <Link
            to="/bible"
            className="text-slate-400 hover:text-primary transition-colors"
          >
            <BookOpen size={22} />
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 mt-8">
        {/* The "Paper" Container */}
        <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-orange-100/30 overflow-hidden">
          <div className="h-1.5 bg-primary/20 w-full" />

          <article className="px-6 py-12 sm:px-16 sm:py-20">
            {/* Using a custom class for better reading line-height */}
            <div className="font-serif text-xl sm:text-2xl leading-[2.4rem] text-slate-800 space-y-6">
              {verses.map((v, index) => (
                <Verse
                  key={v.verse}
                  number={v.verse}
                  text={v.text}
                  isFirst={index === 0}
                />
              ))}
            </div>
          </article>
        </div>

        {/* Dynamic Footer Navigation */}
        <footer className="mt-12 flex items-center justify-between gap-4 sm:gap-6">
          {/* Previous Button: Hidden on Chapter 1 */}
          <Link
            to={`/bible/${book}/${chapterNum - 1}`}
            className={`flex-1 flex flex-col items-start gap-1 p-5 rounded-2xl border border-slate-200 bg-white hover:border-primary/40 hover:bg-orange-50/30 transition-all ${
              chapterNum <= 1 ? "pointer-events-none opacity-0" : ""
            }`}
          >
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
              Previous
            </span>
            <div className="flex items-center gap-2 font-bold text-slate-700">
              <ArrowLeft size={16} />
              <span>Chapter {chapterNum - 1}</span>
            </div>
          </Link>

          {/* Next Button: Hidden on Last Chapter */}
          <Link
            to={`/bible/${book}/${chapterNum + 1}`}
            className={`flex-1 flex flex-col items-end gap-1 p-5 rounded-2xl bg-primary text-white hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 ${
              chapterNum >= maxChapters ? "pointer-events-none opacity-0" : ""
            }`}
          >
            <span className="text-[10px] uppercase tracking-widest text-white/70 font-bold">
              Next Up
            </span>
            <div className="flex items-center gap-2 font-bold">
              <span>Chapter {chapterNum + 1}</span>
              <ArrowRight size={16} />
            </div>
          </Link>
        </footer>
      </main>
    </div>
  );
}
