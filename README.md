# Natgul Portfolio

Portfolio website untuk Natgul — Developer & Designer.

Built with **Next.js 14**, **Tailwind CSS**, dan **GitHub API**.

## Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- GitHub REST API (real-time repos)

## Halaman
- `/` — Home (Hero, GitHub Repos, Hiburan, Hasil Karya)
- `/commission-desain` — Commission Desain
- `/commission-chibi` — Commission Chibi & Live2D

---

## 🚀 Deploy ke Vercel (step by step)

### 1. Upload ke GitHub
```bash
# Di folder ini, jalankan:
git init
git add .
git commit -m "feat: initial portfolio"
git branch -M main
git remote add origin https://github.com/DonatGula/portfolio.git
git push -u origin main
```

### 2. Deploy ke Vercel
1. Buka [vercel.com](https://vercel.com) → Login dengan GitHub
2. Klik **"Add New Project"**
3. Pilih repo `portfolio` yang baru diupload
4. Klik **Deploy** — selesai! ✅

### 3. (Opsional) GitHub Token
Untuk menghindari rate limit GitHub API:
1. Buka https://github.com/settings/tokens
2. Generate token baru (centang **public_repo** saja)
3. Di Vercel → Settings → Environment Variables
4. Tambahkan: `GITHUB_TOKEN` = token kamu

---

## Local Development
```bash
npm install
npm run dev
# Buka http://localhost:3000
```
