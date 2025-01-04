"use client";

import { handleVote } from "@/actions/post";
import { Button } from "@/components/ui/button";
import { Stack } from "@/components/ui/stack";
import { Typography } from "@/components/ui/typography";
import { Enums } from "@/lib/database.types";
import { cn } from "@/lib/utils";
import type { Post } from "@/types/supabase";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { redirect, RedirectType } from "next/navigation";
import { startTransition, useOptimistic } from "react";
import { toast } from "sonner";

type PostVoteProps = Post & {
  isAuthenticated: boolean;
};

export function PostVote({
  isAuthenticated,
  id,
  user_vote_type,
  net_votes,
}: PostVoteProps) {
  const [optimisticVotes, handleOptimisticVotes] = useOptimistic(
    {
      user_vote_type,
      net_votes,
    },
    (state, voteType: Enums<"vote_type">) => {
      const { user_vote_type, net_votes } = state;
      if (user_vote_type === voteType) {
        return {
          user_vote_type: null,
          net_votes: net_votes - (voteType === "upvote" ? 1 : -1),
        };
      } else {
        return {
          user_vote_type: voteType,
          net_votes:
            net_votes +
            (voteType === "upvote"
              ? user_vote_type === "downvote"
                ? 2
                : 1
              : user_vote_type === "upvote"
              ? -2
              : -1),
        };
      }
    }
  );

  async function handlePostVote(voteType: Enums<"vote_type">) {
    if (!isAuthenticated) {
      redirect("/sign-in", RedirectType.push);
    }

    startTransition(() => {
      handleOptimisticVotes(voteType);
    });
    const response = await handleVote(id, voteType);
    if (response?.error) {
      toast.error("Vote Failed");
    }
  }

  const isUpvote = optimisticVotes.user_vote_type === "upvote";
  const isDownvote = optimisticVotes.user_vote_type === "downvote";

  return (
    <Stack
      align="center"
      direction="horizontal"
      className={cn(
        "gap-2 border border-border rounded-full",
        optimisticVotes.user_vote_type &&
          `border-${optimisticVotes.user_vote_type}`
      )}
    >
      <Button
        title="Upvote"
        variant="ghost"
        size="icon"
        className={cn("rounded-full", isUpvote && "text-upvote border-upvote")}
        onClick={() => handlePostVote("upvote")}
      >
        <ArrowBigUp fill="currentColor" />
      </Button>
      <Typography variant="span" affects="small">
        {optimisticVotes.net_votes}
      </Typography>
      <Button
        title="Downvote"
        variant="ghost"
        size="icon"
        className={cn(
          "rounded-full",
          isDownvote && "text-downvote border-downvote"
        )}
        onClick={() => handlePostVote("downvote")}
      >
        <ArrowBigDown fill="currentColor" />
      </Button>
    </Stack>
  );
}
