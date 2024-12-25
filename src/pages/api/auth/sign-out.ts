import createClient from "@/utils/supabase/api";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const supabase = createClient(req, res);
    const { error } = await supabase.auth.signOut({
      scope: "local",
    });

    if (error) {
      res
        .status(error.status!)
        .json({ success: false, message: error.message });
    }

    res.redirect("/");
    // res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
}
