"use server";

import { Enums, TablesInsert } from "@/lib/database.types";
import { postSchema } from "@/lib/posts/validations";
import { toSlug } from "@/lib/utils";
import { createErrorResponse } from "@/utils/actions/action-response";
import { createClient } from "@/utils/supabase/server";
import { nanoid } from "nanoid";
import { revalidateTag } from "next/cache";
import { notFound, redirect } from "next/navigation";

export async function getPost(slug: string) {
  const supabase = await createClient({ tags: ["post"] });
  const { data, error } = await supabase
    .rpc("get_post_by_slug", { post_slug: slug })
    .single();

  if (error) {
    console.log(error);
    notFound();
  }

  return data;
}

export async function getPosts() {
  const supabase = await createClient({ tags: ["posts"] });
  const { data, error } = await supabase.rpc("get_posts_with_votes");

  if (error) {
    console.log(error);
    return null;
  }

  return data;
}

export async function getDailyPosts() {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_posts_last_24_hours");

  if (error) {
    console.log(error);
    return null;
  }

  return data;
}

export async function createPost(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const { title, content } = postSchema.parse(values);

  // Generate slug from the title
  const slug = `${toSlug(title)}-${nanoid(6)}`;

  const supabase = await createClient();

  const newPost: TablesInsert<"posts"> = {
    title,
    content: JSON.parse(content),
    content_type: values["content_type"] as Enums<"content_type_enum">,
    slug,
  };

  const { data, error } = await supabase
    .from("posts")
    .insert(newPost)
    .select()
    .single();

  if (error) {
    console.log(error);
    return createErrorResponse(error.message);
  }

  if (data) {
    redirect(`/post/${data.slug}`);
  }

  redirect("/");
}

export async function handleVote(
  post_id: number,
  vote_type: Enums<"vote_type">
) {
  const supabase = await createClient();

  if (!post_id) {
    return createErrorResponse("Missing post id");
  }

  const { error } = await supabase.rpc("handle_vote", {
    post_id,
    vote_type,
  });

  if (error) {
    console.log(error);
    return createErrorResponse("Vote failed");
  }

  revalidateTag("posts");
}
