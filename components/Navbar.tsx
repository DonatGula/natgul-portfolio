"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", s);
    return () => window.removeEventListener("scroll", s);
  }, []);

  const links = [
    { href: "/commission-desain",   label: "Commission Desain" },
    { href: "/commission-chibi",    label: "Chibi Live2D"      },
    { href: "/commission-undangan", label: "Undangan Online"   },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-3 glass border-b" : "py-5 bg-transparent"}`}
      style={{ borderColor: "var(--border)" }}>
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="display text-2xl grad-text-white hover:grad-text transition-all duration-300 flex-shrink-0">
          NATGUL<span style={{ color: "var(--accent)" }}>.</span>
        </Link>

        {/* Desktop links + theme toggle */}
        <div className="hidden md:flex items-center gap-2">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className={`font-bold text-base px-4 py-2 rounded-full transition-all duration-200 tracking-wide whitespace-nowrap ${
                path === l.href
                  ? "border"
                  : "hover:bg-white/5"
              }`}
              style={path === l.href
                ? { color: "var(--accent)", background: "var(--accent-bg)", borderColor: "var(--accent-border)" }
                : { color: "var(--muted)" }
              }>
              {l.label}
            </Link>
          ))}
          <a href="https://www.samstore.my.id" target="_blank" rel="noreferrer"
            className="ml-1 btn-outline py-2.5 px-4 text-sm">TopUp ↗</a>

          {/* Theme toggle */}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)}
            className="text-base font-bold uppercase tracking-widest transition-colors"
            style={{ color: "var(--muted)" }}>
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass border-t px-6 py-5 flex flex-col gap-4"
          style={{ borderColor: "var(--border)" }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="text-base font-bold uppercase tracking-widest py-2 transition-colors"
              style={{ color: path === l.href ? "var(--accent)" : "var(--muted)" }}>
              → {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
