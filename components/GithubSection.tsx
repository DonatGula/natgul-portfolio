import { GithubRepo, GithubUser } from "@/lib/types";
import Image from "next/image";

const LANG_COLORS: Record<string,string> = {
  JavaScript:"#F7DF1E", TypeScript:"#3178C6", Python:"#3572A5",
  Dart:"#00B4AB", HTML:"#E34C26", CSS:"#563D7C", Go:"#00ADD8",
  Rust:"#DEA584", Java:"#B07219", Kotlin:"#A97BFF",
};
const pad = (n: number) => String(n).padStart(2,"0");

export default function GithubSection({ user, repos }: { user: GithubUser; repos: GithubRepo[] }) {
  return (
    <section id="projects" className="py-24 relative overflow-hidden" style={{ background:"var(--surface)" }}>
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] -translate-y-1/2 opacity-5 pointer-events-none"
        style={{ background:"radial-gradient(circle,var(--pink) 0%,transparent 70%)", filter:"blur(80px)" }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="section-label">Projects Hiburan</div>
         <div className="animate-fade-up delay-300 flex flex-wrap gap-4 mb-12">
            <a href="https://natgul.vercel.app/" target="_blank" rel="noreferrer" className="btn-pink text-base">Movie</a>
            <a href="https://natgul.vercel.app/komik" target="_blank" rel="noreferrer" className="btn-pink text-base">Komik</a>
            <a href="https://github.com/DonatGula/nyxdrama-app/releases/download/NyxDrama_v_1_5_1/NyxDrama.-.v.1.5.1._.BT.apk" target="_blank" rel="noreferrer" className="btn-pink text-base">Dracin</a>
          </div>

        {/* Title */}
        <div className="animate-fade-up mb-12">
          <div className="section-label">GitHub Projects</div>
          <h2 className="display text-5xl md:text-7xl">
            <span className="text-white">PROJECT </span>
            <span className="grad-text">GITHUB.</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {repos.map((repo, i) => (
            <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer"
              className="card p-6 flex flex-col gap-4 group animate-fade-up hover-lift"
              style={{ animationDelay:`${i*0.05}s` }}>
              <div className="text-base font-bold mono" style={{ color:"var(--pink)" }}>// {pad(i+1)}</div>
              <div className="display text-xl text-white group-hover:grad-text transition-all leading-tight">
                {repo.name.toUpperCase()}
              </div>
              <p className="text-base text-white/40 leading-relaxed flex-1 line-clamp-2">
                {repo.description || "No description available."}
              </p>
              {repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {repo.topics.slice(0,3).map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wide"
                      style={{ background:"rgba(255,45,120,0.1)", color:"var(--pink)", border:"1px solid rgba(255,45,120,0.2)" }}>
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between border-t pt-4" style={{ borderColor:"var(--border)" }}>
                <div className="flex items-center gap-2">
                  {repo.language && (
                    <>
                      <span className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ background:LANG_COLORS[repo.language] || "#888" }} />
                      <span className="text-sm font-semibold uppercase tracking-wide text-white/35">{repo.language}</span>
                    </>
                  )}
                </div>
                <span className="text-sm font-bold uppercase tracking-wide" style={{ color:"var(--pink)" }}>SOURCE ↗</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
