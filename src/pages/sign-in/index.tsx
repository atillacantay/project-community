import { SignInForm } from "@/components/sign-in-form";
import { Stack } from "@/components/ui/stack";
import { BringToFront } from "lucide-react";
import Head from "next/head";
import Link from "next/link";

export default function SignInPage() {
  return (
    <>
      <Head>
        {/* Title for Search Engines */}
        <title>Sign In - Ahali</title>

        {/* Meta Description for SEO */}
        <meta
          name="description"
          content="Access your Ahali account. Sign in to stay connected and manage your settings."
        />

        {/* Canonical URL to avoid duplicate content */}
        <link rel="canonical" href="https://ahali.vercel.app/sign-in" />

        {/* Open Graph for Social Sharing */}
        <meta property="og:title" content="Sign In - Ahali" />
        <meta
          property="og:description"
          content="Access your Ahali account. Sign in to stay connected and manage your settings."
        />
        <meta property="og:url" content="https://ahali.vercel.app/sign-in" />
        <meta
          property="og:image"
          content="https://ahali.vercel.app/static/signin-thumbnail.jpg"
        />
      </Head>
      <Stack
        justify="center"
        align="center"
        spacing={6}
        className="min-h-svh bg-muted p-6 md:p-10"
      >
        <Stack spacing={6} className="w-full max-w-sm">
          <Link
            href="/"
            className="flex items-center gap-2 self-center font-medium"
          >
            <Stack
              justify="center"
              align="center"
              className="size-6 rounded-md bg-primary text-primary-foreground"
            >
              <BringToFront className="size-4" />
            </Stack>
            Community
          </Link>
          <SignInForm />
        </Stack>
      </Stack>
    </>
  );
}
