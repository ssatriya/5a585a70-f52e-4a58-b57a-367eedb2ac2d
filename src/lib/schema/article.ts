import { z } from "zod";

export const ArticleSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  userId: z.number(),
  tags: z.array(z.string()),
  reactions: z.number(),
});

export type ArticleType = z.infer<typeof ArticleSchema>;
