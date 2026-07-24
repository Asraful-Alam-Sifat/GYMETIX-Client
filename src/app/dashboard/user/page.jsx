import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import {
  Award,
  BookOpen,
  Heart,
  PlusCircle,
  UserCheck,
  AlertCircle,
  Clock,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const OverviewSection = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || !session.user) {
    redirect("/login");
  }

  const firstInitial = session?.user?.name
    ? session.user.name.charAt(0).toUpperCase()
    : "?";

  let trainerApplication = session?.user?.trainerApplication || {
    status: "none",
  };

  if (session?.user?.id) {
    try {
      const client = await clientPromise;
      const db = client.db("gymetix");

      let dbUser = await db.collection("user").findOne({ id: session.user.id });

      if (!dbUser && ObjectId.isValid(session.user.id)) {
        dbUser = await db
          .collection("user")
          .findOne({ _id: new ObjectId(session.user.id) });
      }

      if (dbUser?.trainerApplication) {
        trainerApplication = dbUser.trainerApplication;
      }
    } catch (error) {
      console.error("Failed to fetch fresh user data from DB:", error);
    }
  }

  const recentBookings = [
    {
      id: 1,
      title: "Cardio Blast HIIT",
      trainer: "Trainer",
      schedule: "Tue, Thu, Sat, Sun at 06:00",
      price: "$25",
      image:
        "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=150",
    },
    {
      id: 2,
      title: "Endurance Builder Bootcamp",
      trainer: "Trainer",
      schedule: "Mon, Wed, Thu, Sat at 08:00",
      price: "$50",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=150",
    },
  ];

  return (
    <div className="px-6 md:px-12 py-10 max-w-7xl mx-auto">
      <section className="mb-10">
        <h2 className="font-heading text-xl font-bold uppercase text-white mb-6">
          Overview
        </h2>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Stat Card 1 */}
          <div className="relative p-3 md:p-2 lg:p-6 rounded-2xl bg-[#1a1a1a] border border-white/8 backdrop-blur-sm transition-all duration-500 hover:border-[#F2FD84]/30 overflow-hidden group">
            <div className="relative flex items-center gap-4 md:gap-2 lg:gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-linear-to-tr from-[#141414] to-[#262626] border border-white/5 text-[#F2FD84]">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <span className="font-heading text-3xl font-black text-white">
                  {session?.user?.bookedClasses || 0}
                </span>
                <p className="font-body text-xs text-gray-400 uppercase tracking-wider mt-0.5">
                  Booked Classes
                </p>
              </div>
            </div>
          </div>

          {/* Stat Card 2 */}
          <div className="relative p-3 md:p-2 lg:p-6 rounded-2xl bg-[#1a1a1a] border border-white/8 backdrop-blur-sm transition-all duration-500 hover:border-[#F2FD84]/30 overflow-hidden group">
            <div className="relative flex items-center gap-4 md:gap-2 lg:gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-linear-to-tr from-[#141414] to-[#262626] border border-white/5 text-[#F2FD84]">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <span className="font-heading text-3xl font-black text-white">
                  {session?.user?.favoriteClasses || 0}
                </span>
                <p className="font-body text-xs text-gray-400 uppercase tracking-wider mt-0.5">
                  Favorites
                </p>
              </div>
            </div>
          </div>

          {/* Stat Card 3 */}
          <div className="relative p-3 md:p-2 lg:p-6 rounded-2xl bg-[#1a1a1a] border border-white/8 backdrop-blur-sm transition-all duration-500 hover:border-[#F2FD84]/30 overflow-hidden group">
            <div className="relative flex items-center gap-4 md:gap-2 lg:gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-linear-to-tr from-[#141414] to-[#262626] border border-white/5 text-[#F2FD84]">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="font-heading text-lg font-black text-white block capitalize">
                  {session?.user?.role === "user" && "member"}
                </span>
                <p className="font-body text-xs text-gray-400 uppercase tracking-wider">
                  Role
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile & Trainer Application Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Profile Card */}
          <div className="relative p-6 rounded-2xl bg-[#1a1a1a] border border-white/8 backdrop-blur-sm">
            <h3 className="font-heading text-white text-md font-bold uppercase mb-4 tracking-wide">
              Profile
            </h3>
            <div className="flex items-center gap-4">
              {session?.user?.image ? (
                <div className="relative w-16 h-16">
                  <Image
                    fill
                    sizes="76px"
                    src={session.user.image}
                    alt="User Profile"
                    className="w-16 h-16 rounded-2xl object-cover border border-white/10"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-lg bg-[#F2FD84]/15 border border-[#F2FD84]/40 flex items-center justify-center text-[#F2FD84] font-bold text-sm">
                  {firstInitial}
                </div>
              )}

              <div>
                <h4 className="font-heading text-white font-bold text-base">
                  {session?.user?.name}
                </h4>
                <p className="text-gray-400 text-xs mb-2">
                  {session?.user?.email}
                </p>
                <span className="inline-block text-[10px] bg-[#F2FD84]/10 text-[#F2FD84] px-2.5 py-1 rounded-md font-semibold uppercase tracking-wider border border-[#F2FD84]/20">
                  {session?.user?.role === "user"
                    ? "member"
                    : session?.user?.role}
                </span>
              </div>
            </div>
          </div>

          {/* Trainer Application Status Card */}
          <div className="relative p-6 rounded-2xl bg-[#1a1a1a] border border-white/8 backdrop-blur-sm flex flex-col justify-between">
            <div>
              <h3 className="font-heading text-white text-md font-bold uppercase mb-2 tracking-wide">
                Trainer Application
              </h3>

              {trainerApplication.status === "none" && (
                <p className="text-gray-400 text-xs mt-4">
                  No application submitted yet. Apply now to become a
                  professional trainer on Gymetix.
                </p>
              )}

              {trainerApplication.status === "Pending" && (
                <div className="mt-4 flex items-center gap-2.5 bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-xl text-yellow-400 text-xs font-medium">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>
                    Your application is currently under review (
                    <strong className="uppercase">Pending</strong>).
                  </span>
                </div>
              )}

              {trainerApplication.status === "Rejected" && (
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2.5 bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-red-400 text-xs font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>
                      Application Status:{" "}
                      <strong className="uppercase">Rejected</strong>
                    </span>
                  </div>
                  {trainerApplication.feedback && (
                    <p className="text-xs text-gray-400 bg-black/20 p-3 rounded-xl border border-white/5">
                      <strong className="text-gray-300">Admin Feedback:</strong>{" "}
                      {trainerApplication.feedback}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="mt-6">
              {trainerApplication.status === "none" ||
              trainerApplication.status === "Rejected" ? (
                <Link
                  href="/dashboard/user/apply-trainer"
                  className="inline-flex items-center gap-2 text-xs font-heading font-bold text-[#141414] uppercase tracking-wider transition-colors bg-[#F2FD84] px-5 py-2.5 rounded-xl hover:bg-[#d8e370]"
                >
                  <PlusCircle className="w-4 h-4" />{" "}
                  {trainerApplication.status === "Rejected"
                    ? "Re-apply Now"
                    : "Apply Now"}
                </Link>
              ) : (
                <span className="text-xs text-gray-500 italic">
                  Application locked during active review process.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Recent Bookings Section */}
        <div className="relative p-6 rounded-2xl bg-[#1a1a1a] border border-white/8 backdrop-blur-sm">
          <h3 className="font-heading text-white text-md font-bold uppercase mb-6 tracking-wide">
            Recent Bookings
          </h3>

          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white/3 border border-white/5 hover:border-[#F2FD84]/20 transition-all gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12">
                    <Image
                      fill
                      sizes="76px"
                      src={booking.image}
                      alt={booking.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-heading text-sm font-bold text-white uppercase">
                      {booking.title}
                    </h4>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Trainer &bull; {booking.schedule}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-0 pt-2 sm:pt-0 border-white/5">
                  <span className="font-heading font-black text-[#F2FD84] text-sm">
                    {booking.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OverviewSection;
