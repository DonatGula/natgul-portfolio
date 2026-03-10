import type { Metadata } from "next";
import "./globals.css";
import Cursor from "@/components/Cursor";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Natgul — Portfolio",
  description: "Developer & Designer. Project Github, Commission Desain, Commission Chibi Live2D.",
  openGraph: { title: "Natgul — Portfolio", description: "Developer & Designer." },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" data-theme="dark-pink">
      <body>
        <ThemeProvider>
          <Cursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
