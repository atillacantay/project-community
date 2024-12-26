import { SignInForm } from "@/components/sign-in-form";
import { Stack } from "@/components/ui/stack";
import { BringToFront } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign In - Ahali",
  description:
    "Access your Ahali account. Sign in to stay connected and manage your settings.",
  alternates: { canonical: "https://ahali.vercel.app/sign-in" },
  openGraph: {
    title: "Sign In - Ahali",
    description:
      "Access your Ahali account. Sign in to stay connected and manage your settings.",
    url: "https://ahali.vercel.app/sign-in",
  },
};

export default function SignInPage() {
  return (
    <Stack
      justify="center"
      align="center"
      className="min-h-svh gap-6 bg-muted p-6 md:p-10"
    >
      <Stack className="w-full gap-6 max-w-sm">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <Stack
            justify="center"
            align="center"
            className="size-6 gap-4 rounded-md bg-primary text-primary-foreground"
          >
            <BringToFront className="size-4" />
          </Stack>
          Community
        </Link>
        <SignInForm />
      </Stack>
    </Stack>
  );
}
