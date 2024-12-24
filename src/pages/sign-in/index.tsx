import { Button } from "@/components/common/button";
import { Input } from "@/components/common/input";
import { Stack } from "@/components/common/stack";
import { executeRecaptcha } from "@/utils/recaptcha";
import { axiosClient } from "@/utils/supabase/axios/client";
import { yupResolver } from "@hookform/resolvers/yup";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .required();

export default function SignInPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const token = await executeRecaptcha("sign_in");
      const response = await axiosClient.post(`/auth/sign-in`, data, {
        headers: {
          "x-captcha-token": token,
        },
      });

      if (response.status === 200) {
        router.push("/");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <>
      <Head>
        {/* Title for Search Engines */}
        <title>Sign In - Ahali</title>

        {/* Meta Description for SEO */}
        <meta
          name="description"
          content="Access your Ahali account. Sign in to stay connected and manage your settings."
        />

        {/* Canonical URL to avoid duplicate content */}
        <link rel="canonical" href="https://ahali.vercel.app/sign-in" />

        {/* Open Graph for Social Sharing */}
        <meta property="og:title" content="Sign In - Ahali" />
        <meta
          property="og:description"
          content="Access your Ahali account. Sign in to stay connected and manage your settings."
        />
        <meta property="og:url" content="https://ahali.vercel.app/sign-in" />
        <meta
          property="og:image"
          content="https://ahali.vercel.app/static/signin-thumbnail.jpg"
        />
      </Head>
      <div className="container mx-auto">
        <Stack as="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={4}>
            <Input
              type="email"
              placeholder="Email"
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              type="password"
              placeholder="Password"
              error={errors.password?.message}
              {...register("password")}
            />
            <Button type="submit">Sign In</Button>
          </Stack>
        </Stack>
      </div>
    </>
  );
}
