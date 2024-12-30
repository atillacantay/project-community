import { CreatePostForm } from "@/components/post/create-post-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Post - Ahali",
  description:
    "Share your thoughts with the Ahali community. Create and publish posts to engage and connect with others.",
  alternates: {
    canonical: "/create-post",
  },
  openGraph: {
    title: "Create Post - Ahali",
    description:
      "Share your thoughts with the Ahali community. Create and publish posts to engage and connect with others.",
    url: "/create-post",
  },
};

export default function CreatePost() {
  return (
    <div className="w-full max-w-3xl py-8">
      <div>
        <CreatePostForm />
      </div>
    </div>
  );
}
