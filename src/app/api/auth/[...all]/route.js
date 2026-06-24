import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// This single route handles ALL Better Auth endpoints:
// POST /api/auth/sign-up/email
// POST /api/auth/sign-in/email
// POST /api/auth/sign-out
// GET  /api/auth/session
// ...and more
export const { GET, POST } = toNextJsHandler(auth);