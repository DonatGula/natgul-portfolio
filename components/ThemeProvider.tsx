"use client";
import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "dark-pink" | "cyberpunk" | "ocean";

const THEMES: { id: Theme; label: string; emoji: string; accent: string; bg: string }[] = [
  { id: "dark-pink",  label: "Pink",  emoji: "🌸", accent: "#FF2D78", bg: "#080810" },
  { id: "cyberpunk",  label: "Green", emoji: "🟢", accent: "rgb(1, 85, 47)", bg: "#030d07" },
  { id: "ocean",      label: "Blue",  emoji: "🌊", accent: "#00aaff", bg: "#040c18" },
];

const ThemeCtx = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
  themes: typeof THEMES;
}>({ theme: "dark-pink", setTheme: () => {}, themes: THEMES });

export function useTheme() { return useContext(ThemeCtx); }

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark-pink");

  useEffect(() => {
    const saved = localStorage.getItem("natgul-theme") as Theme | null;
    if (saved && THEMES.find(t => t.id === saved)) {
      setThemeState(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("natgul-theme", t);
  };

  return (
    <ThemeCtx.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeCtx.Provider>
  );
}
