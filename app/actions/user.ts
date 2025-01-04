"use server";

import { signInSchema, signUpSchema } from "@/lib/users/validations";
import { createErrorResponse } from "@/utils/actions/action-response";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

/*
export const getProfile = async () => {
  const supabase = await createClient();
  try {
    const { data: authData } = await supabase.auth.getUser();
    if (!authData.user) return;

    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    if (!profileData) {
      return;
    }

    return profileData;
  } catch {
    return null;
  }
};
*/

export const getAuthUser = async () => {
  const supabase = await createClient({ tags: ["user"] });
  try {
    const { data } = await supabase.auth.getUser();
    const { user } = data;

    return user;
  } catch {
    return null;
  }
};

export const signOut = async () => {
  const supabase = await createClient();
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
      return new Error(error.message);
    }
  } catch (error) {
    return error;
  }

  redirect("/");
};

export async function signIn(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const { email, password } = signInSchema.parse(values);
  const captchaToken = values["captchaToken"] as string;

  if (!captchaToken) {
    return createErrorResponse("Captcha token is missing");
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
    options: {
      captchaToken,
    },
  });

  if (error) {
    console.log(error);
    return createErrorResponse(error.message);
  }

  redirect("/");
}

export async function signUp(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const { email, password, username, gender } = signUpSchema.parse(values);
  const captchaToken = values["captchaToken"] as string;

  if (!captchaToken) {
    return createErrorResponse("Captcha token is missing");
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      captchaToken,
      data: { username, gender },
    },
  });

  if (error) {
    console.log(error);
    return createErrorResponse(error.message);
  }

  redirect("/email-confirmation");
}
