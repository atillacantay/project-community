"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const getAuthUser = async () => {
  const supabase = await createClient();
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
    const { error } = await supabase.auth.signOut({
      scope: "local",
    });

    if (error) {
      console.error(error);
      return new Error(error.message);
    }
  } catch (error) {
    return error;
  }

  redirect("/");
};
