import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const fontSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

export const metadata: Metadata = {
  title: "Techyst | Asisten Teknisi HP Berbasis AI",
  description: "Diagnosa kerusakan hardware HP secara instan dengan AI Vision. Solusi inklusif untuk teknisi UMKM Indonesia.",
  keywords: ["teknisi hp", "ai diagnosis", "servis hp", "umkm", "kolosal ai", "hackathon"],
  authors: [{ name: "Techyst Team" }],
  creator: "Techyst",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://techyst.vercel.app",
    title: "Techyst | Asisten Teknisi HP Berbasis AI",
    description: "Diagnosa kerusakan hardware HP secara instan dengan AI Vision.",
    siteName: "Techyst",
    images: [
      {
        url: "/demo/dashboard.png",
        width: 1200,
        height: 630,
        alt: "Techyst Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Techyst | Asisten Teknisi HP Berbasis AI",
    description: "Diagnosa kerusakan hardware HP secara instan dengan AI Vision.",
    images: ["/demo/dashboard.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body className={`${fontSans.variable} ${fontMono.variable} antialiased font-sans bg-background text-foreground`}>
        {children}
        <Toaster position="top-center" theme="dark" richColors />
      </body>
    </html>
  );
}
