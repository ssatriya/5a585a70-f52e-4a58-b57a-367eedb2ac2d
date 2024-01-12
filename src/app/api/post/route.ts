import { NextResponse } from "next/server";

import { BASE_URL } from "@/config";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("search");

    const res = await fetch(`${BASE_URL}/posts/search?q=${query}`);
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}
