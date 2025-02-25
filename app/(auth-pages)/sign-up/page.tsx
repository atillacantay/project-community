import { SignUpForm } from "@/components/sign-up-form";
import { Stack } from "@/components/ui/stack";
import { BringToFront } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up - Ahali",
  description:
    "Join Ahali today! Sign up to access exclusive features and stay connected.",
  alternates: { canonical: "/sign-up" },
  openGraph: {
    title: "Sign Up - Ahali",
    description:
      "Join Ahali today! Sign up to access exclusive features and stay connected.",
    url: "/sign-up",
  },
};

export default function SignUpPage() {
  return (
    <Stack className="gap-6 items-center md:w-2/3">
      <Stack className="w-full max-w-sm gap-6">
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
        <SignUpForm />
      </Stack>
    </Stack>
  );
}
