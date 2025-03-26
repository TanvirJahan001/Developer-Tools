"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAnimations } from "./AnimationProvider";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { animationsEnabled } = useAnimations();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.nav
      className={`sticky top-0 z-50 ${
        scrolled
          ? "bg-[#111B3E]/30 backdrop-blur-sm border-b border-[#111B3E]/20"
          : "bg-transparent"
      } transition-all duration-300`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className="text-white font-bold text-xl hover:text-primary transition-colors"
              >
                DevTools
              </Link>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex space-x-4">
              <Link
                href="/code-tidy"
                className="px-3 py-2 rounded-md text-sm font-medium text-white/90 hover:text-primary hover:bg-[#111B3E]/10 transition-all duration-200 relative group"
              >
                Code Tidy
                {animationsEnabled && (
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                    layoutId="navHighlight"
                    layout
                  />
                )}
              </Link>
              <Link
                href="/data-format"
                className="px-3 py-2 rounded-md text-sm font-medium text-white/90 hover:text-primary hover:bg-[#111B3E]/10 transition-all duration-200 relative group"
              >
                Data Format
                {animationsEnabled && (
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                    layoutId="navHighlight"
                    layout
                  />
                )}
              </Link>
              <Link
                href="/random-data"
                className="px-3 py-2 rounded-md text-sm font-medium text-white/90 hover:text-primary hover:bg-[#111B3E]/10 transition-all duration-200 relative group"
              >
                Random Data & Password
                {animationsEnabled && (
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                    layoutId="navHighlight"
                    layout
                  />
                )}
              </Link>
              <Link
                href="/security-tools"
                className="px-3 py-2 rounded-md text-sm font-medium text-white/90 hover:text-primary hover:bg-[#111B3E]/10 transition-all duration-200 relative group"
              >
                Security Tools
                {animationsEnabled && (
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                    layoutId="navHighlight"
                    layout
                  />
                )}
              </Link>
              <Link
                href="/utilities"
                className="px-3 py-2 rounded-md text-sm font-medium text-white/90 hover:text-primary hover:bg-[#111B3E]/10 transition-all duration-200 relative group"
              >
                Utilities
                {animationsEnabled && (
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                    layoutId="navHighlight"
                    layout
                  />
                )}
              </Link>
              <Link
                href="/image-tools"
                className="px-3 py-2 rounded-md text-sm font-medium text-white/90 hover:text-primary hover:bg-[#111B3E]/10 transition-all duration-200 relative group"
              >
                Image Tools
                {animationsEnabled && (
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                    layoutId="navHighlight"
                    layout
                  />
                )}
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white/90 hover:text-primary hover:bg-[#111B3E]/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="sm:hidden bg-[#111B3E]/30 backdrop-blur-sm border-t border-[#111B3E]/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/code-tidy"
                className="block px-3 py-2 rounded-md text-base font-medium text-white/90 hover:text-primary hover:bg-[#111B3E]/10"
              >
                Code Tidy
              </Link>
              <Link
                href="/data-format"
                className="block px-3 py-2 rounded-md text-base font-medium text-white/90 hover:text-primary hover:bg-[#111B3E]/10"
              >
                Data Format
              </Link>
              <Link
                href="/random-data"
                className="block px-3 py-2 rounded-md text-base font-medium text-white/90 hover:text-primary hover:bg-[#111B3E]/10"
              >
                Random Date & Password
              </Link>
              <Link
                href="/security-tools"
                className="block px-3 py-2 rounded-md text-base font-medium text-white/90 hover:text-primary hover:bg-[#111B3E]/10"
              >
                Security Tools
              </Link>
              <Link
                href="/utilities"
                className="block px-3 py-2 rounded-md text-base font-medium text-white/90 hover:text-primary hover:bg-[#111B3E]/10"
              >
                Utilities
              </Link>
              <Link
                href="/image-tools"
                className="block px-3 py-2 rounded-md text-base font-medium text-white/90 hover:text-primary hover:bg-[#111B3E]/10"
              >
                Image Tools
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
