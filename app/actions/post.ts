"use server";

import { Enums, TablesInsert } from "@/lib/database.types";
import { postSchema } from "@/lib/posts/validations";
import { toSlug } from "@/lib/utils";
import { createErrorResponse } from "@/utils/actions/action-response";
import { validateCaptcha } from "@/utils/recaptcha";
import { createClient } from "@/utils/supabase/server";
import { nanoid } from "nanoid";
import { notFound, redirect } from "next/navigation";

export async function getPost(slug: string) {
  const supabase = await createClient({ tags: ["post"] });
  const { data, error } = await supabase
    .rpc("get_post_details_by_slug", { post_slug: slug })
    .single();

  if (error) {
    console.log(error);
    notFound();
  }

  return data;
}

export async function getPosts() {
  const supabase = await createClient({ tags: ["posts"] });
  const { data, error } = await supabase
    .rpc("get_posts_with_details")
    .order("created_at", { ascending: false });

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
  const captchaToken = values["captchaToken"] as string;

  // Generate slug from the title
  const slug = `${toSlug(title)}-${nanoid(6)}`;

  try {
    await validateCaptcha(captchaToken);

    const newPost: TablesInsert<"posts"> = {
      title,
      content: JSON.parse(content),
      content_type: values["content_type"] as Enums<"content_type_enum">,
      slug,
    };

    const supabase = await createClient();
    const { error } = await supabase
      .from("posts")
      .insert(newPost)
      .select()
      .single();

    if (error) {
      console.error("Supabase error while creating post:", error);
      throw new Error("An error occurred while creating the post");
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : String(error || "An unknown error occurred");
    console.error("Post creation error:", errorMessage);
    return createErrorResponse(errorMessage);
  }

  redirect(`/post/${slug}`);
}
