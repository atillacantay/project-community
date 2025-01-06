"use server";

import { signInSchema, signUpSchema } from "@/lib/users/validations";
import { createErrorResponse } from "@/utils/actions/action-response";
import { validateCaptcha } from "@/utils/recaptcha";
import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";
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

  try {
    await validateCaptcha(captchaToken);

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Sign-in error:", error.message);
      return createErrorResponse(error.message);
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : String(error || "An unknown error occurred");
    console.error("Sign-in error:", errorMessage);
    return createErrorResponse(errorMessage);
  }

  redirect("/");
}

/**
 * Handles user existence check after sign-up.
 */
function checkUserExistence(user: User | null): void {
  if (user?.identities?.length === 0) {
    console.error(`Signup attempt for existing user: ${user.email}`);
    throw new Error("User already exists");
  }
}

export async function signUp(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const { email, password, username, gender } = signUpSchema.parse(values);
  const captchaToken = values["captchaToken"] as string;

  try {
    await validateCaptcha(captchaToken);

    const supabase = await createClient();
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, gender },
      },
    });

    if (error) {
      console.error("Sign-up error:", error);
      return createErrorResponse(error.message);
    }

    checkUserExistence(data.user);
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : String(error || "An unknown error occurred");
    console.error("Sign-up error:", errorMessage);
    return createErrorResponse(errorMessage);
  }

  redirect("/email-confirmation");
}
