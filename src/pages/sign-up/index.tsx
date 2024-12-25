import { SignUpForm } from "@/components/sign-up-form";
import { Stack } from "@/components/ui/stack";
import { BringToFront } from "lucide-react";
import Head from "next/head";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <>
      <Head>
        {/* Title for Search Engines */}
        <title>Sign Up - Ahali</title>

        {/* Meta Description for SEO */}
        <meta
          name="description"
          content="Join Ahali today! Sign up to access exclusive features and stay connected."
        />

        {/* Canonical URL to avoid duplicate content */}
        <link rel="canonical" href="https://ahali.vercel.app/sign-up" />

        {/* Open Graph for Social Sharing */}
        <meta property="og:title" content="Sign Up - Ahali" />
        <meta
          property="og:description"
          content="Join Ahali today! Sign up to access exclusive features and stay connected."
        />
        <meta property="og:url" content="https://ahali.vercel.app/sign-up" />
        <meta
          property="og:image"
          content="https://ahali.vercel.app/static/signup-thumbnail.jpg"
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
          <SignUpForm />
        </Stack>
      </Stack>
    </>
  );
}
