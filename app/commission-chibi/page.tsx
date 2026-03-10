"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { COMMISSION_CHIBI } from "@/lib/data";
import { CommissionItem } from "@/lib/types";

const ROSE_IMG = "https://roserachii.carrd.co/assets/images/image01.jpg";

/* ─── Lightbox ──────────────────────────────────────────────── */
function Lightbox({ item, onClose, onPrev, onNext }: {
  item: CommissionItem; onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center animate-fade-in"
      style={{ background: "rgba(8,8,16,0.97)", backdropFilter: "blur(24px)" }} onClick={onClose}>
      <button onClick={onClose}
        className="absolute top-6 right-6 text-base font-bold uppercase tracking-widest text-white/50 hover:text-white glass px-4 py-2 rounded-lg transition-colors z-10">
        ESC ✕
      </button>
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 glass w-12 h-12 rounded-xl flex items-center justify-center text-white/50 hover:text-white text-2xl transition-all z-10">‹</button>
      <button onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 glass w-12 h-12 rounded-xl flex items-center justify-center text-white/50 hover:text-white text-2xl transition-all z-10">›</button>
      <div className="animate-scale-in max-w-[90vw] max-h-[88vh]" onClick={(e) => e.stopPropagation()}>
        <div className="relative rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(255,45,120,0.4)", boxShadow: "0 0 100px rgba(255,45,120,0.25)" }}>
          <Image src={item.imageFull} alt={item.title} width={item.width * 3} height={item.height * 3}
            className="object-contain max-w-[90vw] max-h-[85vh]" priority unoptimized />
          <div className="absolute bottom-0 left-0 right-0 px-6 py-5 flex items-center justify-between"
            style={{ background: "linear-gradient(transparent, rgba(8,8,16,0.97))" }}>
            <div>
              <div className="text-base font-bold uppercase tracking-widest text-white">{item.title}</div>
              <div className="text-sm text-white/35 mt-0.5 uppercase tracking-wide">{item.category}</div>
            </div>
            <div className="text-lg font-bold" style={{ color: "var(--pink)" }}>{item.price}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Chibi Card ────────────────────────────────────────────── */
function ChibiCard({ item, onClick }: { item: CommissionItem; onClick: () => void }) {
  const pct = (item.height / item.width) * 100;
  return (
    <div className="card overflow-hidden group cursor-none hover-lift" onClick={onClick}>
      <div className="relative overflow-hidden" style={{ paddingBottom: `${pct}%` }}>
        <Image src={item.image} alt={item.title} fill
          sizes="(max-width:640px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110" unoptimized />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{ background: "rgba(8,8,16,0.7)", backdropFilter: "blur(4px)" }}>
          <span className="glass-pink text-base font-bold uppercase tracking-widest text-white px-5 py-2.5 rounded-full">
            LIHAT ↗
          </span>
        </div>
        <div className="absolute top-2 left-2 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
          style={{ background: "var(--pink)", color: "white" }}>
          {item.category}
        </div>
      </div>
      <div className="p-4">
        <div className="text-sm font-bold uppercase tracking-wide text-white/80">{item.title}</div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex gap-1.5">
            {item.tags.slice(0,2).map((t) => (
              <span key={t} className="text-xs px-2 py-0.5 rounded font-semibold uppercase tracking-wide"
                style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.08)" }}>
                {t}
              </span>
            ))}
          </div>
          <div className="text-sm font-bold" style={{ color: "var(--pink)" }}>{item.price}</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────── */
