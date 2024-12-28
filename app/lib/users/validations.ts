import { z } from "zod";

export const signUpSchema = z
  .object({
    username: z.string().min(4),
    email: z.string().email(),
    password: z.string().min(6),
    gender: z.union([
      z.literal("female"),
      z.literal("male"),
      z.literal("other"),
    ]),
  })
  .required();

export const signInSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  .required();

export type SignInValues = z.infer<typeof signInSchema>;

export type SignUpValues = z.infer<typeof signUpSchema>;
