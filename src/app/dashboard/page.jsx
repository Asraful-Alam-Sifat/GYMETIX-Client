import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardRedirectPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  const userRole = session.user.role ?? "user";

  // Automatically redirect based on user role
  if (userRole === "admin") {
    redirect("/dashboard/admin");
  } else if (userRole === "trainer") {
    redirect("/dashboard/trainer");
  } else {
    redirect("/dashboard/user");
  }
}