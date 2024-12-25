import { ModeToggle } from "@/components/toggle-mode";
import { Stack } from "@/components/ui/stack";
import { Typography } from "@/components/ui/typography";
import { UserMenu } from "@/components/user-menu";
import { createClient } from "@/utils/supabase/server-props";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createClient(context);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: data.user,
    },
  };
}

export default function Header() {
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

          <Stack direction="horizontal" spacing={4}>
            <ModeToggle />
            <UserMenu />
          </Stack>
        </Stack>
      </div>
    </header>
  );
}
