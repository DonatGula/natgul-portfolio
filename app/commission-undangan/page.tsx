"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ── Data ─────────────────────────────────────────────────── */
const PACKAGES = [
  {
    id: "basic",
    name: "Basic",
    emoji: "🌸",
    price: "Rp -",
    highlight: false,
    features: [
      "1 halaman undangan",
      "Foto pasangan (1 foto)",
      "Informasi acara lengkap",
      "Countdown timer",
      "Tombol maps lokasi",
      "Link shareable",
    ],
    notIncluded: ["RSVP form", "Galeri foto", "Musik latar", "Animasi premium"],
  },
  {
    id: "standard",
    name: "Standard",
    emoji: "💍",
    price: "Rp 85.000",
    highlight: true,
    features: [
      "Semua fitur Basic",
      "RSVP form konfirmasi",
      "Galeri foto (maks 5)",
      "Musik latar pilihan",
      "Animasi elegan",
      "2x revisi desain",
    ],
    notIncluded: ["Animasi premium custom", "Video intro"],
  },
  {
    id: "premium",
    name: "Premium",
    emoji: "👑",
    price: "Rp -",
    highlight: false,
    features: [
      "Semua fitur Standard",
      "Animasi & transisi premium",
      "Video / slideshow intro",
      "Galeri foto unlimited",
      "Amplop digital",
      "3x revisi desain",
      "Prioritas pengerjaan",
    ],
    notIncluded: [],
  },
];

const ADDONS = [
  { name: "Tambah halaman",         price: "Rp 15.000" },
  { name: "Ucapan / quotes custom", price: "Rp 10.000" },
  { name: "QR Code undangan",       price: "Rp 10.000" },
  { name: "Revisi tambahan",        price: "Rp 15.000" },
  { name: "Domain custom (.com)",   price: "Rp 25.000" },
  { name: "Amplop digital",         price: "Rp 20.000" },
];

const GALLERY = [
  { id: 1,  src: "/undangan/1.webp",  label: "Elegan White" },
  { id: 2,  src: "/undangan/2.webp",  label: "Gold Premium" },
  { id: 3,  src: "/undangan/3.webp",  label: "Floral Pink"  },
  { id: 4,  src: "/undangan/4.webp",  label: "Modern Dark"  },
  { id: 5,  src: "/undangan/5.webp",  label: "Minimalis"    },
  { id: 6,  src: "/undangan/6.webp",  label: "Royal Gold"   },
  { id: 7,  src: "/undangan/7.webp",  label: "Garden Fresh" },
  { id: 8,  src: "/undangan/8.webp",  label: "Soft Pastel"  },
  { id: 9,  src: "/undangan/9.webp",  label: "Midnight Blue"},
  { id: 10, src: "/undangan/10.webp", label: "Ribbon Cute"  },
  { id: 11, src: "/undangan/11.webp", label: "Nature Green" },
];

const STEPS = [
  { n: "01", title: "DM & Diskusi",    desc: "Hubungi kami via WA atau IG, ceritakan konsep & kebutuhanmu", icon: "💬" },
  { n: "02", title: "DP & Brief",      desc: "Bayar DP 50%, kirimkan foto & data lengkap pasangan",          icon: "📋" },
  { n: "03", title: "Proses Desain",   desc: "Pengerjaan 2–5 hari kerja, update progress berkala",            icon: "🎨" },
  { n: "04", title: "Revisi & Acc",    desc: "Cek hasil, minta revisi jika perlu hingga puas",               icon: "✅" },
  { n: "05", title: "Pelunasan & Live","desc": "Bayar sisa, undangan langsung bisa disebarkan!",             icon: "🚀" },
];

const MARQUEE_ITEMS = ["Undangan Online","Elegan","Countdown Timer","RSVP Form","Galeri Foto","Musik Latar","Animasi Smooth","Custom Design","Natgul Design"];

