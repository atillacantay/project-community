import { SignInForm } from "@/components/sign-in-form";
import { Stack } from "@/components/ui/stack";
import { BringToFront } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign In - Ahali",
  description:
    "Access your Ahali account. Sign in to stay connected and manage your settings.",
  alternates: { canonical: "/sign-in" },
  openGraph: {
    title: "Sign In - Ahali",
    description:
      "Access your Ahali account. Sign in to stay connected and manage your settings.",
    url: "/sign-in",
  },
};

export default function SignInPage() {
  return (
    <Stack className="gap-6 items-center md:w-2/3">
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
