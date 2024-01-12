import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string().min(3, { message: "Username is required." }),
  password: z.string().min(3, { message: "Password is required." }),
});

export type LoginType = z.infer<typeof LoginSchema>;
