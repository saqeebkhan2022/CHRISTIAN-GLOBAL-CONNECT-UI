// src/utils/loadBook.js
import booksData from "../data/books.json";

export async function loadChapterFromApi(bookId, chapter) {
  try {
    const response = await fetch(`https://bible-api.com/${bookId}+${chapter}`);
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();

    // Find the book in your local JSON to get the max chapters
    const allBooks = [...booksData.oldTestament, ...booksData.newTestament];
    const bookInfo = allBooks.find(
      (b) => b.id.toLowerCase() === bookId.toLowerCase()
    );

    return {
      book_name: data.reference,
      maxChapters: bookInfo ? bookInfo.chapters : 0, // <--- Added this
      verses: data.verses.map((v) => ({
        verse: v.verse,
        text: v.text,
      })),
    };
  } catch (error) {
    console.error("Error loading bible chapter:", error);
    return null;
  }
}
