import books from "../data/books.json";

export default function getTestament(bookId) {
  if (books.newTestament.some((b) => b.id === bookId)) {
    return "new-testament";
  }
  return "old-testament";
}
