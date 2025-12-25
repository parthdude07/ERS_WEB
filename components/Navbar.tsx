"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { logoFont } from "@/app/fonts/logoFont";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "Team", href: "/team" },
  { name: "Projects", href: "/project" },
  { name: "Achievements", href: "/achievements" },
];

function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-black/90 backdrop-blur-md border-b-4 border-ers-yellow">
        <nav className="flex w-full items-center justify-between px-6 py-4 uppercase font-tech text-sm tracking-[0.2em]">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex flex-col leading-none">
              <div
                className={`
                  text-white
                  font-semibold
                  text-3xl
                  md:text-4xl
                  ${logoFont.className}
                  transition-transform duration-300 hover:scale-105
                `}
              >
                ERS
              </div>

              <span className="text-ers-yellow/80 font-body text-[10px] md:text-xs mt-1 tracking-widest whitespace-nowrap">
                Electronics & Robotics Society
              </span>
            </div>
          </Link>


          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    nav-link
                    relative transition-colors duration-300
                    ${isActive ? "active" : "text-white/80"}
                  `}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-ers-yellow transition-transform hover:scale-110 active:scale-95"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden border-t border-ers-yellow/30 bg-black/95 backdrop-blur-xl animate-slide-down">
            <div className="flex flex-col px-6 py-6 gap-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`
                      py-2 transition-all duration-200
                      ${isActive
                        ? "text-ers-yellow translate-x-2"
                        : "text-white hover:text-ers-yellow hover:translate-x-2"}
                    `}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default NavBar;
