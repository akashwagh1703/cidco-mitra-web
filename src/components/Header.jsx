import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Moon,
  Sun,
  Globe,
  Home,
  Briefcase,
  Info,
  MessageSquare,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark",
  );
  const [showLangMenu, setShowLangMenu] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const navLinks = [
    { path: "/", label: t("nav.home"), icon: Home },
    { path: "/services", label: t("nav.services"), icon: Briefcase },
    { path: "/about", label: t("nav.about"), icon: Info },
    { path: "/contact", label: t("nav.contact"), icon: MessageSquare },
  ];

  const languages = [
    { code: "mr", name: "मराठी" },
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-gradient-to-r from-primary to-secondary dark:bg-gray-900 shadow-lg">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="text-white">
                <h1 className="text-xl md:text-2xl font-bold leading-tight">
                  C.I.D.C.O. MITRA
                </h1>
                {/* <p className="text-xs md:text-sm font-semibold opacity-90">C.I.D.C.O. MITRA</p> */}
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-white hover:text-gray-200 transition font-medium ${
                    location.pathname === link.path 
                      ? "border-b-2 border-white font-semibold"
                      : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="p-2 rounded-lg hover:bg-white/20 dark:hover:bg-gray-800 flex items-center space-x-1 text-white transition"
                >
                  <Globe size={20} />
                  <span className="text-sm font-medium">
                    {language.toUpperCase()}
                  </span>
                </button>
                {showLangMenu && (
                  <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-[100]">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setShowLangMenu(false);
                        }}
                        className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${
                          language === lang.code
                            ? "text-primary font-semibold"
                            : ""
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
        {/* Disclaimer Ticker */}
        <div className="relative flex items-center overflow-hidden bg-white/10 backdrop-blur-sm border-t border-white/20 py-1.5 px-0">
          {/* Glowing left badge */}
          <div className="shrink-0 z-10 flex items-center gap-1.5 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-r-full shadow-md mr-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-900 animate-pulse" />
            <span className="uppercase tracking-wide text-[10px] md:text-xs">{t("nav.disclaimerTitle") || "LIVE"}</span>
          </div>

          {/* Scrolling text */}
          <div className="overflow-hidden flex-1">
            <div className="ticker-track">
              <span className="text-white text-xs md:text-sm font-medium whitespace-nowrap pr-16 opacity-95">
                {t("nav.disclaimer")}
              </span>
              {/* Duplicate for seamless loop */}
              <span className="text-white text-xs md:text-sm font-medium whitespace-nowrap pr-16 opacity-95">
                {t("nav.disclaimer")}
              </span>
            </div>
          </div>

          {/* Fade edges */}
          <div className="pointer-events-none absolute left-16 top-0 h-full w-8 bg-gradient-to-r from-white/10 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white/10 to-transparent" />
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-2xl">
        <div className="grid grid-cols-4 h-16">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex flex-col items-center justify-center gap-1 transition-all ${
                  isActive
                    ? "text-primary bg-primary/5"
                    : "text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <Icon size={22} className={isActive ? "scale-110" : ""} />
                <span
                  className={`text-xs font-medium ${isActive ? "font-bold" : ""}`}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Add padding to main content for mobile bottom nav */}
      <style>{`
        @media (max-width: 768px) {
          main {
            padding-bottom: 4rem;
          }
        }
      `}</style>
    </>
  );
}
