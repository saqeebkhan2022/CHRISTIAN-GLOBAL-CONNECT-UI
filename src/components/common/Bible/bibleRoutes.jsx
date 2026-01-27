import BibleBooks from "./pages/BibleBooks";
import BibleChapters from "./pages/BibleChapters";
import BibleChapter from "./pages/BibleChapter";

const bibleRoutes = [
  { path: "/bible", element: <BibleBooks /> },
  { path: "/bible/:book", element: <BibleChapters /> },
  { path: "/bible/:book/:chapter", element: <BibleChapter /> },
];

export default bibleRoutes;
