import { SignUpForm } from "@/components/sign-up-form";
import { Stack } from "@/components/ui/stack";
import { BringToFront } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up - Ahali",
  description:
    "Join Ahali today! Sign up to access exclusive features and stay connected.",
  alternates: { canonical: "https://ahali.vercel.app/sign-up" },
  openGraph: {
    title: "Sign Up - Ahali",
    description:
      "Join Ahali today! Sign up to access exclusive features and stay connected.",
    url: "https://ahali.vercel.app/sign-up",
  },
};

export default function SignUpPage() {
  return (
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
  );
}
