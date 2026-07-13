import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log("SERVER SESSION OBJECT:", JSON.stringify(session, null, 2));

  if (!session) {
    return NextResponse.json({ authenticated: false });
  }

  const client = await clientPromise;
  const db = client.db("gymetix");

  const user = await db.collection("user").findOne({
    id: session.user._id,
  });

  if (!user) {
    return NextResponse.json({ authenticated: false });
  }

  const firstLogin = user.firstLogin ?? false;

  if (firstLogin) {
    await db.collection("user").updateOne(
      {
        id: session.user._id,
      },
      {
        $set: {
          firstLogin: false,
        },
      },
    );
  }

  return NextResponse.json({
    authenticated: true,
    firstLogin: firstLogin,
  });
}
