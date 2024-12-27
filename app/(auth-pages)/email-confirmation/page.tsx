import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Stack } from "@/components/ui/stack";
import { Typography } from "@/components/ui/typography";
import { Home, Mail } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Email Confirmation - Ahali",
  description:
    "We’ve sent you an email to confirm your account. Please check your inbox to proceed.",
  alternates: { canonical: "/email-confirmation" },
  openGraph: {
    title: "Email Confirmation - Ahali",
    description:
      "We’ve sent you an email to confirm your account. Please check your inbox to proceed.",
    url: "/email-confirmation",
  },
};

export default function EmailConfirmation() {
  return (
    <div className="mx-auto max-w-lg">
      <Card className="mx-4 my-5">
        <CardContent className="flex flex-col items-center gap-6 pt-6 text-center">
          <Stack justify="center" className="mb-2">
            <Mail size={50} />
          </Stack>

          <Typography variant="h2">Check Your Inbox</Typography>

          <Typography variant="h4" affects="muted">
            We have sent a confirmation email to your registered email address.
            Please open it and click the confirmation link to verify your
            account.
          </Typography>

          <Button asChild>
            <Link href="/">
              <Home />
              Home
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
