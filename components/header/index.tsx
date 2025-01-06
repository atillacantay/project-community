import { getProfile } from "@/actions/user";
import { ModeToggle } from "@/components/toggle-mode";
import { Button } from "@/components/ui/button";
import { Stack } from "@/components/ui/stack";
import { Typography } from "@/components/ui/typography";
import { UserMenu } from "@/components/user-menu";
import { Plus, Speech } from "lucide-react";
import Link from "next/link";

export default async function Header() {
  const profile = await getProfile();

  return (
    <header className="border-b border-border shadow-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <Stack
          direction="horizontal"
          justify="between"
          align="center"
          className="py-4"
        >
          <Link href="/" className="flex items-center gap-2">
            <Speech size={32} />
            <Typography variant="h3">Ahali</Typography>
          </Link>

          <Stack direction="horizontal" className="gap-4">
            {profile && (
              <Button asChild className="rounded-full">
                <Link href="/create">
                  <Plus />
                  Create
                </Link>
              </Button>
            )}
            <ModeToggle />

            {profile ? (
              <UserMenu profile={profile} />
            ) : (
              <>
                <Button asChild variant="outline">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </>
            )}
          </Stack>
        </Stack>
      </div>
    </header>
  );
}
