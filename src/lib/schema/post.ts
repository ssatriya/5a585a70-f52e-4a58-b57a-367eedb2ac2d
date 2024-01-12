import { z } from "zod";

export const PostSchema = z.object({
  posts: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      body: z.string(),
      userId: z.number(),
      tags: z.array(z.string()),
      reactions: z.number(),
    })
  ),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

export type PostType = z.infer<typeof PostSchema>;

export const GetPostSchema = z.string({
  required_error: "Id is required",
});

export const GetPostByParamSchema = z.string().min(1, {
  message: "Parameter is required",
});
