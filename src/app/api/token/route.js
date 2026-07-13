import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = {
    sub: session.user.id,
    email: session.user.email,
    name: session.user.name,
    role: session.user.role ?? "user",
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return NextResponse.json({ token });
}
