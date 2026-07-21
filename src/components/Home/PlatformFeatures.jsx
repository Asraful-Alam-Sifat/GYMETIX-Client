import {
  Dumbbell,
  Calendar,
  MessageSquare,
  Zap,
  BarChart3,
  Lock,
} from "lucide-react";

const features = [
  {
    icon: Dumbbell,
    title: "Expert-Led Classes",
    desc: "Learn from certified trainers with years of experience across all fitness disciplines.",
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    desc: "Book classes that fit your lifestyle — morning sessions, evening workouts, or weekend specials.",
  },
  {
    icon: MessageSquare,
    title: "Community Forum",
    desc: "Share tips, ask questions, and stay motivated with a thriving community of fitness enthusiasts.",
  },
  {
    icon: Zap,
    title: "Real-Time Booking",
    desc: "Instant class confirmations with smart conflict detection to keep your schedule clean.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    desc: "Visualize your fitness journey with detailed stats and class history on your dashboard.",
  },
  {
    icon: Lock,
    title: "Secure Payments",
    desc: "Industry-standard Stripe integration ensures every transaction is safe and transparent.",
  },
];

export default function PlatformFeatures() {
  return (
    <section className=" bg-[#222222] py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-heading text-[#F2FD84] text-xs font-bold uppercase tracking-[0.2em] mb-4">
          Platform Features
        </p>
        <h2 className="font-heading text-3xl md:text-5xl font-black uppercase text-white mb-16">
          Everything You Need to <span className="text-[#F2FD84]">Perform</span>
        </h2>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative p-8 rounded-2xl bg-transparent border border-white/8 backdrop-blur-sm transition-all duration-500 hover:bg-white/6 hover:border-[#F2FD84]/30 hover:shadow-[0_0_30px_-10px_rgba(242,253,132,0.2)] text-left overflow-hidden group"
            >
              {/* Subtle background glow effect on hover */}
              <div className="absolute inset-0 bg-linear-to-br from-[#F2FD84]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative mb-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-linear-to-tr from-[#222222] to-[#333333] border border-white/5">
                  <feature.icon className="w-6 h-6 text-[#F2FD84]" />
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="font-heading text-white text-lg font-bold uppercase mb-3 tracking-wide">
                  {feature.title}
                </h3>
                <p className="font-body text-gray-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>

              <div className="absolute bottom-0 right-0 w-16 h-1 bg-[#F2FD84]/20 rounded-tl-full group-hover:w-24 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
