import { ThemeProvider } from "@/components/context/theme";
import Header from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ahali.vercel.app"),
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        />
      </head>
      <body className="bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-svh flex flex-col">
            <Header />
            <main>
              <div className="flex mx-auto max-w-screen-xl py-10">
                <Sidebar />
                <div className="w-full max-w-6xl px-6">{children}</div>
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
