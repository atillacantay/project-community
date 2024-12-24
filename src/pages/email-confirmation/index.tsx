import { Button } from "@/components/common/button";
import Paper from "@/components/common/paper";
import { Stack } from "@/components/common/stack";
import Typography from "@/components/common/typography";
import Head from "next/head";
import Link from "next/link";
import { HiMail } from "react-icons/hi";
import { MdHome } from "react-icons/md";

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
        <Paper className="mx-4 my-5">
          <Stack justify="center" className="mb-2">
            <HiMail fontSize={50} className="text-primary" />
          </Stack>

          <Typography as="h5" weight="bold" size="2xl" className="mb-4">
            Check Your Inbox
          </Typography>

          <Typography align="center" className="text-text-light/50">
            We have sent a confirmation email to your registered email
            address.Please open it and click the confirmation link to verify
            your account.
          </Typography>

          <Link href="/">
            <Button icon={<MdHome />}>Home</Button>
          </Link>
        </Paper>
      </div>
    </>
  );
}
