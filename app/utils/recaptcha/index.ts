import { axiosClient } from "@/utils/axios/client";

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

export async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET;

  if (!secretKey) {
    throw new Error(
      "reCAPTCHA secret key is not defined in the environment variables."
    );
  }

  try {
    const response = await axiosClient.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: secretKey,
          response: token,
        },
      }
    );

    const data = response.data;

    if (!data.success) {
      console.error("reCAPTCHA verification failed", data["error-codes"]);
    }

    return data.success === true;
  } catch (error) {
    console.error("Error verifying reCAPTCHA", error);
    throw new Error("reCAPTCHA verification failed");
  }
}

/**
 * Validates the captcha token.
 */
export async function validateCaptcha(captchaToken: string): Promise<void> {
  if (!captchaToken) {
    throw new Error("Captcha token is missing.");
  }

  const isCaptchaValid = await verifyRecaptcha(captchaToken);
  if (!isCaptchaValid) {
    throw new Error("reCAPTCHA verification failed.");
  }
}
