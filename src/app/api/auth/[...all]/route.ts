import { auth } from "@/src/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// This single handler manages all authentication routes automatically
export const { GET, POST } = toNextJsHandler(auth);