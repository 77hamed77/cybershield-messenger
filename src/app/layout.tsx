import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "./globals.css";
import AppInitializer from "@/components/AppInitializer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const cairo = Cairo({ 
  subsets: ["arabic"],
  variable: "--font-cairo",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "CyberShield Messenger",
  description: "منصة الاتصالات الآمنة لفريق الأمن السيبراني الذكي",
  keywords: ["messenger", "cybersecurity", "secure", "communication", "arabic"],
  authors: [{ name: "CyberShield Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#988561",
  manifest: "/manifest.json",
  icons: {
    icon: "/logo.svg",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
        return (
          <html lang="ar" dir="rtl" className={`${inter.variable} ${cairo.variable} dark`}>
            <body className={`${inter.className} bg-background text-on-surface antialiased`} style={{
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-primary)'
            }}>
              <header>
                <style dangerouslySetInnerHTML={{
                  __html: `
                    :root {
                      --bg-primary: #161616;
                      --bg-secondary: #054239;
                      --text-primary: #ffffff;
                      --text-secondary: #edebe0;
                      --primary: #988561;
                      --accent: #428177;
                      --border: #428177;
                      --input: #054239;
                      --card: #054239;
                      --app-bar: rgba(42, 129, 119, 0.15);
                      --shadow: rgba(0, 0, 0, 0.8);
                      --overlay: rgba(0, 0, 0, 0.6);
                    }
                  `
                }} />
              </header>
              <AppInitializer />
              <script src="/theme-enforcer.js" defer />
              <div className="min-h-screen bg-background" style={{
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)'
              }}>
                {children}
              </div>
            </body>
          </html>
        );
}