"use server";

import { postSchema } from "@/lib/posts/validations";
import { toSlug } from "@/lib/utils";
import { createErrorResponse } from "@/utils/actions/action-response";
import { createClient } from "@/utils/supabase/server";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";

export async function getPost(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.log(error);
    return null;
  }

  return data;
}

export async function getPosts() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("posts").select("*");

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

  const newPost = {
    title,
    content,
    slug,
  };

  const { error } = await supabase.from("posts").insert(newPost);

  if (error) {
    console.log(error);
    return createErrorResponse(error.message);
  }

  redirect("/");
}
