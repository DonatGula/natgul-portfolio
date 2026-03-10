"use client";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme, themes } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = themes.find(t => t.id === theme)!;

  // Close on outside click
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 glass rounded-xl px-3 py-2 transition-all duration-200 group"
        style={{ border: "1px solid var(--border)" }}
        aria-label="Ganti tema"
        title="Ganti tema"
      >
        {/* Color dot preview */}
        <span className="w-3.5 h-3.5 rounded-full flex-shrink-0 transition-all duration-300"
          style={{ background: current.accent, boxShadow: `0 0 8px ${current.accent}80` }} />
        <span className="text-xs font-bold uppercase tracking-widest hidden sm:block"
          style={{ color: "var(--muted)" }}>
          {current.label}
        </span>
        <svg viewBox="0 0 10 6" fill="none" className={`w-2.5 h-2.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          style={{ color: "var(--muted)" }}>
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl overflow-hidden z-50 animate-scale-in"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          }}>
          {/* Header */}
          <div className="px-4 py-2.5 border-b" style={{ borderColor: "var(--border)" }}>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
              Pilih Tema
            </span>
          </div>

          {themes.map((t) => (
            <button key={t.id}
              onClick={() => { setTheme(t.id); setOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-3 transition-all duration-150 text-left group/item"
              style={{
                background: theme === t.id ? `${t.accent}15` : "transparent",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = `${t.accent}10`)}
              onMouseLeave={e => (e.currentTarget.style.background = theme === t.id ? `${t.accent}15` : "transparent")}
            >
              {/* Color swatch */}
              <span className="w-5 h-5 rounded-full flex-shrink-0 ring-2 ring-offset-2 transition-all duration-200"
                style={{
                  background: t.accent,
                  boxShadow: `0 0 10px ${t.accent}60`,
                  ringColor: theme === t.id ? t.accent : "transparent",
                  ringOffsetColor: t.bg,
                  outline: theme === t.id ? `2px solid ${t.accent}` : "none",
                  outlineOffset: "2px",
                }} />

              {/* Label */}
              <span className="text-sm font-bold flex-1" style={{ color: theme === t.id ? t.accent : "var(--text)" }}>
                {t.emoji} {t.label}
              </span>

              {/* Active check */}
              {theme === t.id && (
                <svg viewBox="0 0 12 10" fill="none" className="w-3 h-3 flex-shrink-0"
                  style={{ color: t.accent }}>
                  <path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              )}
            </button>
          ))}

          {/* Footer note */}
          <div className="px-4 py-2.5 border-t" style={{ borderColor: "var(--border)" }}>
            <span className="text-xs" style={{ color: "var(--muted)", opacity: 0.5 }}>
              Tersimpan otomatis
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
