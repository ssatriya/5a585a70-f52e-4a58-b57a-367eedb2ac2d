import { z } from "zod";

export const CommentSchema = z.object({
  comments: z.array(
    z.object({
      id: z.number(),
      body: z.string(),
      postId: z.number(),
      user: z.object({
        id: z.number(),
        username: z.string(),
      }),
    })
  ),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

export type CommentType = z.infer<typeof CommentSchema>;

export const CommentContent = z.object({
  id: z.number(),
  body: z.string(),
  postId: z.number(),
  user: z.object({
    id: z.number(),
    username: z.string(),
  }),
});

export type CommentContent = z.infer<typeof CommentContent>;

export const GetCommentSchema = z.string({
  required_error: "Id is required",
});

export const AddCommentSchema = z.object({
  body: z.string().min(1, {
    message: "Comment content is required",
  }),
  postId: z.number(),
  userId: z.number(),
});

export type AddCommentType = z.infer<typeof AddCommentSchema>;
