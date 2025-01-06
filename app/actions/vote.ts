"use server";

import { Enums, TablesInsert } from "@/lib/database.types";
import { createErrorResponse } from "@/utils/actions/action-response";
import { createClient } from "@/utils/supabase/server";
import { revalidateTag } from "next/cache";

/**
 * Handles voting a post.
 */
async function handleVoteDatabase(vote: TablesInsert<"votes">): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.rpc("handle_vote", {
    post_id: vote.post_id,
    vote_type: vote.vote_type,
  });

  if (error) {
    console.error("Supabase error while voting the post:", error);
    throw new Error("Voting failed");
  }
}

export async function handleVote(
  post_id: number,
  vote_type: Enums<"vote_type">
) {
  try {
    if (!post_id) {
      throw new Error("Post ID is missing");
    }

    await handleVoteDatabase({ post_id, vote_type });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : String(error || "An unknown error occurred");
    console.error("Voting error:", errorMessage);
    return createErrorResponse(errorMessage);
  }

  revalidateTag("posts");
}
