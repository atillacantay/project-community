import { getPosts } from "@/actions/post";
import PostCard from "@/components/post-card";
import { Stack } from "@/components/ui/stack";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ahali - Home",
  description:
    "Discover the latest discussions and topics in our minimal and interactive forum.",
  alternates: { canonical: "/" },

  openGraph: {
    title: "Ahali - Home",
    description:
      "Discover the latest discussions and topics in our minimal and interactive forum.",
    url: "/",
  },
};

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="w-full max-w-6xl px-6">
      <Stack className="w-full space-y-6">
        {posts && posts.map((post) => <PostCard key={post.id} {...post} />)}
      </Stack>
    </div>
  );
}
