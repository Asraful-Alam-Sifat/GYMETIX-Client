const plans = [
  {
    name: "BASIC PLAN",
    price: "$39",
    features: [
      "Access to all cardio classes",
      "Monthly body assessment",
      "Nutritional guidance",
    ],
    popular: false,
  },
  {
    name: "PREMIUM PLAN",
    price: "$59",
    features: [
      "All Basic Plan features",
      "Strength training sessions",
      "Nutritional guidance",
    ],
    popular: true,
  },
  {
    name: "ELITE PLAN",
    price: "$89",
    features: [
      "All Premium Plan features",
      "Personal training session a month",
      "Priority booking for all classes",
    ],
    popular: false,
  },
];

export default function MembershipPlans() {
  return (
    <section className="relative bg-[#222222] py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-heading text-[#F2FD84] text-xs font-bold uppercase tracking-[0.2em] mb-4">
          Membership Tiers
        </p>
        <h2 className="font-heading text-3xl md:text-5xl font-black uppercase text-white mb-16">
          Choose Your <span className="text-[#F2FD84]">Strategy</span>
        </h2>

        {/* Membership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl bg-transparent border backdrop-blur-sm transition-all duration-500 hover:scale-105 text-left overflow-hidden group ${
                plan.popular
                  ? "border-[#F2FD84] shadow-[0_0_30px_-5px_rgba(242,253,132,0.3)] md:-translate-y-2"
                  : "border-white/10 hover:border-[#F2FD84]/30 hover:shadow-[0_0_30px_-10px_rgba(242,253,132,0.2)]"
              }`}
            >
              {/* Corner Light Animation Effect  */}
              <div className="absolute -top-12 -left-12 w-24 h-24 bg-white opacity-0 group-hover:opacity-10 blur-[50px] transition-opacity duration-700" />
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#F2FD84] opacity-0 group-hover:opacity-100 blur-[15px] transition-opacity duration-500" />

              {/* Most Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-[#F2FD84] text-[#222222] font-heading font-black text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-bl-xl shadow-md">
                  Most Popular
                </div>
              )}

              {/* background glow effect on hover */}
              <div className="absolute inset-0 bg-linear-to-br from-[#F2FD84]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative mb-6">
                <h3 className="font-heading text-gray-400 font-bold uppercase tracking-widest text-sm mb-2">
                  {plan.name}
                </h3>
                <div className="font-heading text-4xl font-black text-[#F2FD84]">
                  {plan.price}
                  <span className="text-lg text-gray-500 font-normal">
                    /Month
                  </span>
                </div>
              </div>

              <ul className="relative space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="font-body text-gray-400 text-sm flex items-center"
                  >
                    <span className="text-[#F5F5DC]/65 font-bold mr-3">✔</span>{" "}
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`relative w-full py-3 rounded-sm font-bold uppercase tracking-widest text-xs transition-all duration-300 ${
                  plan.popular
                    ? "bg-[#F2FD84] text-[#222222] hover:bg-transparent hover:border hover:border-[#F2FD84] hover:text-[#F2FD84]"
                    : "bg-transparent border border-[#F2FD84] text-[#F2FD84] hover:bg-[#F2FD84] hover:text-[#222222]"
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute -bottom-15 right-15 w-80 h-80 rounded-full bg-radial from-[#F2FD84]/25 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="absolute -bottom-90 left-25 w-76 h-76 rounded-full bg-radial from-[#F2FD84]/25 via-transparent to-transparent blur-3xl pointer-events-none" />
    </section>
  );
}
