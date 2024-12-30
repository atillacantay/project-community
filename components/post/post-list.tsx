import { getPosts } from "@/actions/post";
import { PostCard } from "@/components/post/post-card";
import { Stack } from "@/components/ui/stack";

export async function PostList() {
  const posts = await getPosts();

  return (
    <Stack className="w-full space-y-6">
      {posts && posts.map((post) => <PostCard key={post.id} {...post} />)}
    </Stack>
  );
}
