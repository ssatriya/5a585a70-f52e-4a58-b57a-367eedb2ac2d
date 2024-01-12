"use server";

import { BASE_URL } from "@/config";
import { ArticleType } from "@/lib/schema/article";
import {
  GetPostByParamSchema,
  GetPostSchema,
  PostType,
} from "@/lib/schema/post";
import { getErrorMessage } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function getPosts(skip: number = 0, limit: number) {
  try {
    const res = await fetch(`${BASE_URL}/posts?limit=${limit}&skip=${skip}`);
    const data = (await res.json()) as PostType;

    revalidatePath("/");

    return { data };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}

export async function getPostById(id: string) {
  const validatedField = GetPostSchema.safeParse(id);

  if (!validatedField.success) {
    return { error: "Id is required" };
  }
  try {
    const res = await fetch(`${BASE_URL}/posts/${validatedField.data}`);
    const data = (await res.json()) as ArticleType;

    revalidatePath("/");

    return { data };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}

export async function getPostByParams(
  param: string,
  skip: number = 0,
  limit: number
) {
  const validatedField = GetPostByParamSchema.safeParse(param);

  if (!validatedField.success) {
    return { error: "Parameter is required" };
  }

  try {
    const res = await fetch(
      `${BASE_URL}/posts/search?q=${param}&limit=${limit}&skip=${skip}`
    );
    const data = (await res.json()) as PostType;

    return { data };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}
