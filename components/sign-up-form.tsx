"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Stack } from "@/components/ui/stack";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { axiosClient } from "@/utils/axios/client";
import { executeRecaptcha } from "@/utils/recaptcha";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  nickname: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(6),
  gender: z.union([z.literal("female"), z.literal("male"), z.literal("other")]),
});

const genders = [
  {
    key: "female",
    label: "Female",
  },
  { key: "male", label: "Male" },
  { key: "other", label: "Other" },
];

export function SignUpForm() {
  const [error, setError] = useState("");
  const router = useRouter();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      nickname: "",
      email: "",
      gender: "other",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setError("");

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
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          setError(error.response.data?.message);
        }
      }
    }
  };

  return (
    <Stack className="gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Sign Up with your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <Stack className="gap-6">
            <Button variant="outline" className="w-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Sign Up with Google
            </Button>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </Stack>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
              <Stack className="gap-6">
                <Stack className="gap-6">
                  <FormField
                    control={form.control}
                    name="nickname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nickname</FormLabel>
                        <FormControl>
                          <Input placeholder="user123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="m@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <ToggleGroup
                            variant="outline"
                            className="justify-start"
                            type="single"
                            onValueChange={field.onChange}
                            {...field}
                          >
                            {genders.map(({ key, label }) => (
                              <ToggleGroupItem
                                value={key}
                                key={key}
                                aria-label={`Toggle ${label}`}
                              >
                                {label}
                              </ToggleGroupItem>
                            ))}
                          </ToggleGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {error && <FormMessage>{error}</FormMessage>}
                  <Button type="submit" className="w-full">
                    Sign Up
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Form>
          <div className="text-center text-sm mt-6">
            Already have an account?{" "}
            <Link href="/sign-in" className="underline">
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:hover:text-primary">
        By clicking continue, you agree to our{" "}
        <Link href="/terms-of-service">Terms of Service</Link> and{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </div>
    </Stack>
  );
}
