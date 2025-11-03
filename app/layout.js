import "./globals.css";
import Header from "@/components/Header";
import AuthProvider from "@/components/AuthProvider";

export const metadata = {
  title: "AnimeStream Glass v2",
  description: "Next.js + Supabase + Jikan + Framer Motion"
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <AuthProvider>
          <Header />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-24">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