/* ── Lightbox ─────────────────────────────────────────────── */
function Lightbox({ items, index, onClose, onPrev, onNext }: {
  items: typeof GALLERY; index: number; onClose:()=>void; onPrev:()=>void; onNext:()=>void;
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

  const item = items[index];
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center animate-fade-in"
      style={{ background: "rgba(8,8,16,0.97)", backdropFilter: "blur(24px)" }}
      onClick={onClose}>
      <button onClick={onClose}
        className="absolute top-4 right-4 text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white glass px-3 py-1.5 rounded-lg transition-colors z-10">
        ESC ✕
      </button>
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-3 top-1/2 -translate-y-1/2 glass w-11 h-11 rounded-xl flex items-center justify-center text-white/60 hover:text-white text-2xl z-10">‹</button>
      <button onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-3 top-1/2 -translate-y-1/2 glass w-11 h-11 rounded-xl flex items-center justify-center text-white/60 hover:text-white text-2xl z-10">›</button>
      <div className="animate-scale-in w-[88vw] max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="relative rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(255,45,120,0.4)", boxShadow: "0 0 80px rgba(255,45,120,0.2)" }}>
          <Image src={item.src} alt={item.label} width={600} height={900}
            className="w-full object-cover" unoptimized priority />
          <div className="absolute bottom-0 left-0 right-0 px-5 py-4 flex items-center justify-between"
            style={{ background: "linear-gradient(transparent, rgba(8,8,16,0.97))" }}>
            <span className="text-base font-bold text-white uppercase tracking-wide">{item.label}</span>
            <span className="text-sm text-white/30 mono">{index + 1} / {items.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Preview Card ─────────────────────────────────────────── */
function PreviewCard({ item, onClick }: { item: typeof GALLERY[0]; onClick: () => void }) {
  return (
    <div className="card overflow-hidden group cursor-none flex flex-col hover-lift" onClick={onClick}>
      <div className="relative overflow-hidden" style={{ paddingBottom: "133%" }}>
        <Image src={item.src} alt={item.label} fill
          sizes="(max-width:640px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110" unoptimized />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{ background: "rgba(8,8,16,0.65)", backdropFilter: "blur(4px)" }}>
          <span className="glass-pink text-sm font-bold uppercase tracking-wide text-white px-4 py-2 rounded-full">LIHAT ↗</span>
        </div>
      </div>
      <div className="px-3 py-2.5 flex-shrink-0" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="text-sm font-bold text-white/70 uppercase tracking-wide">{item.label}</div>
      </div>
    </div>
  );
}

/* ── Package Card ─────────────────────────────────────────── */
function PackageCard({ pkg }: { pkg: typeof PACKAGES[0] }) {
  return (
    <div className={`relative rounded-2xl p-6 flex flex-col transition-all duration-300 hover:-translate-y-2 ${pkg.highlight ? "border-glow-anim" : "card"}`}
      style={pkg.highlight ? { boxShadow: "0 20px 60px rgba(255,45,120,0.2)" } : {}}>
      {pkg.highlight && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
          style={{ background: "var(--pink)", color: "white" }}>  
          RECOMMENDED
        </div>
      )}
      <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
        style={{ background: pkg.highlight ? "var(--pink)" : "rgba(255,255,255,0.1)" }} />

      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{pkg.emoji}</span>
        <div>
          <div className="display text-2xl text-white">{pkg.name}</div>
          <div className="text-sm text-white/35 uppercase tracking-widest">Paket</div>
        </div>
      </div>

      <div className="mb-5">
        <span className="display text-4xl" style={{ color: "var(--pink)" }}>{pkg.price}</span>
        <span className="text-sm text-white/30 ml-2">/ undangan</span>
      </div>

      <div className="space-y-2.5 flex-1 mb-5">
        {pkg.features.map((f) => (
          <div key={f} className="flex gap-2.5 items-start text-sm text-white/60">
            <span className="mt-0.5 flex-shrink-0" style={{ color: "var(--pink)" }}>✓</span>{f}
          </div>
        ))}
        {pkg.notIncluded.map((f) => (
          <div key={f} className="flex gap-2.5 items-start text-sm text-white/25 line-through">
            <span className="mt-0.5 flex-shrink-0">✗</span>{f}
          </div>
        ))}
      </div>

      <a href="https://wa.me/628155625860?text=Halo%20Natgul%20Design%2C%20saya%20mau%20order%20undangan%20online%20paket%20"
        target="_blank" rel="noreferrer"
        className={`w-full text-center text-sm font-bold py-3 rounded-xl transition-all duration-200 uppercase tracking-widest block ${pkg.highlight ? "btn-pink" : "btn-outline"}`}>
        Pilih Paket {pkg.name} →
      </a>
    </div>
  );
}

/* ── Main Page ────────────────────────────────────────────── */
export default function CommissionUndanganPage() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const prev = useCallback(() => setLightboxIdx((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const next = useCallback(() => setLightboxIdx((i) => (i !== null && i < GALLERY.length - 1 ? i + 1 : i)), []);

  return (
    <>
      <Navbar />
      <main>

        {/* ══ HERO ══════════════════════════════════════════════ */}
        <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden mesh-bg">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle,rgba(255,45,120,0.15) 0%,transparent 70%)", filter: "blur(100px)" }} />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle,rgba(180,100,255,0.1) 0%,transparent 70%)", filter: "blur(80px)" }} />
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

          <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
            <div className="grid lg:grid-cols-2 gap-14 items-center">

              {/* Left */}
              <div>
                <div className="animate-fade-up mb-6">
                  <div className="section-label">Open Commission · Undangan Online</div>
                </div>

                <h1 className="display animate-fade-up delay-100 leading-none mb-6"
                  style={{ fontSize: "clamp(3rem,9vw,7rem)", letterSpacing: "-0.04em" }}>
                  <span className="text-white">UNDANGAN</span><br />
                  <span className="text-white">ONLINE </span>
                  <span className="grad-text">CANTIK.</span>
                </h1>

                <p className="animate-fade-up delay-200 text-white/50 text-lg leading-relaxed max-w-md mb-4"
                  style={{ borderLeft: "3px solid var(--pink)", paddingLeft: "18px" }}>
                  Undangan digital modern yang elegan, bisa dibuka dari HP tanpa perlu install apapun. Desain custom sesuai konsep impianmu!
                </p>

                <div className="animate-fade-up delay-200 text-base mb-8" style={{ color: "rgba(255,45,120,0.4)" }}>
                
                </div>

                {/* Feature pills */}
                <div className="animate-fade-up delay-300 flex flex-wrap gap-2 mb-10">
                  {["Countdown Timer","RSVP Form","Galeri Foto","Musik Latar","Link Shareable","Custom Desain"].map((f) => (
                    <span key={f} className="inline-flex items-center gap-1.5 glass text-sm uppercase tracking-wide px-4 py-2 rounded-full">
                      <span style={{ color: "var(--pink)" }}>✓</span>
                      <span className="text-white/55">{f}</span>
                    </span>
                  ))}
                </div>

                <div className="animate-fade-up delay-400 flex flex-wrap gap-4">
                  <a href="#pricing" className="btn-pink text-base px-8 py-4">Lihat Harga ↓</a>
                  <a href="#preview" className="btn-outline text-base px-8 py-4">Lihat Contoh ✦</a>
                </div>
              </div>

              {/* Right — floating card stack */}
              <div className="animate-slide-left delay-200 flex justify-center lg:justify-end">
                <div className="relative w-[280px] md:w-[340px] animate-float">
                  {/* Glow */}
                  <div className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{ background: "radial-gradient(circle,rgba(255,45,120,0.3) 0%,transparent 70%)", filter: "blur(50px)", transform: "scale(1.5)" }} />
                  {/* Spinning border */}
                  <div className="absolute inset-[-4px] rounded-3xl animate-spin-slow pointer-events-none"
                    style={{ background: "conic-gradient(transparent 0deg,transparent 250deg,var(--pink) 300deg,rgba(255,154,200,0.8) 330deg,transparent 360deg)" }} />
                  {/* Card */}
                  <div className="relative rounded-3xl overflow-hidden"
                    style={{ border: "1px solid rgba(255,45,120,0.25)", background: "var(--card)" }}>
                    <Image src="/undangan/2.webp" alt="Preview Undangan"
                      width={340} height={480} className="w-full object-cover" unoptimized />
                    <div className="absolute inset-0"
                      style={{ background: "linear-gradient(to top,rgba(8,8,16,1) 0%,rgba(8,8,16,0.2) 40%,transparent 65%)" }} />
                    {/* Live badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 glass-pink rounded-full px-3 py-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#FF2D78]" style={{ animation: "ping-slow 1.5s infinite" }} />
                      <span className="text-xs font-bold uppercase tracking-widest text-white">Natgul Design</span>
                    </div>
                    {/* Bottom info */}
                    <div className="absolute bottom-0 left-0 right-0 px-5 py-5">
                      <div className="display text-2xl text-white mb-1">Undangan Online</div>
                      <div className="text-sm text-white/40 mb-4">Custom · Elegan · Modern</div>
                      <div className="flex gap-2">
                        {["Timer","RSVP","Galeri"].map((tag) => (
                          <span key={tag} className="glass-pink text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide" style={{ color: "var(--pink)" }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Marquee */}
          <div className="absolute bottom-0 left-0 right-0 border-t overflow-hidden py-4 text-color-white" style={{ borderColor: "var(--border)" }}>
            <div className="marquee-wrap text-color-white">
              <div className="marquee-track animate-marquee text-color-white">
                {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                  <span key={i} className="text-sm font-semibold uppercase tracking-widest text-white mx-8">
                    {item} <span style={{ color: "var(--pink)" }}>✦</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ PREVIEW KARYA ═══════════════════════════════════ */}
        <section id="preview" className="py-20 relative overflow-hidden" style={{ background: "var(--surface)" }}>
          <div className="absolute top-0 right-0 w-[400px] h-[400px] opacity-5 pointer-events-none"
            style={{ background: "radial-gradient(circle,var(--pink) 0%,transparent 70%)", filter: "blur(80px)" }} />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

            <div className="animate-fade-up mb-12">
              <div className="section-label">Portofolio & Contoh Desain</div>
              <h2 className="display text-4xl sm:text-5xl md:text-7xl">
                <span className="text-white">PREVIEW </span>
                <span className="grad-text">KARYA.</span>
              </h2>
              <p className="text-base text-white/35 mt-3 max-w-lg">
                Semua desain di bawah adalah contoh nyata karya Natgul Design. Klik untuk melihat lebih jelas!
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 animate-fade-up delay-100">
              {GALLERY.map((item, i) => (
                <div key={item.id} className="animate-fade-up" style={{ animationDelay: `${i * 0.04}s` }}>
                  <PreviewCard item={item} onClick={() => setLightboxIdx(i)} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PRICING ═════════════════════════════════════════ */}
        <section id="pricing" className="py-20 relative overflow-hidden" style={{ background: "var(--bg)" }}>
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] opacity-5 pointer-events-none"
            style={{ background: "radial-gradient(ellipse,var(--pink) 0%,transparent 70%)", filter: "blur(80px)" }} />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="animate-fade-up mb-4">
              <div className="section-label">Paket & Harga</div>
              <h2 className="display text-4xl sm:text-5xl md:text-7xl">
                <span className="text-white">PAKET </span>
                <span className="grad-text">HARGA.</span>
              </h2>
            </div>

            {/* Starting price note */}
            <div className="animate-fade-up delay-100 flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-10 rounded-xl px-5 py-4"
              style={{ background: "rgba(255,45,120,0.07)", border: "1px solid rgba(255,45,120,0.2)" }}>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold uppercase tracking-widest text-white/40">Mulai dari</span>
                <span className="display text-3xl" style={{ color: "var(--pink)" }}>Rp 50.000</span>
              </div>
              <div className="hidden sm:block w-px h-8" style={{ background: "rgba(255,45,120,0.2)" }} />
              <span className="text-sm text-white/40 italic">*Harga naik sesuai kompleksitas & add-on yang diminta</span>
            </div>

            {/* Package cards */}
            <div className="grid md:grid-cols-3 gap-6 animate-fade-up delay-200 mb-12">
              {PACKAGES.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)}
            </div>

            {/* Add-ons */}
            <div className="card p-6 md:p-8 animate-fade-up delay-300">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">✦</span>
                <div>
                  <div className="display text-3xl text-white">ADD-ONS</div>
                  <div className="text-sm text-white/35 uppercase tracking-widest">Fitur Tambahan</div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-0">
                {ADDONS.map((a, i) => (
                  <div key={a.name}
                    className={`flex items-center justify-between py-3.5 px-2 ${i < ADDONS.length - 2 || (ADDONS.length % 2 === 0) ? "border-b" : ""}`}
                    style={{ borderColor: "var(--border)" }}>
                    <span className="text-base text-white/55">{a.name}</span>
                    <span className="text-base font-bold ml-4" style={{ color: "var(--pink)" }}>{a.price}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-white/25 mt-5 italic">
                * Harga dapat berubah sewaktu-waktu. DM untuk estimasi lebih detail.
              </p>
            </div>
          </div>
        </section>

        {/* ══ PROSES ORDER ════════════════════════════════════ */}
        <section className="py-20 relative overflow-hidden" style={{ background: "var(--surface)" }}>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-5 pointer-events-none"
            style={{ background: "radial-gradient(circle,var(--pink) 0%,transparent 70%)", filter: "blur(80px)" }} />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

            <div className="animate-fade-up mb-12">
              <div className="section-label">Cara Order</div>
              <h2 className="display text-4xl sm:text-5xl md:text-7xl">
                <span className="text-white">PROSES </span>
                <span className="grad-text">ORDER.</span>
              </h2>
            </div>

            {/* Steps */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 animate-fade-up delay-100">
              {STEPS.map((s, i) => (
                <div key={s.n} className="relative">
                  {/* Connector line */}
                  {i < STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-px z-0"
                      style={{ background: "linear-gradient(to right,rgba(255,45,120,0.4),transparent)" }} />
                  )}
                  <div className="card p-5 relative z-10 hover-lift h-full">
                    <div className="text-3xl mb-3">{s.icon}</div>
                    <div className="display text-3xl mb-1" style={{ color: "var(--pink)" }}>{s.n}</div>
                    <div className="text-base font-bold text-white mb-2 uppercase tracking-wide">{s.title}</div>
                    <div className="text-sm text-white/40 leading-relaxed">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline note */}
            <div className="mt-8 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-up delay-200"
              style={{ background: "rgba(255,45,120,0.06)", border: "1px solid rgba(255,45,120,0.2)" }}>
              <span className="text-3xl">⏱️</span>
              <div>
                <div className="text-base font-bold text-white mb-0.5">Estimasi Waktu Pengerjaan</div>
                <div className="text-sm text-white/45">
                  Basic: <span className="text-white/70 font-semibold">1–2 hari</span> &nbsp;·&nbsp;
                  Standard: <span className="text-white/70 font-semibold">2–4 hari</span> &nbsp;·&nbsp;
                  Premium: <span className="text-white/70 font-semibold">4–7 hari</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ CTA ═════════════════════════════════════════════ */}
        <section className="py-24 relative overflow-hidden" style={{ background: "var(--bg)" }}>
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%,var(--pink) 0%,transparent 70%)", filter: "blur(60px)" }} />
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

          <div className="max-w-xl mx-auto px-6 text-center relative z-10">
            {/* Brand */}
            <div className="animate-fade-up mb-6 inline-flex items-center gap-3 glass-pink rounded-2xl px-5 py-3">
              <span className="text-2xl">💌</span>
              <span className="display text-2xl text-white">Natgul Design</span>
            </div>

            <h2 className="display animate-fade-up delay-100 leading-none mb-5"
              style={{ fontSize: "clamp(2.5rem,7vw,5rem)", letterSpacing: "-0.04em" }}>
              <span className="text-white">SIAP BUAT</span><br />
              <span className="grad-text">UNDANGANMU?</span>
            </h2>

            <p className="text-base text-white/35 mb-10 leading-relaxed animate-fade-up delay-200">
              Hubungi kami sekarang untuk diskusi konsep & dapatkan estimasi harga. Slot terbatas setiap bulan!
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up delay-300">
              <a href="https://wa.me/628155625860?text=Halo%20Natgul%20Design%2C%20saya%20mau%20order%20undangan%20online"
                target="_blank" rel="noreferrer"
                className="btn-pink text-base px-8 py-4 flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Order via WhatsApp
              </a>
              <a href="https://www.instagram.com/sam.zen" target="_blank" rel="noreferrer"
                className="btn-outline text-base px-8 py-4 flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
                DM via Instagram
              </a>
            </div>

          </div>
        </section>

      </main>
      <Footer />

      {lightboxIdx !== null && (
        <Lightbox items={GALLERY} index={lightboxIdx}
          onClose={() => setLightboxIdx(null)} onPrev={prev} onNext={next} />
      )}
    </>
  );
}
