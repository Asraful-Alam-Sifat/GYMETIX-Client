"client";
import { Check } from "lucide-react";
import Image from "next/image";
import menWorkoutWithRope from "@/assets/Image/men-workout-with-rope.png";

const features = [
  {
    title: "Personalized Training",
    description:
      "Get workout plans built around your goals, with progress tracked automatically on your dashboard.",
  },
  {
    title: "Flexible Booking",
    description:
      "Browse hundreds of classes and book instantly, with secure payment and confirmation in seconds.",
  },
  {
    title: "Expert Trainers",
    description:
      "Every class is led by certified trainers across Yoga, HIIT, Strength, Cardio, and more.",
  },
  {
    title: "Real Progress Tracking",
    description:
      "Monitor bookings, favorites, and milestones from one place, so you always know where you stand.",
  },
];

export default function WhyGymetix() {
  return (
    <section className="relative bg-[#222222] pt- sm:pt-20 pb-20 px-6 lg:px-10">

      {/* glow bg blob */}
       <div className="absolute -bottom-40 -left-20 min-w-90 max-w-120 h-120 rounded-full bg-radial from-[#F2FD84]/20 via-transparent to-transparent blur-3xl pointer-events-none" />
      <div className="mx-auto grid max-w-10/12 lg:max-w-6xl grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
        {/* Left */}
        <div>
          <p className="font-heading mb-3 text-xs font-bold tracking-[0.2em] text-[#F2FD84]">
            WHY GYMETIX
          </p>
          <h2 className="font-heading mb-10 text-4xl font-black uppercase leading-[1.1] text-white sm:text-5xl">
            Your Ideal <span className="text-[#F2FD84]">Fitness</span> Partner
          </h2>

          <ul className="space-y-8">
            {features.map((feature) => (
              <li key={feature.title} className="flex gap-4">
                <span className="mt-1 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[#F2FD84]/10">
                  <Check className="h-4 w-4 text-[#F2FD84]" strokeWidth={3} />
                </span>
                <div>
                  <h3 className="font-heading text-lg font-bold text-white uppercase">
                    {feature.title}
                  </h3>
                  <p className="font-body mt-1 text-sm leading-relaxed text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right */}
        <div className="relative">
          <div
            className="absolute -inset-3 -z-10 rounded-2xl bg-[#F2FD84]/10"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)",
            }}
          />
          <div className="relative aspect-4/5 overflow-hidden rounded-2xl border border-[#222222] ">
            <Image
              src={menWorkoutWithRope}
              alt="Member training at Gymetix"
              fill
              className="object-cover"
            />

            {/* gradient overlays  */}
            <div className="absolute inset-0 bg-linear-to-r from-[#222223] via-[#222223]/20 to-[#222223]/20 mix-blend-multiply" />
            <div className="absolute inset-0 bg-neutral-900/40 backdrop-grayscale" />

            {/* Angled Corner */}
            <div className="absolute -top-25 left-1 w-0 h-95 border-17 sm:border-30 border-[#F2FD84]/10 rotate-45 group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute -top-35 left-13 sm:-top-35 sm:left-17 w-0 h-105 border-17 sm:border-30 border-[#F2FD84]/10 rotate-45 group-hover:scale-110 transition-transform duration-500" />
          </div>

          {/*  floating stat */}
          <div className="absolute -bottom-6 -left-6 rounded-xl border border-gray-700/30 bg-[#2B2B2B]/5 backdrop-blur-md px-6 py-4 shadow-xl">
            <p className="font-heading text-3xl font-black text-[#F2FD84]">
              250+
            </p>
            <p className="font-body text-xs uppercase tracking-wide text-gray-400">
              Active members
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
