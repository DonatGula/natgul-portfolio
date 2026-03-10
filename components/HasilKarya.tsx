"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { CommissionItem } from "@/lib/types";

const TABS = [
  { key:"all",      label:"Semua"    },
  { key:"feed-ig",  label:"Feed IG"  },
  { key:"undangan", label:"Undangan" },
  { key:"poster",   label:"Poster"   },
  { key:"banner",   label:"Banner"   },
];

/* ── Lightbox ─────────────────────────────────────────────── */
function Lightbox({ item, onClose, onPrev, onNext }: {
  item: CommissionItem; onClose:()=>void; onPrev:()=>void; onNext:()=>void;
}) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key==="Escape") onClose();
      if (e.key==="ArrowLeft") onPrev();
      if (e.key==="ArrowRight") onNext();
    };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", h);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center animate-fade-in"
      style={{ background:"rgba(8,8,16,0.96)", backdropFilter:"blur(24px)" }} onClick={onClose}>
      <button onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white glass px-3 py-1.5 rounded-lg transition-colors z-10">
        ESC ✕
      </button>
      <button onClick={(e)=>{e.stopPropagation();onPrev();}}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 glass w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-white/60 hover:text-white text-2xl transition-colors z-10">‹</button>
      <button onClick={(e)=>{e.stopPropagation();onNext();}}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 glass w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-white/60 hover:text-white text-2xl transition-colors z-10">›</button>
      <div className="animate-scale-in w-[92vw] max-w-2xl" onClick={(e)=>e.stopPropagation()}>
        <div className="relative rounded-2xl overflow-hidden"
          style={{ border:"1px solid rgba(255,45,120,0.35)", boxShadow:"0 0 80px rgba(255,45,120,0.2)" }}>
          <Image src={item.imageFull} alt={item.title}
            width={item.width} height={item.height}
            className="w-full object-contain" priority unoptimized
            style={{ maxHeight:"80vh" }} />
          <div className="absolute bottom-0 left-0 right-0 px-4 md:px-6 py-4 flex items-center justify-between"
            style={{ background:"linear-gradient(transparent,rgba(8,8,16,0.97))" }}>
            <div>
              <div className="text-sm md:text-base font-bold uppercase tracking-wide text-white">{item.title}</div>
              <div className="text-xs text-white/35 mt-0.5 uppercase tracking-wide">{item.category}</div>
            </div>
            <div className="text-base md:text-lg font-bold ml-4" style={{ color:"var(--pink)" }}>{item.price}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Uniform card — fixed 1:1 square image area ───────────── */
function KaryaCard({ item, onClick }: { item: CommissionItem; onClick:()=>void }) {
  return (
    <div className="card overflow-hidden group cursor-none flex flex-col"
      style={{ transition:"transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s" }}
      onMouseEnter={e=>(e.currentTarget.style.transform="translateY(-5px)")}
      onMouseLeave={e=>(e.currentTarget.style.transform="translateY(0)")}
      onClick={onClick}>

      {/* ── Fixed-ratio image box: always square ── */}
      <div className="relative overflow-hidden" style={{ paddingBottom:"100%" }}>
        <Image
          src={item.image} alt={item.title} fill
          sizes="(max-width:480px) 50vw,(max-width:768px) 33vw,(max-width:1024px) 25vw,20vw"
          className="object-cover transition-transform duration-700 group-hover:scale-108"
          style={{ transition:"transform 0.7s ease" }}
          unoptimized
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{ background:"rgba(8,8,16,0.65)", backdropFilter:"blur(4px)" }}>
          <span className="glass-pink text-sm font-bold uppercase tracking-wide text-white px-4 py-2 rounded-full">
            LIHAT ↗
          </span>
        </div>
        {/* Category badge */}
        <div className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
          style={{ background:"var(--pink)", color:"white" }}>
          {item.category}
        </div>
      </div>

      {/* ── Info row ── */}
      <div className="p-3 flex items-center justify-between gap-2 flex-shrink-0"
        style={{ borderTop:"1px solid var(--border)" }}>
        <div className="text-xs font-bold uppercase tracking-wide text-white/70 leading-snug line-clamp-1 flex-1">
          {item.title}
        </div>
        <div className="text-xs font-bold flex-shrink-0" style={{ color:"var(--pink)" }}>
          {item.price}
        </div>
      </div>
    </div>
  );
}

