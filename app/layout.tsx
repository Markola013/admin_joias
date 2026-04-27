// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JoiasAdmin - Gestão de Joias e Clientes",
  description: "Painel administrativo para controle de estoque e vendas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="h-full bg-admin-bg flex overflow-hidden">
        {/* MENU LATERAL FIXO */}
        <Sidebar />

        {/* ÁREA DE CONTEÚDO À DIREITA */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            {/* O "children" é onde as páginas (produtos, clientes, etc) vão aparecer */}
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}