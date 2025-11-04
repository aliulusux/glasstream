// app/layout.jsx  ✅ (server)
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata = {
  title: "AnimeStream",
  description: "Glassmorphism Anime website (Jikan + Supabase)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-[#0f0b1d] via-[#1a1230] to-[#130f1e] text-white antialiased">
          <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
