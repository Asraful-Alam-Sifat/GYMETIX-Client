import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect("/login");

  const { user } = session;

  return (
    <div className="min-h-screen bg-[#1d1c1c] text-white flex flex-col items-center justify-center gap-6 px-6">
      <h1 className="font-heading text-4xl font-extrabold uppercase text-[#F2FD84]">
        Dashboard
      </h1>
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md space-y-3">
        <p className="text-zinc-400 text-sm uppercase tracking-wider font-bold">
          Logged in as
        </p>
        <p className="text-white font-semibold text-lg">{user.name}</p>
        <p className="text-zinc-400 text-sm">{user.email}</p>
        <span className="inline-block bg-[#F2FD84]/10 text-[#F2FD84] border border-[#F2FD84]/20 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider">
          Role: {user.role ?? "user"}
        </span>
      </div>

      {/* Only admins see this */}
      {user.role === "admin" && (
        <a
          href="/admin"
          className="bg-[#F2FD84] text-black font-extrabold uppercase px-6 py-2.5 rounded-lg tracking-wider text-sm hover:bg-zinc-950 hover:text-[#F2FD84] hover:border hover:border-[#F2FD84]/75 transition-all"
        >
          Go to Admin Panel
        </a>
      )}
    </div>
  );
};

export default DashboardPage;
