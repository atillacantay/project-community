import createClient from "@/utils/supabase/api";
import type { NextApiRequest, NextApiResponse } from "next";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    nickname: string;
    email: string;
    password: string;
    gender: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  try {
    const { nickname, email, password, gender } = req.body;
    const captchaToken = req.headers["x-captcha-token"] as string;

    if (!captchaToken) {
      res
        .status(422)
        .json({ success: false, message: "Captcha token is missing" });
    }

    const supabase = createClient(req, res);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        captchaToken,
        data: { nickname, gender },
      },
    });
    if (error) {
      res
        .status(error.status!)
        .json({ success: false, message: error.message });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    if (error.type === "CredentialsSignin") {
      res.status(401).json({ error: "Invalid credentials." });
    } else {
      res.status(500).json({ error: "Something went wrong." });
    }
  }
}
