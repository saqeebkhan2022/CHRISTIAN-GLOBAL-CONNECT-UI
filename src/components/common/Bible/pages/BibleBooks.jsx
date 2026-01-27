import { useState } from "react";
import books from "../data/books.json";
import TestamentTabs from "../components/TestamentTabs";
import { Link } from "react-router-dom";

export default function BibleBooks() {
  const [tab, setTab] = useState("new");
  const list = tab === "new" ? books.newTestament : books.oldTestament;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Holy Bible</h1>

      <TestamentTabs active={tab} onChange={setTab} />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {list.map((book) => (
          <Link
            key={book.id}
            to={`/bible/${book.id}`}
            className="p-4 border rounded-xl hover:bg-muted"
          >
            {book.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
