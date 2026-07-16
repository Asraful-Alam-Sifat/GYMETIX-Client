import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import DashboardToast from "@/components/Dashboard/DashboardToast";
import AdminControlPanel from "@/components/Dashboard/Admin/AdminControlPanel";
import TrainerControlPanel from "@/components/Dashboard/Trainer/TrainerControlPanel";
import UserControlPanel from "@/components/Dashboard/User/UserControlPanel";

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
        {userRole === "admin" && <AdminControlPanel/>}

        {/*  TRAINER CONTROL PANEL */}
        {userRole === "trainer" && <TrainerControlPanel/>}

        {/*  STANDARD MEMBER VIEW */}
        {userRole === "user" && <UserControlPanel/>}
      </div>
    </>
  );
}

