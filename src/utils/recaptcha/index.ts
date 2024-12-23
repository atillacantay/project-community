export async function executeRecaptcha(action: string): Promise<string> {
  if (!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
    throw new Error("reCAPTCHA site key is not defined.");
  }

  return new Promise((resolve, reject) => {
    grecaptcha.ready(() => {
      grecaptcha
        .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string, {
          action,
        })
        .then(resolve)
        .catch(reject);
    });
  });
}
