import { getDailyPosts } from "@/actions/post";
import { Button } from "@/components/ui/button";
import { Stack } from "@/components/ui/stack";
import { Typography } from "@/components/ui/typography";
import Link from "next/link";

export async function Sidebar() {
  const posts = await getDailyPosts();

  return (
    <div className="sticky h-full hidden md:flex w-96">
      <Stack className="w-full p-4 space-y-4">
        <Typography variant="h4" className="ml-3">
          Daily Topics
        </Typography>
        <Stack className="space-y-2">
          {posts?.length && posts.length > 0 ? (
            posts.map((post) => (
              <Button
                key={post.id}
                asChild
                variant="ghost"
                className="justify-start"
              >
                <Link href={`/post/${post.slug}`}>{post.title}</Link>
              </Button>
            ))
          ) : (
            <Typography variant="h4" affects="muted" className="ml-3">
              Empty
            </Typography>
          )}
        </Stack>
      </Stack>
    </div>
  );
}
