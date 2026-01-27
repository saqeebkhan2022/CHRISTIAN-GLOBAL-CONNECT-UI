// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Menu, X } from "lucide-react";

// export default function Header() {
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <>
//       <header
//         className={`sticky top-0 z-50 bg-background transition-all duration-300 ${
//           scrolled ? "shadow-md" : ""
//         }`}
//       >
//         <div
//           className={`max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between transition-all duration-300 ${
//             scrolled ? "py-3" : "py-5"
//           }`}
//         >
//           <Link
//             to="/"
//             className="text-primary tracking-[0.2em] text-base sm:text-lg font-semibold hover:opacity-80 transition"
//           >
//             CHRISTIAN GLOBAL CONNECT
//           </Link>

//           <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
//             <Link
//               to="/"
//               className="text-foreground hover:text-primary transition"
//             >
//               Home
//             </Link>
//             <Link
//               to="/about"
//               className="text-foreground hover:text-primary transition"
//             >
//               About
//             </Link>
//             <Link
//               to="/success-stories"
//               className="text-foreground hover:text-primary transition"
//             >
//               Success Stories
//             </Link>
//             <Link
//               to="/contact"
//               className="text-foreground hover:text-primary transition"
//             >
//               Contact
//             </Link>
//             <Link
//               to="/login"
//               className="px-5 py-2 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition"
//             >
//               Get Started
//             </Link>
//           </nav>

//           <button
//             className="md:hidden"
//             onClick={() => setMenuOpen(true)}
//             aria-label="Open Menu"
//           >
//             <Menu size={26} className="text-primary" />
//           </button>
//         </div>
//       </header>

//       {menuOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40"
//           onClick={() => setMenuOpen(false)}
//         />
//       )}

//       <aside
//         className={`fixed top-0 left-0 z-50 h-full w-72 bg-card transition-transform duration-300 ${
//           menuOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="flex items-center justify-between p-5 border-b border-border">
//           <span className="tracking-widest text-xs font-semibold text-primary">
//             MENU
//           </span>
//           <button onClick={() => setMenuOpen(false)}>
//             <X size={22} />
//           </button>
//         </div>

//         <nav className="p-6 space-y-4 text-sm font-medium">
//           <Link
//             to="/"
//             onClick={() => setMenuOpen(false)}
//             className="block hover:text-primary transition"
//           >
//             Home
//           </Link>
//           <Link
//             to="/about"
//             onClick={() => setMenuOpen(false)}
//             className="block hover:text-primary transition"
//           >
//             About
//           </Link>
//           <Link
//             to="/success-stories"
//             onClick={() => setMenuOpen(false)}
//             className="block hover:text-primary transition"
//           >
//             Success Stories
//           </Link>
//           <Link
//             to="/contact"
//             onClick={() => setMenuOpen(false)}
//             className="block hover:text-primary transition"
//           >
//             Contact
//           </Link>

//           <hr className="border-border" />

//           <Link
//             to="/login"
//             className="block text-center px-4 py-2 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition"
//             onClick={() => setMenuOpen(false)}
//           >
//             Login
//           </Link>

//           <Link
//             to="/register"
//             className="block text-center px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
//             onClick={() => setMenuOpen(false)}
//           >
//             Register
//           </Link>
//         </nav>
//       </aside>
//     </>
//   );
// }

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [spiritualOpen, setSpiritualOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ================= HEADER ================= */}
      <header
        className={`sticky top-0 z-50 bg-background transition-all duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between transition-all duration-300 ${
            scrolled ? "py-3" : "py-5"
          }`}
        >
          <Link
            to="/"
            className="text-primary tracking-[0.2em] text-base sm:text-lg font-semibold hover:opacity-80 transition"
          >
            CHRISTIAN GLOBAL CONNECT
          </Link>

          {/* ===== DESKTOP NAV ===== */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link to="/" className="hover:text-primary transition">
              Home
            </Link>

            {/* ===== SPIRITUAL DROPDOWN (DESKTOP) ===== */}
            {/* ===== SPIRITUAL DROPDOWN (DESKTOP) ===== */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-primary transition">
                Spiritual <ChevronDown size={16} />
              </button>

              <div
                className="
      absolute top-full left-0 mt-3 w-48
      bg-card border border-border rounded-xl shadow-lg
      opacity-0 invisible
      group-hover:opacity-100 group-hover:visible
      transition-all duration-200
    "
              >
                <Link
                  to="/bible"
                  className="block px-4 py-3 hover:bg-muted transition"
                >
                  📖 Bible
                </Link>
              </div>
            </div>

            <Link to="/about" className="hover:text-primary transition">
              About
            </Link>

            <Link
              to="/success-stories"
              className="hover:text-primary transition"
            >
              Success Stories
            </Link>

            <Link to="/contact" className="hover:text-primary transition">
              Contact
            </Link>

            <Link
              to="/login"
              className="px-5 py-2 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition"
            >
              Get Started
            </Link>
          </nav>

          {/* ===== MOBILE MENU BUTTON ===== */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={26} className="text-primary" />
          </button>
        </div>
      </header>

      {/* ================= OVERLAY ================= */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* ================= MOBILE DRAWER ================= */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-card transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b">
          <span className="tracking-widest text-xs font-semibold text-primary">
            MENU
          </span>
          <button onClick={() => setMenuOpen(false)}>
            <X size={22} />
          </button>
        </div>

        <nav className="p-6 space-y-4 text-sm font-medium">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          {/* ===== SPIRITUAL (MOBILE) ===== */}
          <button
            className="flex w-full items-center justify-between"
            onClick={() => setSpiritualOpen(!spiritualOpen)}
          >
            <span>Spiritual</span>
            <ChevronDown
              size={16}
              className={`transition ${spiritualOpen ? "rotate-180" : ""}`}
            />
          </button>

          {spiritualOpen && (
            <div className="ml-4 space-y-2">
              <Link
                to="/bible"
                onClick={() => {
                  setMenuOpen(false);
                  setSpiritualOpen(false);
                }}
                className="block text-sm hover:text-primary"
              >
                📖 Bible
              </Link>
            </div>
          )}

          <Link to="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>

          <Link to="/success-stories" onClick={() => setMenuOpen(false)}>
            Success Stories
          </Link>

          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>

          <hr />

          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="block text-center px-4 py-2 rounded-lg border-2 border-primary text-primary font-semibold"
          >
            Login
          </Link>

          <Link
            to="/register"
            onClick={() => setMenuOpen(false)}
            className="block text-center px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold"
          >
            Register
          </Link>
        </nav>
      </aside>
    </>
  );
}
