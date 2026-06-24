import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// Map route prefixes → which roles can access them
const ROLE_ROUTES = {
  "/admin":     ["admin"],
  "/trainer":   ["admin", "trainer"],
  "/dashboard": ["admin", "trainer", "user"],
};

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;

  // Find if this path matches a protected route
  const matchedRoute = Object.keys(ROLE_ROUTES).find((route) =>
    pathname.startsWith(route)
  );

  // Not a protected route — let it through
  if (!matchedRoute) return NextResponse.next();

  // Read session from Better Auth
  const session = await auth.api.getSession({ headers: req.headers });

  // No session → redirect to login
  if (!session) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const userRole = session.user.role ?? "user";
  const allowedRoles = ROLE_ROUTES[matchedRoute];

  // Role not allowed → redirect to unauthorized
  if (!allowedRoles.includes(userRole)) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/trainer/:path*"],
};