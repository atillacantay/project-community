"use server";

import { signInSchema, signUpSchema } from "@/lib/users/validations";
import { createErrorResponse } from "@/utils/actions/action-response";
import { validateCaptcha } from "@/utils/recaptcha";
import { createClient } from "@/utils/supabase/server";
import type { Provider, User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export const getProfile = async () => {
  const supabase = await createClient();

  try {
    const user = await getAuthUser();
    if (!user) {
      return null;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Error fetching profile:", error.message);
      throw new Error("Profile not found.");
    }

    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Profile fetch error:", errorMessage);
    return null;
  }
};
export const getAuthUser = async () => {
  const supabase = await createClient({ tags: ["user"] });

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    return user;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(
      "Unexpected error fetching authenticated user:",
      errorMessage
    );
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

export async function signInWith(provider: Provider) {
  const supabase = await createClient();
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://ahali.vercel.app";
  const callbackUrl = `${baseUrl}/api/auth/callback`;
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: callbackUrl,
    },
  });

  if (error) {
    console.error("OAuth sign-in error:", error);
  }

  if (data.url) {
    redirect(data.url);
  }
}
