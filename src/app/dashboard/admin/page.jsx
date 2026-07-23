import clientPromise from "@/lib/mongodb";

const AdminControlPanel = async  () => {
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
};

export default AdminControlPanel;