import { getAuthUser } from "@/actions/user";
import { ThemeProvider } from "@/components/context/theme";
import Header from "@/components/header";
import Script from "next/script";
import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authUser = await getAuthUser();

  return (
    <html lang="en" suppressHydrationWarning>
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
            <Header authUser={authUser} />
            <main className="flex flex-col flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
