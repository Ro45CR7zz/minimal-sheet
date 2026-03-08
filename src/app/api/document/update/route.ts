import { NextResponse } from "next/server";
import clientPromise from "@/src/lib/mongodb";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";

export async function PATCH(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, isStarred, isTrashed } = await request.json();
  const client = await clientPromise;
  const db = client.db();

  // Dynamically build the update object based on what was passed
  const updateFields: Record<string, boolean> = {};
  if (isStarred !== undefined) updateFields.isStarred = isStarred;
  if (isTrashed !== undefined) updateFields.isTrashed = isTrashed;

  await db.collection("documents").updateOne(
    { id: id, authorId: session.user.id }, // Ensure they only update their own docs
    { $set: updateFields }
  );

  return NextResponse.json({ success: true });
}