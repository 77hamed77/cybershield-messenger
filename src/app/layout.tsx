import type { Metadata } from "next";
import { Inter, Cairo, Noto_Sans_Arabic, Roboto } from "next/font/google";
import "./globals.css";
import AppInitializer from "@/components/AppInitializer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";

// خطوط رسمية حكومية
const roboto = Roboto({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '700'],
  variable: "--font-roboto",
  display: 'swap',
});

const notoSansArabic = Noto_Sans_Arabic({ 
  subsets: ["arabic"],
  weight: ['300', '400', '500', '700'],
  variable: "--font-noto-arabic",
  display: 'swap',
});

// خطوط احتياطية
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
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
        return (
          <html lang="ar" dir="rtl" className={`${roboto.variable} ${notoSansArabic.variable} ${inter.variable} ${cairo.variable} dark`}>
            <head>
              <style dangerouslySetInnerHTML={{
                __html: `
                  :root {
                    --bg-primary: #161616;
                    --bg-secondary: #1a1a1a;
                    --text-primary: #ffffff;
                    --text-secondary: #edebe0;
                    --primary: #988561;
                    --accent: #428177;
                    --border: #2a2a2a;
                    --input: #1a1a1a;
                    --card: #1a1a1a;
                    --app-bar: rgba(26, 26, 26, 0.8);
                    --shadow: rgba(0, 0, 0, 0.8);
                    --overlay: rgba(0, 0, 0, 0.6);
                  }
                  .dark {
                    --bg-primary: #161616;
                    --bg-secondary: #1a1a1a;
                    --text-primary: #ffffff;
                    --text-secondary: #edebe0;
                    --primary: #988561;
                    --accent: #428177;
                    --border: #2a2a2a;
                    --input: #1a1a1a;
                    --card: #1a1a1a;
                    --app-bar: rgba(26, 26, 26, 0.8);
                    --shadow: rgba(0, 0, 0, 0.8);
                    --overlay: rgba(0, 0, 0, 0.6);
                  }
                `
              }} />
              <script src="/theme-enforcer.js" defer />
            </head>
            <body 
              className={`${roboto.className} bg-background text-on-surface antialiased`}
              suppressHydrationWarning={true}
            >
              <LanguageProvider>
                <ThemeProvider>
                  <AppInitializer />
                  <div className="min-h-screen bg-background">
                    {children}
                  </div>
                </ThemeProvider>
              </LanguageProvider>
            </body>
          </html>
        );
}