/* ── Price note banner ────────────────────────────────────── */
function PriceNote({ category }: { category: string }) {
  const notes: Record<string,{ start:string; note:string }> = {
    undangan:  { start:"Rp 50.000",  note:"Harga naik sesuai kesulitan desain yang diminta" },
    "feed-ig": { start:"Rp 25.000",  note:"Harga naik sesuai kesulitan desain yang diminta" },
    poster:    { start:"Rp 25.000",  note:"Harga naik sesuai kesulitan desain yang diminta" },
    banner:    { start:"Rp 25.000",  note:"Harga naik sesuai kesulitan desain yang diminta" },
    all:       { start:"Rp 25.000",  note:"Harga naik sesuai kesulitan desain yang diminta" },
  };
  const n = notes[category] ?? notes["all"];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-8 rounded-xl px-5 py-4"
      style={{ background:"rgba(255,45,120,0.07)", border:"1px solid rgba(255,45,120,0.2)" }}>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-xl font-bold uppercase tracking-widest text-white/40">Mulai dari</span>
        <span className="display text-2xl" style={{ color:"var(--pink)" }}>{n.start}</span>
      </div>
      <div className="hidden sm:block w-px h-8" style={{ background:"rgba(255,45,120,0.2)" }} />
      <div className="text-xl font-bold uppercase tracking-widestext-white italic">
        *{n.note}
      </div>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────── */
export default function HasilKarya({ items }: { items: CommissionItem[] }) {
  const [active, setActive] = useState("feed-ig");
  const [lightbox, setLightbox] = useState<number|null>(null);

  const filtered = active==="all" ? items : items.filter((i)=>i.category===active);
  const currentIdx = lightbox!==null ? filtered.findIndex((i)=>i.id===lightbox) : -1;
  const activeItem = lightbox!==null ? filtered.find((i)=>i.id===lightbox) ?? null : null;
  const prev = useCallback(()=>{ if(currentIdx>0) setLightbox(filtered[currentIdx-1].id); },[currentIdx,filtered]);
  const next = useCallback(()=>{ if(currentIdx<filtered.length-1) setLightbox(filtered[currentIdx+1].id); },[currentIdx,filtered]);

  return (
    <section id="karya" className="py-1 md:py-2 relative" style={{ background:"var(--bg)" }}>
      {/* Ambient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-5 pointer-events-none"
        style={{ background:"radial-gradient(ellipse,var(--pink) 0%,transparent 70%)", filter:"blur(80px)" }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Header */}
        <div className="animate-fade-up mb-8 md:mb-12">
          <div className="section-label">Visual Design & Creative Media</div>
          <h2 className="display text-4xl sm:text-5xl md:text-7xl">
            <span className="text-white">HASIL </span>
            <span className="grad-text">KARYA.</span>
          </h2>
        </div>

        {/* Filter tabs — scrollable on mobile */}
        <div className="animate-fade-up delay-100 mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none"
            style={{ scrollbarWidth:"none", msOverflowStyle:"none" }}>
            {TABS.map((t) => (
              <button key={t.key} onClick={()=>{ setActive(t.key); setLightbox(null); }}
                className={`filter-btn flex-shrink-0 ${active===t.key?"active":""}`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price note */}
        <div className="animate-fade-up delay-150">
          <PriceNote category={active} />
        </div>

        {/* ── Uniform grid — 2 col mobile → 3 tablet → 4 desktop → 5 xl ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 animate-fade-up delay-200">
          {filtered.map((item, i) => (
            <div key={item.id}
              className="animate-fade-up"
              style={{ animationDelay:`${(i % 10) * 0.04}s` }}>
              <KaryaCard item={item} onClick={()=>setLightbox(item.id)} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 md:mt-16 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative overflow-hidden animate-fade-up"
          style={{ background:"linear-gradient(135deg,rgba(255,45,120,0.12) 0%,rgba(120,40,200,0.08) 100%)", border:"1px solid var(--border-pink)" }}>
          <div className="absolute inset-0 opacity-15 pointer-events-none"
            style={{ backgroundImage:"linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)", backgroundSize:"40px 40px" }} />
          <div className="relative">
            <div className="display text-2xl md:text-4xl text-white mb-1">OPEN COMMISSION!</div>
            <div className="text-sm md:text-base text-white/40">Hubungi untuk order atau tanya harga terbaru.</div>
          </div>
          <a href="https://www.instagram.com/sam.zen" target="_blank" rel="noreferrer"
            className="btn-pink relative flex-shrink-0 text-sm md:text-base">
            DM via Instagram ↗
          </a>
        </div>
      </div>

      {activeItem && <Lightbox item={activeItem} onClose={()=>setLightbox(null)} onPrev={prev} onNext={next} />}
    </section>
  );
}
