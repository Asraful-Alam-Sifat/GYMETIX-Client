import SidebarNav from "@/components/Dashboard/User/SidebarNav";
import DashboardToast from "@/components/Dashboard/DashboardToast";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import DashboardMenu from "@/components/Dashboard/User/DashboardMenu";

export default async function MemberLayout({ children }) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (
    !session ||
    session.user.role === "admin" ||
    session.user.role === "trainer"
  ) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white flex flex-col font-sans">
      <DashboardToast />

      {/* Main Layout Area */}
      <div className="flex flex-1">
       
        <SidebarNav />

        {/* Main Content Area */}
        <main className="flex-1 bg-[#141414] min-h-screen overflow-y-auto">
          <div className="flex md:hidden">
            <DashboardMenu />
          </div>
          {/* Header Banner */}
          <div
            className="relative w-full h-64 md:h-72 bg-cover bg-center flex items-center justify-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1600')`,
            }}
          >
            <div className="absolute inset-0 bg-linear-to-t from-[#141414] via-[#222223]/80 to-black/80" />

            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-6">
              <h1 className="font-heading text-3xl md:text-5xl font-black uppercase text-white tracking-wide">
                <span
                  className="text-transparent"
                  style={{ WebkitTextStroke: "2px white" }}
                >
                  user
                </span>{" "}
                <span className="text-[#F2FD84]">Dashboard</span>
              </h1>
              <p className="font-body text-gray-300 text-sm md:text-base mt-2 max-w-xl mx-auto">
                Welcome,{" "}
                <span className="text-[#F2FD84]">{session.user.name}</span>{" "}
                Manage your fitness journey and track your booked sessions.
              </p>
            </div>
          </div>

          {/* Children  */}
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}
