import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, email, password, gender } = await req.json();
    const headersList = await headers();
    const captchaToken = headersList.get("x-captcha-token");
    if (!captchaToken) {
      return NextResponse.json(
        { error: "Captcha token is missing" },
        { status: 422 }
      );
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
      return NextResponse.json(
        { success: false, message: error.message },
        { status: error.status }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
