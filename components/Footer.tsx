export default function Footer() {
  return (
    <footer className="relative py-12 overflow-hidden" style={{ background:"var(--surface)", borderTop:"1px solid var(--border)" }}>
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage:"linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize:"40px 40px" }} />
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        <div className="display text-4xl grad-text">NATGUL.</div>
        <div className="text-base text-white/25">© {new Date().getFullYear()} Natgul — Developer & Designer</div>
        <a href="https://github.com/DonatGula" target="_blank" rel="noreferrer"
          className="text-base font-bold uppercase tracking-widest text-white/30 hover:text-[#FF2D78] transition-colors">
          GitHub ↗
        </a>
      </div>
    </footer>
  );
}
