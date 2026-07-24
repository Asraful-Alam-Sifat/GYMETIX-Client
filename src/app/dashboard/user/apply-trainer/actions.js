"use server";

import { auth } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function submitTrainerApplication(formData) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session || !session.user) {
      return { success: false, error: "Unauthorized. Please log in." };
    }

    const userId = session.user.id;

    const experience = formData.get("experience");
    const specialty = formData.get("specialty");
    const phone = formData.get("phone");
    const bio = formData.get("bio");

    const client = await clientPromise;
    const db = client.db("gymetix");

    const usersCollection = db.collection("user");

    const trainerApplication = {
      status: "Pending",
      experience: Number(experience),
      specialty: specialty,
      phone: phone,
      bio: bio,
      feedback: "",
      submittedAt: new Date(),
    };

    let query = { id: userId };
    if (ObjectId.isValid(userId)) {
      query = { $or: [{ id: userId }, { _id: new ObjectId(userId) }] };
    }

    await usersCollection.updateOne(query, { $set: { trainerApplication } });

    revalidatePath("/dashboard/user");

    return { success: true };
  } catch (error) {
    console.error("Failed to submit trainer application:", error);
    return { success: false, error: "Internal server error." };
  }
}
