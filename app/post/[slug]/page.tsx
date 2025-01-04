import { getComments } from "@/actions/comment";
import { getPost } from "@/actions/post";
import { getAuthUser } from "@/actions/user";
import { CommentList } from "@/components/comments/comment-list";
import { CreateComment } from "@/components/comments/create-comment";
import { PostCard } from "@/components/post/post-card";
import { Stack } from "@/components/ui/stack";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;

  if (!slug) {
    redirect("/");
  }

  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found - Ahali",
      description: "The post you're looking for does not exist.",
    };
  }

  return {
    title: `${post.title} - Ahali`,
    description: post.title || "Read this post on Ahali.",
    alternates: {
      canonical: `/post/${slug}`,
    },
    openGraph: {
      title: post.title || "",
      description: post.title || "Read this post on Ahali.",
      url: `/post/${slug}`,
    },
  };
}

export default async function Post({ params }: Props) {
  const slug = (await params).slug;

  if (!slug) {
    redirect("/");
  }

  const post = await getPost(slug);
  const comments = await getComments(post.id);
  const user = await getAuthUser();

  return (
    <Stack className="gap-8">
      <div>{post && <PostCard {...post} noRedirect />}</div>
      <Stack className="gap-8">
        <CreateComment postId={post.id} user={user} />
        <CommentList comments={comments} />
      </Stack>
    </Stack>
  );
}
