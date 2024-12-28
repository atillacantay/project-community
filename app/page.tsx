import { PostList } from "@/components/post-list";
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
  return (
    <div className="w-full max-w-6xl px-6">
      <PostList />
    </div>
  );
}
