"use server";

import { BASE_URL } from "@/config";
import { GetUserSchema, UserType } from "@/lib/schema/user";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getUserById(id: number) {
  const validatedFields = GetUserSchema.safeParse(id);

  if (!validatedFields.success) {
    return { message: "Id is required" };
  }
  try {
    const res = await fetch(`${BASE_URL}/users/${id}`);
    const data = (await res.json()) as UserType;

    return { data };
  } catch (error) {
    return { message: "Failed to fetch username" };
  }
}
