import { NextResponse } from "next/server";
import clientPromise from "@/src/lib/mongodb";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";

// Helper function to generate a consistent color based on a string (User ID)
// This ensures the user is always the same color during their session!
const COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#3b82f6", "#a855f7", "#ec4899"];
const getStickyColor = (str: string) => {
  const hash = [...str].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return COLORS[hash % COLORS.length];
};

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { documentId } = await request.json();
  const client = await clientPromise;
  const db = client.db();
  const now = new Date();

  const initials = session.user.name
    ? session.user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().substring(0, 2)
    : "??";

  // 1. Upsert this user's heartbeat
  await db.collection("presence").updateOne(
    { documentId, userId: session.user.id },
    {
      $set: {
        userName: session.user.name,
        userInitials: initials,
        color: getStickyColor(session.user.id),
        lastActive: now,
      }
    },
    { upsert: true }
  );

  // 2. Find everyone who has been active in this document in the last 15 seconds
  const fifteenSecondsAgo = new Date(now.getTime() - 15 * 1000);
  const activeUsers = await db.collection("presence").find({
    documentId,
    lastActive: { $gte: fifteenSecondsAgo }
  }).toArray();

  return NextResponse.json(activeUsers);
}