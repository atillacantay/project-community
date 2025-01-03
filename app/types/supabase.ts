import type { Enums, Tables } from "@/lib/database.types";

export type Post = Tables<"posts"> & {
  net_votes: number;
  user_vote_type: Enums<"vote_type"> | null;
};
