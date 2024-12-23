import { executeRecaptcha } from "@/utils/recaptcha";
import { axiosClient } from "@/utils/supabase/axios/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Container,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Head from "next/head";
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

  const onSubmit = async (data) => {
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
      <div>
        <Container maxWidth="md">
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={4}>
              <TextField
                type="nickname"
                placeholder="Nickname"
                size="small"
                error={!!errors.nickname}
                helperText={errors.nickname?.message}
                {...register("nickname")}
              />
              <TextField
                type="email"
                placeholder="Email"
                size="small"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register("email")}
              />
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <ToggleButtonGroup
                    {...field}
                    exclusive
                    size="small"
                    color="primary"
                    aria-label="Sex"
                  >
                    <ToggleButton value="female" aria-label="female toggle">
                      Female
                    </ToggleButton>
                    <ToggleButton value="male" aria-label="male toggle">
                      Male
                    </ToggleButton>
                    <ToggleButton value="other" aria-label="other toggle">
                      Other
                    </ToggleButton>
                  </ToggleButtonGroup>
                )}
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
                Sign Up
              </LoadingButton>
            </Stack>
          </Box>
        </Container>
      </div>
    </>
  );
}
