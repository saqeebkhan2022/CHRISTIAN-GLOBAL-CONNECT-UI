import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="text-primary-foreground" size={24} />
              <span className="font-bold text-lg tracking-wide">
                CHRISTIAN GLOBAL CONNECT
              </span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Uniting Christians with faith-based services, matrimonial and
              career opportunities, education, travel, and community support.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/matrimony"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition"
                >
                  Matrimony Portal
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition"
                >
                  Job Portal
                </Link>
              </li>
              <li>
                <Link
                  to="/education"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition"
                >
                  Education Portal
                </Link>
              </li>
              <li>
                <Link
                  to="/travel"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition"
                >
                  Travel Portal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/help"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/safety"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition"
                >
                  Safety Tips
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail size={18} className="mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  support@christianglobalconnect.com
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={18} className="mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  123 Faith Avenue, Suite 100
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/80">
          <p>© 2025 Christian Global Connect. All rights reserved.</p>
          <p>
            Made with <Heart size={14} className="inline mx-1" /> for the
            Christian community
          </p>
        </div>
      </div>
    </footer>
  );
}
