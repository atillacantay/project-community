"use client";

import { handleVote } from "@/actions/post";
import { Button } from "@/components/ui/button";
import { Stack } from "@/components/ui/stack";
import { Typography } from "@/components/ui/typography";
import { Enums } from "@/lib/database.types";
import { cn } from "@/lib/utils";
import type { Post } from "@/types/supabase";
import { ArrowDown, ArrowUp } from "lucide-react";
import { startTransition, useOptimistic } from "react";
import { toast } from "sonner";

type PostVoteProps = Post;

export function PostVote({ id, user_vote_type, net_votes }: PostVoteProps) {
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
    startTransition(() => {
      handleOptimisticVotes(voteType);
    });
    const response = await handleVote(id, voteType);
    if (response?.error) {
      toast.error("Vote Failed");
    }
  }

  return (
    <Stack align="center" direction="horizontal" className="gap-2">
      <Button
        title="upvote"
        variant="outline"
        size="icon"
        className={cn(
          optimisticVotes.user_vote_type === "upvote" &&
            "text-upvote border-upvote"
        )}
        onClick={() => handlePostVote("upvote")}
      >
        <ArrowUp />
      </Button>
      <Typography variant="h4" affects="small">
        {optimisticVotes.net_votes}
      </Typography>
      <Button
        title="downvote"
        variant="outline"
        size="icon"
        className={cn(
          optimisticVotes.user_vote_type === "downvote" &&
            "text-downvote border-downvote"
        )}
        onClick={() => handlePostVote("downvote")}
      >
        <ArrowDown />
      </Button>
    </Stack>
  );
}
