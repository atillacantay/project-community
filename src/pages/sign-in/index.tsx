import { executeRecaptcha } from "@/utils/recaptcha";
import { axiosClient } from "@/utils/supabase/axios/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Container, Stack, TextField } from "@mui/material";
import Head from "next/head";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .required();

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const token = await executeRecaptcha("sign_in");
      await axiosClient.post(`/auth/sign-in`, data, {
        headers: {
          "x-captcha-token": token,
        },
      });
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
      <div>
        <Container maxWidth="md">
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={4}>
              <TextField
                type="email"
                placeholder="Email"
                size="small"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register("email")}
              />
              <TextField
                type="password"
                placeholder="Password"
                size="small"
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register("password")}
              />
              <LoadingButton variant="outlined" type="submit">
                Sign In
              </LoadingButton>
            </Stack>
          </Box>
        </Container>
      </div>
    </>
  );
}