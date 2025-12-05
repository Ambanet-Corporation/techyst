import type { Metadata } from "next";
import { Onest } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Techyst | Asisten Teknisi Cerdas",
  description: "Platform diagnosa kerusakan HP berbasis AI untuk teknisi UMKM.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${onest.variable} antialiased font-sans`}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
