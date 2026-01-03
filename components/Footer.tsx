"use client";

import Link from "next/link";
import { logoFont } from "@/app/fonts/logoFont";
import { Github, Instagram, Linkedin, Mail, MapPin } from "lucide-react";

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "Team", href: "/team" },
  { name: "Projects", href: "/project" },
  { name: "Achievements", href: "/achievements" },
];

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t-4 border-ers-yellow text-white pt-16 pb-8">
      <div className="px-6 md:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-center md:text-left">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex flex-col leading-none">
              <div
                className={`
                  text-white
                  font-semibold
                  text-5xl
                  ${logoFont.className}
                `}
              >
                ERS
              </div>
              <span className="text-ers-yellow font-body text-base tracking-widest mt-2">
                Electronics & Robotics Society
              </span>
            </div>
            <p className="text-gray-400 font-body text-base leading-relaxed max-w-sm mx-auto md:mx-0">
              Innovating the future through electronics and robotics. Join us in building the next generation of technology.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:text-center">
            <h3 className="font-display text-xl font-bold mb-6 text-ers-yellow uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3 font-body text-base tracking-wide">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-ers-yellow transition-colors duration-200 flex items-center justify-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-ers-yellow rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="md:text-right">
            <h3 className="font-display text-xl font-bold mb-6 text-ers-yellow uppercase tracking-wider">
              Connect With Us
            </h3>
            <div className="space-y-4 font-body text-base text-gray-300">
              <a href="mailto:contact@ers-club.com" className="flex items-center justify-center md:justify-end gap-3 hover:text-white transition-colors">
                <Mail className="w-5 h-5 text-ers-yellow" />
                <span>contact@ers-club.com</span>
              </a>
              <div className="flex items-center justify-center md:justify-end gap-3">
                <MapPin className="w-5 h-5 text-ers-yellow" />
                <span>University Campus, Tech Block</span>
              </div>
            </div>

            <div className="flex justify-center md:justify-end gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-ers-yellow hover:text-black transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-sm text-gray-500">
          <p>© {new Date().getFullYear()} ERS Club. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-ers-yellow transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-ers-yellow transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
