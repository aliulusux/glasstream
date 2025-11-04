// components/ClientLayout.jsx
"use client";

import AuthProvider from "@/components/AuthProvider";
import Header from "@/components/Header";

export default function ClientLayout({ children }) {
  return (
    <AuthProvider>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </AuthProvider>
  );
}
