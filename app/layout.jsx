"use client";

// /app/layout.jsx
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import Header from "@/components/Header";

export const metadata = {
  title: "AnimeStream",
  description: "Glassmorphism Anime website (Jikan + Supabase)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-[#0f0b1d] via-[#1a1230] to-[#130f1e] text-white antialiased">
        <AuthProvider>
          <Header />
          <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
