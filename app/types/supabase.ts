import { getPost } from "@/actions/post";
import type { Tables } from "@/lib/database.types";

// Types for getting the return type of an asynchronous function
type PromiseType<T> = T extends Promise<infer U> ? U : never;

export type ErrorType = { error: string };

/**
 * Represents the return type of an asynchronous function.
 * It extracts the resolved value from a Promise and excludes any potential error type.
 * Used primarily to get supabase action return types.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AsyncReturnType<T extends (...args: any) => Promise<any>> = Exclude<
  PromiseType<ReturnType<T>>,
  ErrorType
>;

export type Author = Pick<
  Tables<"profiles">,
  "id" | "username" | "email" | "created_at"
>;

export type Post = AsyncReturnType<typeof getPost>;

export type Comment = Tables<"comments"> & {
  user: Tables<"profiles">;
  post: Tables<"posts">;
};
