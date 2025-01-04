import { getComments } from "@/actions/comment";
import type { Enums, Tables } from "@/lib/database.types";

// Types for getting the return type of an asynchronous function
type PromiseType<T> = T extends Promise<infer U> ? U : never;

export type ErrorType = { error: string };

/**
 * Represents the return type of an asynchronous function.
 * It extracts the resolved value from a Promise and excludes any potential error type.
 * Used primarily to get supabase action return types.
 */
export type AsyncReturnType<T extends (...args: any) => Promise<any>> = Exclude<
  PromiseType<ReturnType<T>>,
  ErrorType
>;

export type Post = Tables<"posts"> & {
  net_votes: number;
  user_vote_type: Enums<"vote_type"> | null;
};

export type Comments = AsyncReturnType<typeof getComments>;

export type Comment = Comments[0];
