import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "glassStream • Discover your next favorite Anime",
  description: "Clean glass UI, smooth hover effects, and fresh data from Jikan API."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen text-white">
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
