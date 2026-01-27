import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Bell, MessageCircle } from "lucide-react";
import MatrimonyMessagingService from "../../../services/matrimony/messages/MatrimonyMessageService";
import ConversationsList from "./ConversationsList";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const navigate = useNavigate();

  // Refs for "Click Outside" detection
  const profileRef = useRef(null);
  const notifRef = useRef(null);
  const messagesRef = useRef(null);

  const [user, setUser] = useState(null);

  // Mock notifications - these would ideally come from an API
  const [notifications] = useState([
    { id: 1, text: "Someone viewed your profile", time: "2 mins ago" },
    { id: 2, text: "New interest request from Maria", time: "1 hour ago" },
    { id: 3, text: "Profile verification complete", time: "Yesterday" },
    { id: 4, text: "Welcome to Christian Global Connect!", time: "2 days ago" },
    {
      id: 5,
      text: "Complete your profile to get more matches",
      time: "3 days ago",
    },
  ]);

  useEffect(() => {
    const storedUser = localStorage.getItem("matrimonyUser");
    if (storedUser) setUser(JSON.parse(storedUser));

    // Function to close dropdowns if clicking anywhere else
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
      if (messagesRef.current && !messagesRef.current.contains(event.target)) {
        setMessagesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    // Disconnect socket before clearing auth
    if (MatrimonyMessagingService.socket) {
      MatrimonyMessagingService.disconnect();
    }

    // Clear auth data
    localStorage.removeItem("matrimonyToken");
    localStorage.removeItem("matrimonyUser");

    setUser(null);
    navigate("/login");
  };

  return (
    <>
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
            className="text-primary tracking-[0.2em] text-base sm:text-lg font-semibold"
          >
            CHRISTIAN GLOBAL CONNECT
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {/* Always show Home */}
            <Link
              to="/matrimony"
              className="text-foreground hover:text-primary transition"
            >
              Home
            </Link>

            {/* ONLY show these if user is NOT logged in */}
            {!user ? (
              <>
                <Link
                  to="/about"
                  className="text-foreground hover:text-primary transition"
                >
                  About
                </Link>
                <Link
                  to="/success-stories"
                  className="text-foreground hover:text-primary transition"
                >
                  Success Stories
                </Link>
                <Link
                  to="/contact"
                  className="text-foreground hover:text-primary transition"
                >
                  Contact
                </Link>
                <Link
                  to="/login"
                  className="px-5 py-2 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
                >
                  Register
                </Link>
              </>
            ) : (
              /* ONLY show Notification, Messages and Profile Circle if logged in */
              <div className="flex items-center gap-5">
                {/* MESSAGES ICON */}
                <div className="relative" ref={messagesRef}>
                  <button
                    onClick={() => {
                      setMessagesOpen(!messagesOpen);
                      setNotifOpen(false);
                      setDropdownOpen(false);
                    }}
                    className="p-2 text-muted-foreground hover:text-primary transition relative bg-muted/20 rounded-full"
                    title="Messages"
                  >
                    <MessageCircle size={20} />
                    <span className="absolute top-1.5 right-2 w-2 h-2 bg-blue-500 rounded-full border border-background"></span>
                  </button>

                  {messagesOpen && (
                    <div className="absolute right-0 mt-3 w-80 bg-card shadow-2xl rounded-xl border border-border overflow-hidden z-50 h-96">
                      <ConversationsList />
                    </div>
                  )}
                </div>

                {/* NOTIFICATION BELL */}
                <div className="relative" ref={notifRef}>
                  <button
                    onClick={() => {
                      setNotifOpen(!notifOpen);
                      setDropdownOpen(false);
                    }}
                    className="p-2 text-muted-foreground hover:text-primary transition relative bg-muted/20 rounded-full"
                  >
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-background"></span>
                  </button>

                  {notifOpen && (
                    <div className="absolute right-0 mt-3 w-72 bg-card shadow-2xl rounded-xl border border-border overflow-hidden z-50">
                      <div className="p-4 border-b font-bold text-sm bg-muted/30">
                        Notifications
                      </div>
                      <div className="max-h-80 overflow-y-auto scrollbar-thin">
                        {notifications.length > 0 ? (
                          notifications.map((n) => (
                            <div
                              key={n.id}
                              className="p-4 border-b border-border last:border-0 hover:bg-muted/40 transition cursor-pointer"
                            >
                              <p className="text-sm text-foreground leading-tight">
                                {n.text}
                              </p>
                              <span className="text-[11px] text-muted-foreground mt-1 block">
                                {n.time}
                              </span>
                            </div>
                          ))
                        ) : (
                          <div className="p-8 text-center text-muted-foreground text-sm">
                            No new notifications
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* PROFILE CIRCLE */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => {
                      setDropdownOpen(!dropdownOpen);
                      setNotifOpen(false);
                    }}
                    className="h-10 w-10 flex items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-primary font-bold transition hover:bg-primary hover:text-white shadow-sm"
                  >
                    {user.fullName
                      ? user.fullName.trim().charAt(0).toUpperCase()
                      : "U"}
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-3 w-52 bg-card shadow-2xl rounded-xl border border-border overflow-hidden z-50">
                      <div className="px-4 py-3 border-b bg-muted/10">
                        <p className="text-xs text-muted-foreground uppercase font-semibold">
                          Logged in as
                        </p>
                        <p className="text-sm font-bold truncate">
                          {user.fullName}
                        </p>
                      </div>
                      <Link
                        to="/matrimony/my-profile"
                        className="block px-4 py-3 text-sm hover:bg-primary hover:text-white transition"
                        onClick={() => setDropdownOpen(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/matrimony/my-interests"
                        className="block px-4 py-3 text-sm hover:bg-primary hover:text-white transition"
                        onClick={() => setDropdownOpen(false)}
                      >
                        My Interests
                      </Link>
                      <Link
                        to="/matrimony/settings"
                        className="block px-4 py-3 text-sm hover:bg-primary hover:text-white transition"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Account Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-sm text-red-500 font-medium hover:bg-red-50 transition border-t"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </nav>

          {/* MOBILE TOGGLE */}
          <button className="md:hidden" onClick={() => setMenuOpen(true)}>
            <Menu size={26} className="text-primary" />
          </button>
        </div>
      </header>

      {/* MOBILE MENU (Aside) */}
      <aside
        className={`fixed top-0 left-0 z-[60] h-full w-72 bg-card shadow-2xl transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <span className="tracking-widest text-xs font-bold text-primary">
            MENU
          </span>
          <button onClick={() => setMenuOpen(false)}>
            <X size={22} />
          </button>
        </div>
        <nav className="p-6 space-y-2">
          <Link
            to="/matrimony"
            onClick={() => setMenuOpen(false)}
            className="block py-3 border-b border-border/50 text-sm"
          >
            Home
          </Link>

          {user ? (
            <>
              <Link
                to="/matrimony/my-profile"
                onClick={() => setMenuOpen(false)}
                className="block py-3 border-b border-border/50 text-sm"
              >
                My Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full text-left py-3 text-sm text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className="block py-3 border-b border-border/50 text-sm"
              >
                About
              </Link>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-sm font-bold text-primary"
              >
                Login
              </Link>
            </>
          )}
        </nav>
      </aside>

      {/* Background overlay for mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[55] backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
