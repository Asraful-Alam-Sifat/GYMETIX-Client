import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb"; 

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ authenticated: false });
  }

  const client = await clientPromise;
  const db = client.db("gymetix");

  let user = null;
  try {
    user = await db.collection("user").findOne({ 
      _id: new ObjectId(session.user.id) 
    });
  } catch (e) {
    user = await db.collection("user").findOne({ id: session.user.id });
  }

  if (!user) {
    return NextResponse.json({ authenticated: false });
  }

  const isFirstLogin = user.firstLogin ?? session.user.firstLogin ?? false;

  console.log("SERVER FIRST LOGIN VALUE:", isFirstLogin);

  if (isFirstLogin) {
    await db.collection("user").updateOne(
      { _id: user._id },
      {
        $set: { firstLogin: false },
      }
    );
  }


  return NextResponse.json({
    authenticated: true,
    firstLogin: isFirstLogin,
  });
}