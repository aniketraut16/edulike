import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "EduLike - Learn Anything. From Anywhere.",
  description: "Live sessions or self-paced courses—choose how you want to grow with EduLike.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body className="font-sans">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
