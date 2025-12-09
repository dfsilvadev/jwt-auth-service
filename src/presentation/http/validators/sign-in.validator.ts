import { z } from "zod";

export const signInValidator = z.object({
  email: z.email(),
  password: z.string().min(1)
});

export type SignInValidator = z.infer<typeof signInValidator>;
