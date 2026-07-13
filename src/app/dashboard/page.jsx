import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import DashboardToast from "@/components/Dashboard/DashboardToast";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  const userRole = session.user.role ?? "user";


  return (
    <>
      <DashboardToast />
      <div className="min-h-screen bg-[#1d1c1c] text-white px-6 py-20">
        {/* --- SHARED DASHBOARD HEADER --- */}
        <div className="border-b border-zinc-800 pb-6 mb-8">
          <h1 className="text-4xl font-extrabold uppercase text-[#F2FD84]">
            Dashboard
          </h1>
          <p className="text-zinc-400 mt-2">
            Welcome back,{" "}
            <span className="text-white font-semibold">
              {session.user.name}
            </span>{" "}
            ({userRole})
          </p>
        </div>

        {/*  ADMIN CONTROL PANEL */}
        {userRole === "admin" && <AdminUserListSection />}

        {/*  TRAINER CONTROL PANEL */}
        {userRole === "trainer" && (
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
            <h2 className="text-xl font-bold text-white mb-2">
              Trainer Management Panel
            </h2>
            <p className="text-zinc-400">
              Manage routines, client assignments, and workout schedules here.
            </p>
          </div>
        )}

        {/*  STANDARD MEMBER VIEW */}
        {userRole === "user" && (
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
            <h2 className="text-xl font-bold text-white mb-2">
              My Workout Workspace
            </h2>
            <p className="text-zinc-400">
              Track your progress, view assigned trainers, and log daily
              activities.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

/* Helper Component */
async function AdminUserListSection() {
  const client = await clientPromise;
  const users = await client
    .db("gymetix")
    .collection("user")
    .find({}, { projection: { passwordHash: 0 } })
    .toArray();

  return (
    <div className="space-y-4 max-w-3xl">
      <h2 className="text-2xl font-bold text-white mb-4">
        System User Administration
      </h2>
      {users.map((u) => (
        <div
          key={u._id.toString()}
          className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 flex items-center justify-between"
        >
          <div>
            <p className="text-white font-semibold">{u.name}</p>
            <p className="text-zinc-400 text-sm">{u.email}</p>
          </div>
          <span className="bg-zinc-800 text-zinc-300 text-xs font-bold uppercase px-3 py-1 rounded-full">
            {u.role ?? "user"}
          </span>
        </div>
      ))}
    </div>
  );
}
