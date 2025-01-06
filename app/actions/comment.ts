"use server";

import { commentSchema } from "@/lib/comments/validations";
import { TablesInsert } from "@/lib/database.types";
import { createErrorResponse } from "@/utils/actions/action-response";
import { validateCaptcha } from "@/utils/recaptcha";
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
    console.error(error);
  }

  return data;
}

/**
 * Creates a new comment in the database.
 */
async function insertCommentToDatabase(
  comment: TablesInsert<"comments">
): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("comments")
    .insert(comment)
    .select()
    .single();

  if (error) {
    console.error("Supabase error while inserting comment:", error);
    throw new Error("An error occurred while creating the comment");
  }
}

export async function createComment(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const { content } = commentSchema.parse(values);
  const captchaToken = values["captchaToken"] as string;

  try {
    await validateCaptcha(captchaToken);

    const newComment: TablesInsert<"comments"> = {
      post_id: Number(values.postId),
      content: JSON.parse(content),
    };

    await insertCommentToDatabase(newComment);
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : String(error || "An unknown error occurred");
    console.error("Comment creation error:", errorMessage);
    return createErrorResponse(errorMessage);
  }

  revalidateTag(`comments`);
}
