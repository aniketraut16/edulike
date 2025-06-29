import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { ContentProvider } from "@/context/ContentContext";
import AuthGuard from "@/components/AuthGuard";

export const metadata: Metadata = {
  title: "KC Online Education - Learn Anything. From Anywhere.",
  description: "Live sessions or self-paced courses—choose how you want to grow with KC Online Education.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ContentProvider>
            <AuthGuard>
              <Navbar />
              {children}
              <Footer />
            </AuthGuard>
          </ContentProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
