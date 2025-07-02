import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { ContentProvider } from "@/context/ContentContext";
import AuthGuard from "@/components/AuthGuard";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>KC Online Education - Learn Anything. From Anywhere.</title>
        <meta name="description" content="Live sessions or self-paced courses—choose how you want to grow with KC Online Education." />
        <link rel="icon" href="/logo.png" />
      </head>
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
