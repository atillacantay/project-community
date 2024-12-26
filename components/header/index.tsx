import { ModeToggle } from "@/components/toggle-mode";
import { Button } from "@/components/ui/button";
import { Stack } from "@/components/ui/stack";
import { Typography } from "@/components/ui/typography";
import { UserMenu } from "@/components/user-menu";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";

interface HeaderProps {
  authUser: User | null;
}

export default async function Header({ authUser }: HeaderProps) {
  return (
    <header className="border-b border-border shadow-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <Stack
          direction="horizontal"
          justify="between"
          align="center"
          className="py-4"
        >
          <Stack align="center">
            <Link href="/">
              <Typography variant="h3">Community</Typography>
            </Link>
          </Stack>

          <Stack direction="horizontal">
            <ModeToggle />

            {authUser ? (
              <UserMenu authUser={authUser} />
            ) : (
              <Stack direction="horizontal">
                <Link href="/sign-in">
                  <Button>Sign In</Button>
                </Link>
              </Stack>
            )}
          </Stack>
        </Stack>
      </div>
    </header>
  );
}
