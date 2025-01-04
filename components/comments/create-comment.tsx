"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "@supabase/supabase-js";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CreateCommentForm } from "./create-comment-form";

type CreateCommentProps = {
  postId: number;
  user: User | null;
};
export function CreateComment({ postId, user }: CreateCommentProps) {
  const [showEditor, setShowEditor] = useState(false);
  const router = useRouter();

  if (!user) {
    return (
      <Button
        onClick={() => router.push("/sign-in")}
        size="lg"
        className="rounded-full self-start"
      >
        <Plus />
        Add a comment
      </Button>
    );
  }

  return showEditor ? (
    <CreateCommentForm postId={postId} onCancel={() => setShowEditor(false)} />
  ) : (
    <Input
      placeholder="Add a comment"
      onClick={() => setShowEditor(true)}
      className="py-6 rounded-xl"
    />
  );
}
