import { CreatePostForm } from "@/components/create-post-form";
import { Stack } from "@/components/ui/stack";
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
    <Stack align="center" className="min-h-svh p-6 md:p-10">
      <div className="w-full max-w-xl">
        <CreatePostForm />
      </div>
    </Stack>
  );
}
