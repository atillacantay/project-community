import { getPost } from "@/actions/post";
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

  return <div>{post?.title}</div>;
}
