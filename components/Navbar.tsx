import { ImagesUrl } from "@/utils/Constants";
import { PortfolioData } from "@/utils/types";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const Navbar = (data: PortfolioData) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Work", href: "#projects" },
  ];

  return (
    <>
      <header
        className={`fixed top-4 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${
          scrolled ? "translate-y-0" : "translate-y-2"
        }`}
      >
        <div className="mx-4 w-full max-w-4xl">
          <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-full px-6 py-3 shadow-lg flex justify-between items-center relative">
            {/* Logo */}
            <a
              href="#"
              className="text-lg font-bold tracking-tight text-white hover:text-accent transition-colors shrink-0"
            >
              {data.profile.name.split(" ")[0]}
              Dev
              <span className="text-accent">.</span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-1 items-center absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-1.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-all"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4 shrink-0">
              <a href="#about">
                <Image
                  src={ImagesUrl + "profile-image/profile-image.png"}
                  alt={"../public/linkedin.png"}
                  width={35}
                  height={35}
                  className="rounded-full border-white/20 shadow-md"
                />
              </a>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-slate-300 hover:text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {mobileMenuOpen ? (
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                  ) : (
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                  )}
                  {mobileMenuOpen ? (
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  ) : (
                    <>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <line x1="3" y1="18" x2="21" y2="18"></line>
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center space-y-8 animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-2xl font-medium text-slate-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="text-2xl font-bold text-accent"
            onClick={() => setMobileMenuOpen(false)}
          >
            Hire Me
          </a>
        </div>
      )}
    </>
  );
};

export default Navbar;
