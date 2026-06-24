import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";

const AdminPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || session.user.role !== "admin") redirect("/unauthorized");

  const client = await clientPromise;
  const users = await client
    .db("gymetix")
    .collection("user")
    .find({}, { projection: { passwordHash: 0 } })
    .toArray();

  return (
    <div className="min-h-screen bg-[#1d1c1c] text-white px-6 py-12">
      <h1 className="font-heading text-4xl font-extrabold uppercase text-[#F2FD84] mb-8">
        Admin Panel
      </h1>
      <div className="space-y-4 max-w-3xl mx-auto">
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
    </div>
  );
};

export default AdminPage;
