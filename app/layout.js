import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "AnimeStream – Glass",
  description: "Beautiful glassmorphism anime site (Jikan + Supabase)"
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-24">
          {children}
        </main>
      </body>
    </html>
  );
}
