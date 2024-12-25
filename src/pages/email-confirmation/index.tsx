import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Stack } from "@/components/ui/stack";
import { Typography } from "@/components/ui/typography";
import { Home, Mail } from "lucide-react";
import Head from "next/head";
import Link from "next/link";

export default function EmailConfirmation() {
  return (
    <>
      <Head>
        {/* Title for Search Engines */}
        <title>Email Confirmation - Ahali</title>

        {/* Meta Description for SEO */}
        <meta
          name="description"
          content="We’ve sent you an email to confirm your account. Please check your inbox to proceed."
        />

        {/* Canonical URL */}
        <link
          rel="canonical"
          href="https://ahali.vercel.app/email-confirmation"
        />

        {/* Open Graph for Social Sharing */}
        <meta property="og:title" content="Email Confirmation - Ahali" />
        <meta
          property="og:description"
          content="We’ve sent you an email to confirm your account. Please check your inbox to proceed."
        />
        <meta
          property="og:url"
          content="https://ahali.vercel.app/email-confirmation"
        />
        <meta
          property="og:image"
          content="https://ahali.vercel.app/static/email-confirmation-thumbnail.jpg"
        />
      </Head>
      <div className="mx-auto max-w-lg">
        <Card className="mx-4 my-5">
          <CardContent className="flex flex-col items-center gap-6 pt-6 text-center">
            <Stack justify="center" className="mb-2">
              <Mail size={50} />
            </Stack>

            <Typography variant="h2">Check Your Inbox</Typography>

            <Typography variant="h4" affects="muted">
              We have sent a confirmation email to your registered email
              address. Please open it and click the confirmation link to verify
              your account.
            </Typography>

            <Link href="/">
              <Button>
                <Home />
                Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
