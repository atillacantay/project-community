import createClient from "@/utils/supabase/api";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email, password } = req.body;
    const captchaToken = req.headers["x-captcha-token"] as string;

    if (!captchaToken) {
      res
        .status(422)
        .json({ success: false, message: "Captcha token is missing" });
    }

    const supabase = createClient(req, res);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: {
        captchaToken,
      },
    });
    if (error) {
      res
        .status(error.status!)
        .json({ success: false, message: error.message });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
}
