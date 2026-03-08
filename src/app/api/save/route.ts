import { NextResponse } from "next/server";
import clientPromise from "@/src/lib/mongodb";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";

export async function POST(request: Request) {
  // 1. Ensure user is logged in
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, title } = await request.json();
  const client = await clientPromise;
  const db = client.db();

  // 2. Extract initials for the dashboard UI
  const initials = session.user.name
    ? session.user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().substring(0, 2)
    : "??";

  // 3. Save to MongoDB
  await db.collection("documents").updateOne(
    { id: id },
    {
      $set: {
        title: title,
        updatedAt: new Date().toLocaleDateString(), // e.g., "3/8/2026"
        authorName: session.user.name,
        authorInitials: initials,
        authorId: session.user.id,
      }
    },
    { upsert: true }
  );

  return NextResponse.json({ success: true });
}