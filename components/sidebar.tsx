import { getPosts } from "@/actions/post";
import { Button } from "@/components/ui/button";
import { Stack } from "@/components/ui/stack";
import { Typography } from "@/components/ui/typography";
import Link from "next/link";

export async function Sidebar() {
  const posts = await getPosts();

  return (
    <div className="sticky h-full rounded-md flex w-96">
      <Stack className="p-4 space-y-4">
        <Typography variant="h4" className="pl-3">
          Topics
        </Typography>
        <div>
          {posts &&
            posts.map((post) => (
              <Button key={post.id} asChild variant="ghost">
                <Link href={`/post/${post.slug}`}>{post.title}</Link>
              </Button>
            ))}
        </div>
      </Stack>
    </div>
  );
}
