"use client";
import { useState } from "react";
import { HiburanItem } from "@/lib/types";

const TABS = [
  { key: "all", label: "SEMUA" },
  { key: "movie", label: "MOVIE" },
  { key: "komik", label: "KOMIK" },
  { key: "dracin", label: "DRACIN" },
  { key: "other", label: "OTHER" },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`text-xs ${i < n ? "text-[#FF2D78]" : "text-black/20"}`}>★</span>
      ))}
    </div>
  );
}

export default function HiburanSection({ items }: { items: HiburanItem[] }) {
  const [active, setActive] = useState("all");
  const filtered = active === "all" ? items : items.filter((i) => i.category === active);

  return (
    <section id="hiburan" className="py-20 bg-grid border-t-2 border-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="flex items-baseline gap-4 mb-10">
          <h2 className="hero-title text-6xl text-black">HIBURAN</h2>
          <span className="hero-title text-6xl text-[#FF2D78]">LIST.</span>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`filter-btn ${active === t.key ? "active" : ""}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="card-brutal-pink overflow-hidden">
              {/* Thumb */}
              <div className="bg-black/5 aspect-[3/4] flex items-center justify-center text-5xl border-b-2 border-black relative">
                <span>{item.emoji}</span>
                {/* Category tag */}
                <div className="absolute top-2 left-2 bg-[#FF2D78] text-white font-mono text-[8px] uppercase tracking-widest px-1.5 py-0.5">
                  {item.category}
                </div>
              </div>
              {/* Info */}
              <div className="p-3">
                <div className="font-mono text-[11px] font-bold text-black leading-snug mb-1 line-clamp-2">
                  {item.title}
                </div>
                <div className="font-mono text-[9px] text-black/40 mb-2">
                  {item.genre} · {item.year}
                </div>
                <Stars n={item.rating} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
