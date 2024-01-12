"use server";

import { BASE_URL } from "@/config";
import {
  AddCommentSchema,
  AddCommentType,
  CommentType,
  GetCommentSchema,
} from "@/lib/schema/comment";
import { getErrorMessage } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function getCommentByPostId(id: string) {
  const validatedField = GetCommentSchema.safeParse(id);
  if (!validatedField.success) {
    return { message: "Id is required" };
  }

  try {
    const res = await fetch(`${BASE_URL}/posts/${id}/comments`);
    const data = await res.json();

    return { data: data as CommentType, message: "Success" };
  } catch (error) {
    return { message: "Failed to fetch comments" };
  }
}

export async function addComment(values: AddCommentType) {
  const validatedFields = AddCommentSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { body, postId, userId } = validatedFields.data;

  try {
    const res = await fetch(`${BASE_URL}/comments/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        body,
        postId,
        userId,
      }),
    });

    const data = await res.json();

    revalidatePath(`/${postId}`);

    return { success: "Comments added", data };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}
