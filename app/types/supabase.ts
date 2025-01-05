import type { Enums, Tables } from "@/lib/database.types";

export type Post = Tables<"posts"> & {
  comments_count: number;
  net_votes: number;
  user_vote_type: Enums<"vote_type"> | null;
};

export type Comment = Tables<"comments"> & {
  user: Tables<"profiles">;
  post: Tables<"posts">;
};
