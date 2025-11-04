// components/ClientLayout.jsx
"use client";

import AuthProvider from "@/components/AuthProvider";
import Header from "@/components/Header";

export default function ClientLayout({ children }) {
  return (
    <AuthProvider>
      <Header />
      <main>{children}</main>
    </AuthProvider>
  );
}
