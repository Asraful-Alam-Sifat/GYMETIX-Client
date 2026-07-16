import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb"; // Import ObjectId

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ authenticated: false });
  }

  const client = await clientPromise;
  const db = client.db("gymetix");

  // 1. Better Auth usually stores the primary key in session.user.id.
  // In MongoDB, this corresponds to the "_id" field.
  let user = null;
  try {
    user = await db.collection("user").findOne({ 
      _id: new ObjectId(session.user.id) 
    });
  } catch (e) {
    // If your IDs are standard strings instead of ObjectIds, query like this instead:
    user = await db.collection("user").findOne({ id: session.user.id });
  }

  // If we still can't find the user document, fallback to session values
  if (!user) {
    return NextResponse.json({ authenticated: false });
  }

  // 2. Extract firstLogin.
  // We check the DB document first, then fall back to the session object
  const isFirstLogin = user.firstLogin ?? session.user.firstLogin ?? false;

  console.log("SERVER FIRST LOGIN VALUE:", isFirstLogin);

  // 3. If it's true, update the DB so future visits result in "false"
  if (isFirstLogin) {
    await db.collection("user").updateOne(
      { _id: user._id },
      {
        $set: { firstLogin: false },
      }
    );
  }

  // 4. Return the ORIGINAL state we grabbed before the update
  return NextResponse.json({
    authenticated: true,
    firstLogin: isFirstLogin,
  });
}