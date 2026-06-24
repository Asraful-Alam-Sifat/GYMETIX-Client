import Link from "next/link";

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen bg-[#1d1c1c] text-white flex flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="font-heading text-6xl font-extrabold uppercase text-red-500">
        403
      </h1>
      <p className="text-zinc-300 text-lg font-medium">
        You don&apos;t have permission to access this page.
      </p>
      <Link
        href="/dashboard"
        className="bg-[#F2FD84] text-black font-extrabold uppercase px-6 py-2.5 rounded-lg tracking-wider text-sm hover:bg-zinc-950 hover:text-[#F2FD84] border border-transparent hover:border-[#F2FD84]/75 transition-all"
      >
        Back to Dashboard
      </Link>
    </div>
  );
};

export default UnauthorizedPage;
