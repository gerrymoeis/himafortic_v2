import type { Metadata } from "next";
import { Tomorrow } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const tomorrow = Tomorrow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Himafortic UNESA - Himpunan Mahasiswa D4 Manajemen Informatika",
  description: "Official Website of Himpunan Mahasiswa D4 Manajemen Informatika UNESA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          tomorrow.className
        )}
      >
        {children}
      </body>
    </html>
  );
}
