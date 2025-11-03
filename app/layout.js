import "./globals.css";
import Header from "@/components/Header";
import AuthProvider from "@/components/AuthProvider";
import ThemeProvider from "@/components/ThemeProvider";
export const metadata = { title: "AnimeStream Glass v5", description: "Next.js + Supabase + Jikan + Framer Motion" };
export default function RootLayout({ children }){
  return (<html lang="tr" suppressHydrationWarning><body><ThemeProvider><AuthProvider><Header /><main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-24">{children}</main></AuthProvider></ThemeProvider></body></html>);
}
