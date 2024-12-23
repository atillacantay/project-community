export async function executeRecaptcha(action: string): Promise<string> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    throw new Error(
      "reCAPTCHA site key is not defined in the environment variables."
    );
  }

  try {
    await new Promise<void>((resolve, reject) => {
      if (typeof grecaptcha === "undefined") {
        reject(new Error("reCAPTCHA library is not loaded."));
        return;
      }
      grecaptcha.ready(resolve);
    });

    const token = await grecaptcha.execute(siteKey, { action });
    return token;
  } catch (error) {
    throw new Error(
      `reCAPTCHA execution failed: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
