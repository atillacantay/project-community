import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        <script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          async
        />
      </Head>
      <body className="bg-background-light dark:bg-background-dark">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
