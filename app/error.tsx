"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Stack } from "@/components/ui/stack";
import { Typography } from "@/components/ui/typography";
import { CircleAlert, Home } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Stack
      direction="vertical"
      justify="center"
      align="center"
      className="min-h-screen text-center"
    >
      <Card className="mx-4 my-5">
        <CardContent className="flex flex-col items-center gap-6 pt-6 text-center">
          <CircleAlert className="text-destructive" size={64} />
          <Typography variant="h2">Oops! Something Went Wrong</Typography>

          <Typography variant="h4" affects="muted">
            We are sorry for the inconvenience. Please try refreshing the page
            or go back to the previous page.
          </Typography>

          <Button asChild>
            <Link href="/">
              <Home />
              Go Home
            </Link>
          </Button>
        </CardContent>
      </Card>
    </Stack>
  );
}
