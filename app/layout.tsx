import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";

export const metadata: Metadata = {
  title: "খড়কুটো পল্লী | Curated Showpieces. Timeless Spaces.",
  description: "Premium showpiece and home decor shop based in Mirpur, Dhaka. Discover elegant figurines, wall art, vases, and more.",
};

export const viewport = {
  themeColor: "#F6F4EE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col selection:bg-terracotta selection:text-white">
        <Preloader />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
