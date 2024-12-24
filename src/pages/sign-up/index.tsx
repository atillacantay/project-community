import { Button } from "@/components/common/button";
import { Input } from "@/components/common/input";
import { RadioGroup } from "@/components/common/radio-group";
import { Stack } from "@/components/common/stack";
import Typography from "@/components/common/typography";
import { executeRecaptcha } from "@/utils/recaptcha";
import { axiosClient } from "@/utils/supabase/axios/client";
import { yupResolver } from "@hookform/resolvers/yup";

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup
  .object({
    nickname: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    gender: yup.string().oneOf(["female", "male", "other"]),
  })
  .required();

export default function SignUpPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      gender: "other",
    },
  });

  const onSubmit = async (data: {
    nickname: string;
    email: string;
    password: string;
    gender?: string;
  }) => {
    try {
      const token = await executeRecaptcha("sign_up");
      const response = await axiosClient.post(`/auth/sign-up`, data, {
        headers: {
          "x-captcha-token": token,
        },
      });

      if (response.status === 200) {
        router.push("/email-confirmation");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
    }
  };

  return (
    <>
      <Head>
        {/* Title for Search Engines */}
        <title>Sign Up - Ahali</title>

        {/* Meta Description for SEO */}
        <meta
          name="description"
          content="Join Ahali today! Sign up to access exclusive features and stay connected."
        />

        {/* Canonical URL to avoid duplicate content */}
        <link rel="canonical" href="https://ahali.vercel.app/sign-up" />

        {/* Open Graph for Social Sharing */}
        <meta property="og:title" content="Sign Up - Ahali" />
        <meta
          property="og:description"
          content="Join Ahali today! Sign up to access exclusive features and stay connected."
        />
        <meta property="og:url" content="https://ahali.vercel.app/sign-up" />
        <meta
          property="og:image"
          content="https://ahali.vercel.app/static/signup-thumbnail.jpg"
        />
      </Head>
      <div className="container mx-auto">
        <Stack as="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={4} className="space-y-4">
            <Input
              type="nickname"
              placeholder="Nickname"
              error={errors.nickname?.message}
              {...register("nickname")}
            />
            <Input
              type="email"
              placeholder="Email"
              error={errors.email?.message}
              {...register("email")}
            />
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  direction="horizontal"
                  options={[
                    { label: "female", value: "female" },
                    { label: "male", value: "male" },
                    { label: "other", value: "other" },
                  ]}
                  aria-label="Sex"
                />
              )}
            />

            <Input
              type="password"
              placeholder="Password"
              error={errors.password?.message}
              {...register("password")}
            />
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </Stack>
        </Stack>
        <Typography size="sm" align="center" className="mt-4">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-primary hover:underline">
            Sign In
          </Link>
        </Typography>
      </div>
    </>
  );
}
