"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import bannerImg from "../../../assets/Image/workoutsformen.png";
import armIcon from "../../../assets/Icons/arm-flex-icon.png";

const SignupPage = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: signUpError } = await signUp.email({
      name: form.name,
      email: form.email,
      password: form.password,
      image: form.image || undefined,
    });

    if (signUpError) {
      setError(signUpError.message ?? "Registration failed. Please try again.");
      setLoading(false);
      return;
    }

    router.push("/login");
  };

  return (
    <div className="relative flex flex-col justify-between min-h-screen w-full bg-[#1d1c1c] text-white font-sans px-6 md:px-12 py-8">
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src={bannerImg}
          alt="Gymetix Hero Banner Background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#222223] via-[#222223]/80 to-[#222223]/20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-neutral-900/40 backdrop-grayscale" />
      </div>

      {/* GLOW BLOBS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full bg-radial from-yellow-500/10 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-200 h-200 rounded-full bg-radial from-yellow-500/10 via-transparent to-transparent blur-3xl" />
      </div>

      {/* MAIN CONTAINER */}
      <div className="relative z-20 grow grid grid-cols-1 md:grid-cols-2 w-full max-w-7xl mx-auto items-center gap-12 my-auto py-8">
        {/* LEFT COLUMN */}
        <div className="hidden md:flex flex-col justify-center max-w-lg gap-6">
          <div className="font-heading uppercase font-extrabold italic text-6xl flex items-center gap-0 text-[#F2FD84]">
            gym
            <span className="ml-1.5">
              <Image src={armIcon} alt="Logo" className="w-18 h-auto" />
            </span>
            <span className="text-white">etix</span>
          </div>
          <div className="space-y-3">
            <h1 className="font-heading text-5xl flex flex-col gap-1 font-extrabold uppercase tracking-tight leading-none text-white drop-shadow-md">
              Start Your <br />
              <span className="text-[#F2FD84]">Journey</span>
            </h1>
            <p className="font-body text-zinc-300 text-sm sm:text-base font-medium leading-relaxed drop-shadow-sm">
              Join a community designed to unleash your inner strength, track
              your progress, and support your evolving fitness transformation.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="relative flex justify-center items-center w-full group">
          <div className="absolute hidden md:block w-[102%] h-[110%] bg-[#e2ff3b]/10 rounded-box blur-[30px] pointer-events-none z-0 transition-all duration-500 ease-out group-hover:scale-105 group-hover:bg-[#e2ff3b]/15" />

          <div className="relative w-full max-w-md bg-zinc-950/75 backdrop-blur-xl border border-zinc-800/80 p-8 rounded-2xl space-y-5 ring-1 ring-[#e2ff3b]/5 z-10 transition-all duration-500 ease-out hover:border-[#F2FD84]/40 hover:shadow-[0_0_40px_rgba(242,253,132,0.12)] group-hover:-translate-y-1">
            <div className="space-y-1 text-center md:text-left">
              <h2 className="font-heading text-center text-3xl lg:text-4xl font-extrabold uppercase tracking-wide text-zinc-100">
                Create Account
              </h2>
            </div>

            {/* ERROR BANNER */}
            {error && (
              <div className="text-red-400 text-xs font-semibold text-center bg-red-950/40 border border-red-800/50 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="font-body text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#F2FD84] px-4 py-3 rounded-lg text-sm transition-colors outline-none text-zinc-200 placeholder-zinc-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-body text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#F2FD84] px-4 py-3 rounded-lg text-sm transition-colors outline-none text-zinc-200 placeholder-zinc-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-body text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Image URL{" "}
                  <span className="text-zinc-600 normal-case">(optional)</span>
                </label>
                <input
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#F2FD84] px-4 py-3 rounded-lg text-sm transition-colors outline-none text-zinc-200 placeholder-zinc-600"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="font-body text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Password
                  </label>
                  <Link
                    href="#"
                    className="font-body text-[11px] font-bold text-zinc-500 hover:text-[#F2FD84] uppercase tracking-wider transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#F2FD84] px-4 py-3 rounded-lg text-sm transition-colors outline-none text-zinc-200 placeholder-zinc-600"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="font-heading inline-block text-center w-full bg-[#F2FD84] text-black font-extrabold text-lg uppercase tracking-wider py-2.5 rounded-lg border border-transparent shadow-lg shadow-[#F2FD84]/10 transition-all duration-300 ease-out hover:bg-zinc-950 hover:text-[#F2FD84] hover:border-[#F2FD84]/75 hover:shadow-sm hover:shadow-[#F2FD84]/20 active:scale-[0.99] mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Account..." : "Register"}
              </button>
            </form>

            <div className="relative flex items-center justify-center py-1">
              <div className="w-full border-t border-zinc-800/60" />
              <span className="font-body absolute bg-zinc-950 px-3 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                Or
              </span>
            </div>

            {/* GOOGLE */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() =>
                  signIn.social({
                    provider: "google",
                    callbackURL: "/dashboard",
                  })
                }
                className="font-body w-full flex items-center justify-center gap-3 bg-zinc-950 border border-zinc-800 hover:bg-zinc-900 transition-colors py-3 rounded-lg text-sm font-semibold tracking-wide text-zinc-300"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.103C18.435 1.21 15.62 0 12.24 0 5.58 0 0 5.37 0 12s5.58 12 12.24 12c6.96 0 11.57-4.854 11.57-11.77 0-.795-.085-1.4-.195-1.945H12.24z"
                  />
                </svg>
                Sign up with Google
              </button>
            </div>

            <p className="font-body text-center text-xs text-zinc-500 font-bold tracking-wide pt-1">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-heading uppercase text-[#F2FD84]/95 hover:underline underline-offset-4"
              >
                Login Now
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM LINKS */}
      <div className="relative z-20 flex justify-center gap-6 text-[11px] font-bold tracking-wider uppercase text-zinc-500 pt-4 pb-2">
        <Link
          href="/"
          className="font-body hover:text-zinc-300 transition-colors"
        >
          Home
        </Link>
        <Link
          href="#"
          className="font-body hover:text-zinc-300 transition-colors"
        >
          News
        </Link>
        <Link
          href="#"
          className="font-body hover:text-zinc-300 transition-colors"
        >
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
