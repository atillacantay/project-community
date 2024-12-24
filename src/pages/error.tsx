import { Button } from "@/components/common/button";
import Paper from "@/components/common/paper";
import { Stack } from "@/components/common/stack";
import Typography from "@/components/common/typography";
import Link from "next/link";
import { MdErrorOutline, MdHome } from "react-icons/md";

export default function ErrorPage() {
  return (
    <Stack
      direction="vertical"
      justify="center"
      align="center"
      className="min-h-screen text-center"
    >
      <Paper className="mx-4">
        <MdErrorOutline className="text-error" style={{ fontSize: 64 }} />
        <Typography as="h1" size="2xl" weight="bold">
          Oops! Something Went Wrong
        </Typography>

        <Typography>
          We are sorry for the inconvenience. Please try refreshing the page or
          go back to the previous page.
        </Typography>

        <Link href="/">
          <Button icon={<MdHome />}>Home</Button>
        </Link>
      </Paper>
    </Stack>
  );
}
