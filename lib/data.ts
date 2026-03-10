import { CommissionItem } from "./types";

// ── COMMISSION DESAIN ──────────────────────────────────────────
// Gambar dari folder public/ lokal kamu
// undangan: public/undangan/1.webp … 11.webp
// feed:     public/feed/feed_(1).webp … feed_(15).webp
// poster:   public/poster/poster_(2).webp, (4), (6), (7), (8), (10)
// banner:   public/banner/banner_(1).webp … banner_(17).webp

export const COMMISSION_DESAIN: CommissionItem[] = [
  // ── UNDANGAN (11 files) ──
  {
    id: 1, title: "Undangan Desain 1", category: "undangan", price: "Rp 50.000", emoji: "💌",
    tags: ["wedding", "digital"], color: "#FFE4ED",
    image: "/undangan/1.webp", imageFull: "/undangan/1.webp", width: 400, height: 600,
  },
  {
    id: 2, title: "Undangan Desain 2", category: "undangan", price: "Rp 50.000", emoji: "💍",
    tags: ["nikah", "mewah"], color: "#FFF0F7",
    image: "/undangan/2.webp", imageFull: "/undangan/2.webp", width: 400, height: 700,
  },
  {
    id: 3, title: "Undangan Desain 3", category: "undangan", price: "Rp 50.000", emoji: "🌸",
    tags: ["floral", "elegant"], color: "#FFF5F0",
    image: "/undangan/3.webp", imageFull: "/undangan/3.webp", width: 400, height: 550,
  },
  {
    id: 4, title: "Undangan Desain 4", category: "undangan", price: "Rp 50.000", emoji: "✨",
    tags: ["modern", "premium"], color: "#F0F4FF",
    image: "/undangan/4.webp", imageFull: "/undangan/4.webp", width: 400, height: 650,
  },
  {
    id: 5, title: "Undangan Desain 5", category: "undangan", price: "Rp 50.000", emoji: "🕊️",
    tags: ["minimalis", "clean"], color: "#F5FFF0",
    image: "/undangan/5.webp", imageFull: "/undangan/5.webp", width: 400, height: 600,
  },
  {
    id: 6, title: "Undangan Desain 6", category: "undangan", price: "Rp 50.000", emoji: "👑",
    tags: ["royal", "gold"], color: "#FFFBF0",
    image: "/undangan/6.webp", imageFull: "/undangan/6.webp", width: 400, height: 580,
  },
  {
    id: 7, title: "Undangan Desain 7", category: "undangan", price: "Rp 50.000", emoji: "💐",
    tags: ["garden", "floral"], color: "#F0FFF5",
    image: "/undangan/7.webp", imageFull: "/undangan/7.webp", width: 400, height: 600,
  },
  {
    id: 8, title: "Undangan Desain 8", category: "undangan", price: "Rp 50.000", emoji: "🫧",
    tags: ["soft", "pastel"], color: "#F5F0FF",
    image: "/undangan/8.webp", imageFull: "/undangan/8.webp", width: 400, height: 620,
  },
  {
    id: 9, title: "Undangan Desain 9", category: "undangan", price: "Rp 50.000", emoji: "🌙",
    tags: ["dark", "elegant"], color: "#F0F0FF",
    image: "/undangan/9.webp", imageFull: "/undangan/9.webp", width: 400, height: 600,
  },
  {
    id: 10, title: "Undangan Desain 10", category: "undangan", price: "Rp 50.000", emoji: "🎀",
    tags: ["ribbon", "cute"], color: "#FFF0F8",
    image: "/undangan/10.webp", imageFull: "/undangan/10.webp", width: 400, height: 640,
  },
  {
    id: 11, title: "Undangan Desain 11", category: "undangan", price: "Rp 50.000", emoji: "🌿",
    tags: ["nature", "green"], color: "#F0FFF2",
    image: "/undangan/11.webp", imageFull: "/undangan/11.webp", width: 400, height: 600,
  },

  // ── FEED IG (15 files) ──
  {
    id: 20, title: "Feed IG 1", category: "feed-ig", price: "Rp 25.000", emoji: "📱",
    tags: ["aesthetic", "feed"], color: "#F5F0FF",
    image: "/feed/feed_ 1.webp", imageFull: "/feed/feed_ 1.webp", width: 400, height: 400,
  },
  {
    id: 21, title: "Feed IG 2", category: "feed-ig", price: "Rp 25.000", emoji: "🎨",
    tags: ["clean", "minimal"], color: "#F0FFFC",
    image: "/feed/feed_ 2.webp", imageFull: "/feed/feed_ 2.webp", width: 400, height: 400,
  },
  {
    id: 22, title: "Feed IG 3", category: "feed-ig", price: "Rp 25.000", emoji: "📸",
    tags: ["story", "template"], color: "#FFF0F5",
    image: "/feed/feed_ 3.webp", imageFull: "/feed/feed_ 3.webp", width: 400, height: 711,
  },
  {
    id: 23, title: "Feed IG 4", category: "feed-ig", price: "Rp 25.000", emoji: "✨",
    tags: ["quote", "aesthetic"], color: "#FFFFF0",
    image: "/feed/feed_ 4.webp", imageFull: "/feed/feed_ 4.webp", width: 400, height: 400,
  },
  {
    id: 24, title: "Feed IG 5", category: "feed-ig", price: "Rp 25.000", emoji: "🌈",
    tags: ["colorful", "vibrant"], color: "#FFF5F0",
    image: "/feed/feed_ 5.webp", imageFull: "/feed/feed_ 5.webp", width: 400, height: 400,
  },
  {
    id: 25, title: "Feed IG 7", category: "feed-ig", price: "Rp 25.000", emoji: "🖼️",
    tags: ["layout", "grid"], color: "#F0F5FF",
    image: "/feed/feed_ 7.webp", imageFull: "/feed/feed_ 7.webp", width: 400, height: 400,
  },
  {
    id: 26, title: "Feed IG 8", category: "feed-ig", price: "Rp 25.000", emoji: "💫",
    tags: ["soft", "pastel"], color: "#FFF0FF",
    image: "/feed/feed_ 8.webp", imageFull: "/feed/feed_ 8.webp", width: 400, height: 400,
  },
  {
    id: 27, title: "Feed IG 9", category: "feed-ig", price: "Rp 25.000", emoji: "🎭",
    tags: ["bold", "dark"], color: "#F5F0FF",
    image: "/feed/feed_ 9.webp", imageFull: "/feed/feed_ 9.webp", width: 400, height: 400,
  },
  {
    id: 28, title: "Feed IG 11", category: "feed-ig", price: "Rp 25.000", emoji: "🌿",
    tags: ["nature", "earthy"], color: "#F0FFF5",
    image: "/feed/feed_ 11.webp", imageFull: "/feed/feed_ 11.webp", width: 400, height: 400,
  },
  {
    id: 29, title: "Feed IG 12", category: "feed-ig", price: "Rp 25.000", emoji: "🎪",
    tags: ["event", "promo"], color: "#FFF5E0",
    image: "/feed/feed_ 12.webp", imageFull: "/feed/feed_ 12.webp", width: 400, height: 400,
  },
  // ── POSTER ──
  {
    id: 40, title: "Poster 2", category: "poster", price: "Rp 25.000", emoji: "🎪",
    tags: ["event", "bold"], color: "#FFF5E0",
    image: "/poster/poster_ (2).webp", imageFull: "/poster/poster_ (2).webp", width: 400, height: 566,
  },
  {
    id: 41, title: "Poster 4", category: "poster", price: "Rp 25.000", emoji: "🎓",
    tags: ["formal", "academic"], color: "#E8F4FF",
    image: "/poster/poster_ (4).webp", imageFull: "/poster/poster_ (4).webp", width: 400, height: 566,
  },
  {
    id: 42, title: "Poster 6", category: "poster", price: "Rp 25.000", emoji: "🎵",
    tags: ["musik", "konser"], color: "#F5E8FF",
    image: "/poster/poster_ (6).webp", imageFull: "/poster/poster_ (6).webp", width: 400, height: 566,
  },
  {
    id: 43, title: "Poster 7", category: "poster", price: "Rp 25.000", emoji: "🏃",
    tags: ["olahraga", "sport"], color: "#E8FFF0",
    image: "/poster/poster_ (7).webp", imageFull: "/poster/poster_ (7).webp", width: 400, height: 566,
  },
  {
    id: 44, title: "Poster 8", category: "poster", price: "Rp 25.000", emoji: "💼",
    tags: ["bisnis", "seminar"], color: "#E8EEFF",
    image: "/poster/poster_ (8).webp", imageFull: "/poster/poster_ (8).webp", width: 400, height: 566,
  },
  {
    id: 45, title: "Poster 10", category: "poster", price: "Rp 25.000", emoji: "🎨",
    tags: ["art", "creative"], color: "#FFE8F5",
    image: "/poster/poster_ (10).webp", imageFull: "/poster/poster_ (10).webp", width: 400, height: 566,
  },

  // ── BANNER (sample dari 17 files) ──
  {
    id: 50, title: "Banner 1", category: "banner", price: "Rp 25.000", emoji: "🖼️",
    tags: ["web", "ads"], color: "#FFF0FA",
    image: "/banner/banner_1 (1).webp", imageFull: "/banner/banner_1 (1).webp", width: 800, height: 300,
  },
  {
    id: 51, title: "Banner 2", category: "banner", price: "Rp 25.000", emoji: "🏪",
    tags: ["bisnis", "promo"], color: "#F0FFF8",
    image: "/banner/banner_1 (2).webp", imageFull: "/banner/banner_1 (2).webp", width: 800, height: 300,
  },
  {
    id: 52, title: "Banner 3", category: "banner", price: "Rp 25.000", emoji: "🛍️",
    tags: ["toko", "jual"], color: "#FFF5E0",
    image: "/banner/banner_1 (3).webp", imageFull: "/banner/banner_1 (3).webp", width: 800, height: 300,
  },
  {
    id: 53, title: "Banner 4", category: "banner", price: "Rp 25.000", emoji: "📣",
    tags: ["iklan", "event"], color: "#F0F5FF",
    image: "/banner/banner_1 (4).webp", imageFull: "/banner/banner_1 (4).webp", width: 800, height: 300,
  },
  {
    id: 54, title: "Banner 5", category: "banner", price: "Rp 25.000", emoji: "🎉",
    tags: ["perayaan", "party"], color: "#FFF0F5",
    image: "/banner/banner_1 (5).webp", imageFull: "/banner/banner_1 (5).webp", width: 800, height: 300,
  },
  {
    id: 55, title: "Banner 6", category: "banner", price: "Rp 25.000", emoji: "🌟",
    tags: ["premium", "luxury"], color: "#FFFBF0",
    image: "/banner/banner_1 (6).webp", imageFull: "/banner/banner_1 (6).webp", width: 800, height: 300,
  },
  {
    id: 56, title: "Banner 7", category: "banner", price: "Rp 25.000", emoji: "💻",
    tags: ["tech", "digital"], color: "#F0F0FF",
    image: "/banner/banner_1 (7).webp", imageFull: "/banner/banner_1 (7).webp", width: 800, height: 300,
  },
  {
    id: 57, title: "Banner 8", category: "banner", price: "Rp 25.000", emoji: "🍜",
    tags: ["kuliner", "food"], color: "#FFF5F0",
    image: "/banner/banner_1 (8).webp", imageFull: "/banner/banner_1 (8).webp", width: 800, height: 300,
  },
  {
    id: 58, title: "Banner 9", category: "banner", price: "Rp 25.000", emoji: "📚",
    tags: ["edukasi", "belajar"], color: "#F0FFF5",
    image: "/banner/banner_1 (9).webp", imageFull: "/banner/banner_1 (9).webp", width: 800, height: 300,
  },
  {
    id: 59, title: "Banner 10", category: "banner", price: "Rp 25.000", emoji: "🏋️",
    tags: ["fitness", "gym"], color: "#F5F0FF",
    image: "/banner/banner_1 (10).webp", imageFull: "/banner/banner_1 (10).webp", width: 800, height: 300,
  },
  {
    id: 60, title: "Banner 11", category: "banner", price: "Rp 25.000", emoji: "✈️",
    tags: ["travel", "wisata"], color: "#F0F8FF",
    image: "/banner/banner_1 (11).webp", imageFull: "/banner/banner_1 (11).webp", width: 800, height: 300,
  },
];