export default function CommissionChibiPage() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [currency, setCurrency] = useState<"local" | "intl">("local");

  const currentIdx = lightbox !== null ? COMMISSION_CHIBI.findIndex((i) => i.id === lightbox) : -1;
  const activeItem = lightbox !== null ? COMMISSION_CHIBI.find((i) => i.id === lightbox) ?? null : null;
  const prev = useCallback(() => { if (currentIdx > 0) setLightbox(COMMISSION_CHIBI[currentIdx - 1].id); }, [currentIdx]);
  const next = useCallback(() => { if (currentIdx < COMMISSION_CHIBI.length - 1) setLightbox(COMMISSION_CHIBI[currentIdx + 1].id); }, [currentIdx]);

  const PRICING = {
    local: {
      base: "400k", flag: "🇮🇩", label: "Local",
      expressions: ["Kaget","Marah","Nangis","UwU","Smug (Anya)","Seneng (>_<)"],
      addons: [
        { name: "+ Ekspresi",           price: "50k"     },
        { name: "+ Telinga hewan",      price: "40k"     },
        { name: "+ Ekor hewan",         price: "40k"     },
        { name: "+ Aksesoris bergerak", price: "50–100k" },
        { name: "+ Pet",                price: "50–100k" },
        { name: "+ Rambut baru",        price: "100k"    },
        { name: "+ Outfit baru",        price: "60k"     },
      ],
    },
    intl: {
      base: "$50", flag: "🌐", label: "International",
      expressions: ["Happy","Angry","Crying","UwU","Smug (Anya)","Joyful (>-<)"],
      addons: [
        { name: "+ Expressions",          price: "$10"     },
        { name: "+ Animal ears",          price: "$7"      },
        { name: "+ Extra features",       price: "$7"      },
        { name: "+ Accessories (moving)", price: "$10–$15" },
        { name: "+ Pet",                  price: "$15–$20" },
        { name: "+ New hair",             price: "$20"     },
        { name: "+ Outfit",               price: "$12"     },
      ],
    },
  };
  const pricing = PRICING[currency];

  const INCLUDES = ["Ilustrasi Live 2D + Rigging","Hak Komersial","File Siap Pakai Live2D","Gaya Seni: Chibi Simpel"];
  const VIDEOS = [
    { id: "62dSsTPQQ50", label: "Contoh Live2D #1" },
    { id: "uWS_qd03CuE", label: "Contoh Live2D #2" },
    { id: "9eSrLvetc-s", label: "Contoh Live2D #3" },
  ];

  return (
    <>
      <Navbar />
      <main>

        {/* ══════════════════════════════════════════
            HERO — 2 column: text left, profile right
        ══════════════════════════════════════════ */}
        <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden mesh-bg">
          {/* Ambient orbs */}
          <div className="absolute top-[-15%] right-[-5%] w-[700px] h-[700px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255,45,120,0.18) 0%, transparent 70%)", filter: "blur(100px)" }} />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(100,40,200,0.12) 0%, transparent 70%)", filter: "blur(70px)" }} />
          {/* Grid bg */}
          <div className="absolute inset-0 opacity-[0.035]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

          <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
            <div className="grid lg:grid-cols-2 gap-14 items-center">

              {/* ── LEFT: text ── */}
              <div>
                {/* Status pill */}
                <div className="animate-fade-up mb-6">
                  <div className="section-label">Open Commission</div>
                </div>

                {/* Collab badge — avatar + name */}
                <div className="animate-fade-up delay-100 inline-flex items-center gap-4 glass-pink rounded-2xl px-5 py-3 mb-8">
                  <div className="relative flex-shrink-0">
                    {/* glow halo */}
                    <div className="absolute inset-0 rounded-full"
                      style={{ background: "radial-gradient(circle, rgba(255,45,120,0.6) 0%, transparent 70%)", filter: "blur(10px)", transform: "scale(1.5)" }} />
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0"
                      style={{ border: "2px solid var(--pink)" }}>
                      <Image src={ROSE_IMG} alt="roserachii" width={48} height={48}
                        className="w-full h-full object-cover" unoptimized />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-0.5">Kolaborasi dengan</div>
                    <div className="text-xl font-bold" style={{ color: "var(--pink)" }}>🌸 roserachii</div>
                  </div>

                </div>

                {/* Big title */}
                <h1 className="display animate-fade-up delay-200 leading-none mb-5"
                  style={{ fontSize: "clamp(3rem,9vw,7rem)", letterSpacing: "-0.04em" }}>
                  <span className="text-white">CHIBI LIVE2D</span><br />
                  <span className="grad-text">SIAP PAKAI!</span>
                </h1>

                {/* Quote */}
                <p className="animate-fade-up delay-300 text-white/50 text-lg max-w-xl leading-relaxed mb-3"
                  style={{ borderLeft: "3px solid var(--pink)", paddingLeft: "18px" }}>
                  &quot;Chibi kustom yang lucu dan bisa bergerak, cocok untuk stream atau konten digital kamu!&quot;
                </p>
                <div className="animate-fade-up delay-300 text-base mb-8" style={{ color: "rgba(255,45,120,0.4)" }}>
        
                </div>

                {/* Includes pills */}
                <div className="animate-fade-up delay-400 flex flex-wrap gap-2 mb-10">
                  {INCLUDES.map((inc) => (
                    <span key={inc} className="inline-flex items-center gap-1.5 glass text-sm uppercase tracking-wide px-4 py-2 rounded-full">
                      <span style={{ color: "var(--pink)" }}>✓</span>
                      <span className="text-white/55">{inc}</span>
                    </span>
                  ))}
                </div>

                {/* CTA buttons */}
                <div className="animate-fade-up delay-500 flex flex-wrap gap-4">
                  <a href="#pricing" className="btn-pink text-base px-8 py-4">Lihat Harga ↓</a>
                  <a href="#videos"  className="btn-outline text-base px-8 py-4">Lihat Demo ▶</a>
                </div>
              </div>

              {/* ── RIGHT: roserachii profile card ── */}
              <div className="animate-slide-left delay-200 flex justify-center lg:justify-end">
                <div className="relative animate-float">
                  {/* Outer pink glow blob */}
                  <div className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(255,45,120,0.35) 0%, transparent 70%)", filter: "blur(50px)", transform: "scale(1.5)" }} />
                  {/* Animated spinning border */}
                  <div className="absolute inset-[-4px] rounded-3xl animate-spin-slow pointer-events-none"
                    style={{ background: "conic-gradient(transparent 0deg, transparent 250deg, var(--pink) 300deg, rgba(255,154,200,0.8) 330deg, transparent 360deg)" }} />

                  {/* Card itself */}
                  <div className="relative rounded-3xl overflow-hidden w-[290px] md:w-[350px]"
                    style={{ border: "1px solid rgba(255,45,120,0.25)", background: "var(--card)" }}>

                    {/* Photo */}
                    <div className="relative w-full" style={{ aspectRatio: "3/4" }}>
                      <Image
                        src={ROSE_IMG}
                        alt="roserachii"
                        fill
                        className="object-cover object-top"
                        unoptimized
                        priority
                      />
                      {/* Gradient overlay so text is readable */}
                      <div className="absolute inset-0"
                        style={{ background: "linear-gradient(to top, rgba(8,8,16,1) 0%, rgba(8,8,16,0.4) 45%, transparent 70%)" }} />

                      {/* Top-left live badge */}
                      <div className="absolute top-4 left-4 flex items-center gap-2 glass-pink rounded-full px-3 py-1.5">
                        <span className="w-2 h-2 rounded-full bg-[var(--pink)] animate-ping" style={{ animationDuration: "1.5s" }} />
                        <span className="text-xs font-bold uppercase tracking-widest text-white">Live2D Artist</span>
                      </div>
                    </div>

                    {/* Bottom info */}
                    <div className="px-6 py-5">
                      <div className="display text-3xl text-white">🌸 roserachii</div>
                      <div className="text-base text-white/40 mt-0.5 mb-4">Illustrator & Chibi Specialist</div>

                      {/* Tag row */}
                      <div className="flex gap-2 flex-wrap mb-5">
                        {["Chibi","Live2D","VTuber","Commission","art"].map((tag) => (
                          <span key={tag} className="glass-pink text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full"
                            style={{ color: "var(--pink)" }}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Visit button */}
                      <a href="https://roserachii.carrd.co" target="_blank" rel="noreferrer"
                        className="btn-pink w-full text-center text-base py-3 block">
                        🌸 Portfolio ↗
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            PRICING
        ══════════════════════════════════════════ */}
        <section id="pricing" className="py-20 relative overflow-hidden" style={{ background: "var(--surface)" }}>
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] opacity-5 pointer-events-none"
            style={{ background: "radial-gradient(circle, var(--pink) 0%, transparent 70%)", filter: "blur(80px)" }} />
          <div className="max-w-6xl mx-auto px-6 relative z-10">

            <div className="animate-fade-up mb-10">
              <div className="section-label">Harga & Paket</div>
              <h2 className="display text-5xl md:text-6xl">
                <span className="text-white">HARGA </span><span className="grad-text">& PAKET.</span>
              </h2>
            </div>

            {/* Currency toggle */}
            <div className="animate-fade-up delay-100 flex mb-10 glass rounded-xl p-1 w-fit">
              {(["local","intl"] as const).map((c) => (
                <button key={c} onClick={() => setCurrency(c)}
                  className={`text-base font-bold uppercase tracking-widest px-6 py-3 rounded-lg transition-all ${currency === c ? "text-white" : "text-white/30 hover:text-white/60"}`}
                  style={currency === c ? { background: "var(--pink)" } : {}}>
                  {c === "local" ? "🇮🇩 Local (IDR)" : "🌐 International (USD)"}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6 animate-fade-up delay-200">
              {/* Base price card */}
              <div className="card p-6 relative overflow-hidden border-glow-anim">
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "var(--pink)" }} />
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="text-sm font-bold uppercase tracking-widest text-white/30 mb-2">{pricing.flag} {pricing.label}</div>
                    <div className="display leading-none" style={{ fontSize: "5rem", color: "var(--pink)" }}>{pricing.base}</div>
                    <div className="text-base text-white/40 mt-1">Base price · 1 karakter</div>
                  </div>
                  <div className="text-5xl animate-float">🎀</div>
                </div>
                <div className="rounded-xl p-4 mb-5" style={{ background: "rgba(255,45,120,0.06)", border: "1px solid rgba(255,45,120,0.15)" }}>
                  <div className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "var(--pink)" }}>
                    Termasuk {pricing.expressions.length} Ekspresi:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {pricing.expressions.map((expr) => (
                      <span key={expr} className="glass text-sm px-3 py-1 rounded-full text-white/60">{expr}</span>
                    ))}
                  </div>
                </div>
                <div className="space-y-2.5">
                  {INCLUDES.map((inc) => (
                    <div key={inc} className="flex items-center gap-2 text-base text-white/50">
                      <span style={{ color: "var(--pink)" }}>✓</span>{inc}
                    </div>
                  ))}
                </div>
                <div className="rounded-xl p-4 mb-5">
                    <a href="https://roserachii.carrd.co/#termandconditions" target="_blank" rel="noreferrer"
                        className="btn-pink w-full text-center text-base py-3 block">
                        🌸 Term & Conditions 🌸
                      </a>
                </div>
              </div>
              {/* Add-ons card */}
              <div className="card p-6">
                <div className="text-sm font-bold uppercase tracking-widest text-white/30 mb-1">Tambahan</div>
                <div className="display text-4xl text-white mb-6">ADD-ONS</div>
                <div>
                  {pricing.addons.map((addon, i) => (
                    <div key={addon.name}
                      className={`flex items-center justify-between py-4 ${i < pricing.addons.length - 1 ? "border-b" : ""}`}
                      style={{ borderColor: "var(--border)" }}>
                      <span className="text-base text-white/55">{addon.name}</span>
                      <span className="text-base font-bold" style={{ color: "var(--pink)" }}>{addon.price}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)" }}>
                  <p className="text-sm text-white/30 leading-relaxed">
                    * Harga dapat berubah tanpa pemberitahuan.<br />
                    * DM untuk estimasi custom & detail lebih lanjut.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            VIDEOS
        ══════════════════════════════════════════ */}
        <section id="videos" className="py-20 relative overflow-hidden" style={{ background: "var(--bg)" }}>
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-5 pointer-events-none"
            style={{ background: "radial-gradient(ellipse, var(--pink) 0%, transparent 70%)", filter: "blur(80px)" }} />
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="animate-fade-up mb-12">
              <div className="section-label">Demo & Preview</div>
              <h2 className="display text-5xl md:text-6xl">
                <span className="text-white">CONTOH </span><span className="grad-text">LIVE2D.</span>
              </h2>
              <p className="text-base text-white/30 mt-3 uppercase tracking-wide">Lihat sendiri bagaimana chibi-nya bergerak ↓</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 animate-fade-up delay-100">
              {VIDEOS.map((vid, i) => (
                <div key={vid.id}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-base font-bold mono" style={{ color: "var(--pink)" }}>// 0{i+1}</span>
                    <span className="text-sm text-white/30 uppercase tracking-widest">{vid.label}</span>
                  </div>
                  <div className="card overflow-hidden hover-lift" style={{ padding: 0 }}>
                    <div className="relative" style={{ paddingBottom: "56.25%" }}>
                      <iframe
                        src={`https://www.youtube.com/embed/${vid.id}?rel=0&modestbranding=1&color=white`}
                        title={vid.label}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen className="absolute inset-0 w-full h-full" />
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between" style={{ borderTop: "1px solid var(--border)" }}>
                      <span className="text-sm text-white/25 uppercase tracking-wide">{vid.label}</span>
                      <a href={`https://youtu.be/${vid.id}`} target="_blank" rel="noreferrer"
                        className="text-sm font-bold uppercase tracking-wide hover:underline" style={{ color: "var(--pink)" }}>YT ↗</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* ══════════════════════════════════════════
            TOS
        ══════════════════════════════════════════ */}
        <section className="py-20 relative overflow-hidden" style={{ background: "var(--bg)" }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="animate-fade-up mb-12">
              <div className="section-label">Terms of Service</div>
              <h2 className="display text-5xl md:text-6xl">
                <span className="text-white">TERMS OF </span><span className="grad-text">SERVICE.</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5 animate-fade-up delay-100">
              {[
                { title: "✓ Yang Boleh", color: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.3)", dot: "#22c55e",
                  items: ["Personal use & VTuber streaming","Non-commercial content","Profile picture & avatar","Konten digital pribadi"] },
                { title: "✕ Yang Tidak Boleh", color: "rgba(255,45,120,0.06)", border: "rgba(255,45,120,0.25)", dot: "var(--pink)",
                  items: ["Resell atau redistribute karya","Mengklaim sebagai karya sendiri","Commercial use tanpa izin","Konten hate speech / NSFW"] },
              ].map((col) => (
                <div key={col.title} className="rounded-2xl p-6" style={{ background: col.color, border: `1px solid ${col.border}` }}>
                  <div className="text-base font-bold uppercase tracking-widest text-white mb-5">{col.title}</div>
                  <ul className="space-y-3.5">
                    {col.items.map((item) => (
                      <li key={item} className="flex gap-3 items-start text-base text-white/55">
                        <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: col.dot }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {/* Order flow */}
            <div className="mt-6 card p-8 animate-fade-up delay-200">
              <div className="text-sm font-bold uppercase tracking-widest mb-8" style={{ color: "var(--pink)" }}>Alur Order</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { step:"01", label:"DM & Diskusi",  desc:"Ceritakan referensi & kebutuhanmu" },
                  { step:"02", label:"DP 50%",         desc:"Pembayaran DP sebelum mulai" },
                  { step:"03", label:"Proses",          desc:"3–14 hari kerja, update berkala" },
                  { step:"04", label:"Pelunasan",       desc:"Bayar sisa, file langsung dikirim" },
                ].map((s, i) => (
                  <div key={s.step} className={`${i < 3 ? "md:border-r md:pr-6" : ""}`} style={{ borderColor: "var(--border)" }}>
                    <div className="display text-5xl mb-3" style={{ color: "var(--pink)" }}>{s.step}</div>
                    <div className="text-base font-bold uppercase tracking-wide text-white mb-1">{s.label}</div>
                    <div className="text-sm text-white/35 leading-relaxed">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CTA — with roserachii avatar
        ══════════════════════════════════════════ */}
        <section className="py-24 relative overflow-hidden" style={{ background: "var(--surface)" }}>
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, var(--pink) 0%, transparent 70%)", filter: "blur(60px)" }} />
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

          <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
            {/* Avatar pair */}
            <div className="flex items-center justify-center gap-5 mb-8 animate-fade-up">
              {/* roserachii */}
              <div className="relative">
                <div className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(255,45,120,0.5) 0%, transparent 70%)", filter: "blur(14px)", transform: "scale(1.4)" }} />
                <div className="relative w-20 h-20 rounded-full overflow-hidden"
                  style={{ border: "3px solid var(--pink)" }}>
                  <Image src={ROSE_IMG} alt="roserachii" fill className="object-cover object-top" unoptimized />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                  style={{ background: "var(--pink)", color: "white" }}>roserachii</div>
              </div>

              {/* X separator */}
              <div className="display text-4xl text-white/20 mb-2">×</div>

              {/* natgul */}
              <div className="relative">
                <div className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(255,45,120,0.5) 0%, transparent 70%)", filter: "blur(14px)", transform: "scale(1.4)" }} />
                <div className="relative w-20 h-20 rounded-full overflow-hidden"
                  style={{ border: "3px solid var(--pink)" }}>
                  <Image src="https://avatars.githubusercontent.com/u/64382924?v=4" alt="natgul" fill className="object-cover object-top" unoptimized />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                  style={{ background: "var(--pink)", color: "white" }}>natgul</div>
              </div>
            </div>
            <h2 className="display animate-fade-up delay-100 leading-none mb-5"
              style={{ fontSize: "clamp(2.5rem,7vw,5.5rem)", letterSpacing: "-0.04em" }}>
              <span className="text-white">SIAP ORDER?</span><br />
              <span className="grad-text">HUBUNGI SEKARANG!</span>
            </h2>
            <p className="text-base text-white/35 mb-10 max-w-md mx-auto animate-fade-up delay-200 leading-relaxed">
              DM kami di Instagram untuk mulai diskusi. Slot terbatas setiap bulannya!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up delay-300">
              <a href="https://www.instagram.com/roserachii" target="_blank" rel="noreferrer"
                className="btn-pink text-base px-8 py-4">🌸 DM @roserachii ↗</a>
              <a href="https://www.instagram.com/sam.zen" target="_blank" rel="noreferrer"
                className="btn-outline text-base px-8 py-4">DM @natgul ↗</a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      {activeItem && <Lightbox item={activeItem} onClose={() => setLightbox(null)} onPrev={prev} onNext={next} />}
    </>
  );
}
