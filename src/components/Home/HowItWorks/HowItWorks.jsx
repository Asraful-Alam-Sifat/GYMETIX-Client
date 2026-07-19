

const HowItWorks = () => {
  const steps = [
    { id: "01", title: "Create Account", desc: "Sign up in seconds and choose your fitness goals to personalize your experience." },
    { id: "02", title: "Browse Classes", desc: "Explore hundreds of classes across Yoga, HIIT, Strength, Cardio, and more." },
    { id: "03", title: "Book & Pay", desc: "Reserve your spot instantly with secure payment. Instant confirmation guaranteed." },
    { id: "04", title: "Track Progress", desc: "Monitor your bookings, favorites, and milestones from your personal dashboard." },
  ];

  return (
    <section className="w-full bg-[#222222] pb-20 relative overflow-hidden">
   
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-106 h-106 rounded-full bg-radial from-[#F2FD84]/20 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="sm:max-w-10/12 mx-auto px-6 relative z-20">
        <div className="text-center mb-16">
          <p className="font-heading text-[#F2FD84] text-xs font-bold uppercase tracking-[0.2em] mb-4">
            How It Works
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-black uppercase text-white">
            Your Fitness Journey in <span className="text-[#F2FD84]">4 Steps</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="group relative bg-[#2B2B2B] p-8 rounded-xl border border-gray-700/50 hover:border-[#F2FD84]/50 transition-all duration-300 overflow-hidden"
            >
              
              <div className="absolute -bottom-22 -right-9 w-24 h-35 border-9 border-[#F2FD84]/10 rotate-45 group-hover:scale-110 transition-transform duration-500" />
              
              <div className="relative z-10">
                <div className="text-[#F2FD84] font-heading font-black text-4xl mb-6 opacity-50 group-hover:opacity-100 transition-opacity">
                  {step.id}
                </div>
                <h3 className="font-heading text-white text-lg font-bold uppercase mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-gray-400 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;