export const COMMISSION_CHIBI: CommissionItem[] = [
  {
    id: 1, title: "Chibi Full Body", category: "chibi", price: "Rp 150.000", emoji: "🎀",
    tags: ["chibi", "full-body"], color: "#FFE4F0",
    image: "https://picsum.photos/seed/chibi1/400/600", imageFull: "https://picsum.photos/seed/chibi1/1200/1800", width: 400, height: 600,
  },
  {
    id: 2, title: "Chibi Half Body", category: "chibi", price: "Rp 100.000", emoji: "🌟",
    tags: ["chibi", "half-body"], color: "#FFF0E4",
    image: "https://picsum.photos/seed/chibi2/400/500", imageFull: "https://picsum.photos/seed/chibi2/1200/1500", width: 400, height: 500,
  },
  {
    id: 3, title: "Chibi Bust Shot", category: "chibi", price: "Rp 75.000", emoji: "💫",
    tags: ["chibi", "bust"], color: "#E4F0FF",
    image: "https://picsum.photos/seed/chibi3/400/400", imageFull: "https://picsum.photos/seed/chibi3/1200/1200", width: 400, height: 400,
  },
  {
    id: 4, title: "Couple Chibi", category: "chibi", price: "Rp 250.000", emoji: "💕",
    tags: ["couple", "2-char"], color: "#FFE4FA",
    image: "https://picsum.photos/seed/chibi4/600/400", imageFull: "https://picsum.photos/seed/chibi4/1800/1200", width: 600, height: 400,
  },
  {
    id: 5, title: "Live2D Rigging Basic", category: "live2d", price: "Rp 500.000", emoji: "🎭",
    tags: ["live2d", "basic"], color: "#E8E4FF",
    image: "https://picsum.photos/seed/l2d1/400/600", imageFull: "https://picsum.photos/seed/l2d1/1200/1800", width: 400, height: 600,
  },
  {
    id: 6, title: "Live2D Rigging Standard", category: "live2d", price: "Rp 850.000", emoji: "⚙️",
    tags: ["live2d", "expressions"], color: "#E4FFE8",
    image: "https://picsum.photos/seed/l2d2/400/600", imageFull: "https://picsum.photos/seed/l2d2/1200/1800", width: 400, height: 600,
  },
  {
    id: 7, title: "Live2D Full Package", category: "live2d", price: "Rp 1.500.000", emoji: "🚀",
    tags: ["live2d", "physics"], color: "#FFECE4",
    image: "https://picsum.photos/seed/l2d3/400/600", imageFull: "https://picsum.photos/seed/l2d3/1200/1800", width: 400, height: 600,
  },
  {
    id: 8, title: "VTuber Model Complete", category: "live2d", price: "Rp 2.000.000", emoji: "📡",
    tags: ["vtuber", "premium"], color: "#E4EEFF",
    image: "https://picsum.photos/seed/l2d4/400/600", imageFull: "https://picsum.photos/seed/l2d4/1200/1800", width: 400, height: 600,
  },
];

