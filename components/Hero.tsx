"use client";
import { GithubUser } from "@/lib/types";
import Image from "next/image";
import TypewriterTitle from "@/components/TypewriterTitle";

export default function Hero({ user }: { user: GithubUser }) {
  const marqueeItems = ["Developer","Designer","Live2D","Chibi","Illustration","VTuber","Commission","Creative"];

  return (
    <section className="relative min-h-screen mesh-bg overflow-hidden flex flex-col">
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{ background:"radial-gradient(circle,rgba(255,45,120,0.4) 0%,transparent 70%)", filter:"blur(80px)" }} />
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
        style={{ background:"radial-gradient(circle,rgba(120,40,200,0.6) 0%,transparent 70%)", filter:"blur(60px)" }} />
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage:"linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize:"60px 60px" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-36 pb-16 flex-1 flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <div className="section-label animate-fade-up mb-8">STATUS: ONLINE</div>

            <div className="animate-fade-up delay-100 mb-8">
              <TypewriterTitle />
            </div>

            <p className="animate-fade-up delay-200 text-white/55 text-lg leading-relaxed max-w-md mb-10"
              style={{ borderLeft:"3px solid var(--pink)", paddingLeft:"20px" }}>
              Developer & Designer yang suka eksplorasi berbagai hal — dari movie, komik, drakor, hingga project tech dan desain kreatif.
            </p>

            <div className="animate-fade-up delay-300 flex flex-wrap gap-4 mb-12">
              <a href="#projects" className="btn-pink text-base">Lihat Projects ↓</a>
          { /* <a href="/commission-chibi" className="btn-outline text-base">Commission Chibi ✦</a> */ }
            </div>

            {/* Social Media */}
            <div className="animate-fade-up delay-400 flex gap-3">
              {[
                {
                  href: "https://www.youtube.com/@nat-gul",
                  label: "YouTube",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  ),
                },
                {
                  href: "https://www.instagram.com/sam.zen",
                  label: "Instagram",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                    </svg>
                  ),
                },
                {
                  href: "https://www.facebook.com/samzenJP/",
                  label: "Facebook",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  ),
                },
                {
                  href: "https://bagibagi.co/nnyxx",
                  label: "BagiBagi",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm4 10.5h-2.5V19h-3v-3.5H8v-3h2.5V9h3v3.5H16v3z"/>
                    </svg>
                  ),
                },
                {
                  href: "https://trakteer.id/samzen/tip",
                  label: "Trakteer",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                     <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm4 10.5h-2.5V19h-3v-3.5H8v-3h2.5V9h3v3.5H16v3z"/>
                    </svg>
                  ),
                },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  aria-label={s.label}
                  className="social-icon-btn group relative glass rounded-xl p-4 flex items-center justify-center transition-all duration-300">
                  <span className="icon-inner">
                    {s.icon}
                  </span>
                  {/* Tooltip */}
                  <span className="absolute -top-9 left-1/2 -translate-x-1/2 text-xs font-bold uppercase tracking-widest px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap"
                    style={{ background:"var(--pink)", color:"white" }}>
                    {s.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="animate-slide-left delay-200 flex justify-center lg:justify-end">
            <div className="relative animate-float">
              <div className="absolute inset-0 rounded-2xl opacity-60"
                style={{ background:"radial-gradient(circle,rgba(255,45,120,0.3) 0%,transparent 70%)", filter:"blur(30px)", transform:"scale(1.3)" }} />
              <div className="absolute inset-[-3px] rounded-2xl animate-spin-slow"
                style={{ background:"conic-gradient(transparent,transparent,transparent,var(--pink))", borderRadius:"18px" }} />
              <div className="relative rounded-2xl overflow-hidden w-[280px] md:w-[340px]"
                style={{ border:"1px solid rgba(255,45,120,0.3)", background:"var(--card)" }}>
                <Image src={user.avatar_url} alt={user.name || user.login}
                  width={340} height={425} className="w-full object-cover" priority style={{ aspectRatio:"4/5" }} />
                <div className="absolute bottom-0 left-0 right-0 px-5 py-5"
                  style={{ background:"linear-gradient(transparent,rgba(8,8,16,0.97))" }}>
                  <div className="text-base font-bold uppercase tracking-widest" style={{ color:"var(--pink)" }}>@{user.login}</div>
                  <div className="text-sm text-white/40 mt-0.5">{user.bio || "Developer & Designer"}</div>
                  <a href={user.html_url} target="_blank" rel="noreferrer"
                    className="inline-block mt-3 text-sm font-bold uppercase tracking-widest px-3 py-1.5 rounded transition-all hover:bg-white hover:text-black"
                    style={{ border:"1px solid rgba(255,255,255,0.2)", color:"white" }}>
                    VISIT ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative z-10 border-t overflow-hidden py-5" style={{ borderColor:"var(--border)" }}>
        <div className="marquee-wrap">
          <div className="marquee-track animate-marquee">
            {[...marqueeItems,...marqueeItems].map((item, i) => (
              <span key={i} className="text-base font-semibold uppercase tracking-widest text-white/50 mx-10">
                {item} <span style={{ color:"var(--pink)" }}>✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
