import { NextResponse, type NextRequest } from "next/server";
import { betterFetch } from "@better-fetch/fetch";

// We define the type of what better-auth returns for a session
type Session = {
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
  };
  user: {
    id: string;
    email: string;
    name: string;
  };
};

export default async function authMiddleware(request: NextRequest) {
  // 1. Fetch the session securely from our own API route
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        // Forward the user's cookies so the API knows who is asking
        cookie: request.headers.get("cookie") || "",
      },
    }
  );

  // 2. If no session exists, kick them to the login page
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 3. If they are authenticated, let them through
  return NextResponse.next();
}

// 4. Configure WHICH routes this middleware should protect
export const config = {
  matcher: [
    "/dashboard", 
    "/document/:path*" // This protects /document/new, /document/doc_1, etc.
  ],
};