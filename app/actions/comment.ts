"use server";

import { commentSchema } from "@/lib/comments/validations";
import { TablesInsert } from "@/lib/database.types";
import { createErrorResponse } from "@/utils/actions/action-response";
import { createClient } from "@/utils/supabase/server";
import { revalidateTag } from "next/cache";

export async function getComments(postId: number) {
  const supabase = await createClient({ tags: ["comments"] });
  const { data, error } = await supabase
    .from("comments")
    .select("*, post:post_id(*), user:user_id(*)")
    .order("created_at", { ascending: false })
    .eq("post_id", postId);

  if (error) {
    console.log(error);
  }

  return data;
}

export async function createComment(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const { content } = commentSchema.parse(values);

  const supabase = await createClient();

  const newComment: TablesInsert<"comments"> = {
    post_id: Number(values.postId),
    content: JSON.parse(content),
  };

  const { data, error } = await supabase
    .from("comments")
    .insert(newComment)
    .select()
    .single();

  if (error) {
    console.log(error);
    return createErrorResponse("An error occured while creating the comment.");
  }

  if (data) {
    revalidateTag(`comments`);
  }
}
