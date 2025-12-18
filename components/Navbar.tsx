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
  { name: "Gallery", href: "/gallery" },
];

function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-black border-b-4 border-ers-yellow shadow-[0_8px_0_0_#f4c430]">
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
                `}
              >
                ERS
              </div>

              <span className="text-ers-yellow/80 font-body text-[10px] md:text-xs mt-1 tracking-widest">
                Electronics & Robotics Society
              </span>
            </div>
          </Link>


          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    relative transition-colors
                    ${isActive ? "text-ers-yellow" : "text-white hover:text-ers-yellow"}
                  `}
                >
                  {link.name}

                  {/* ACTIVE UNDERLINE */}
                  {isActive && (
                    <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-ers-yellow" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-ers-yellow"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </nav>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden border-t border-ers-yellow/30 bg-black">
            <div className="flex flex-col px-6 py-6 gap-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`
                      py-2 transition-colors
                      ${isActive
                        ? "text-ers-yellow"
                        : "text-white hover:text-ers-yellow"}
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
