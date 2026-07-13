"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam === "account_not_linked") {
      toast.error(
        "This email is already associated with a password account. Please log in with email and password first.",
      );
    }

    return () => {
      toast.dismiss();
    };
  }, [searchParams]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn.email({
        email: form.email,
        password: form.password,
      });

      if (res?.error) {
        toast.error(res.error.message || "Failed to log in.");
        setLoading(false);
        return;
      }

      toast.success(" Redirecting...");
      setLoading(false);
      router.push(callbackUrl);
      router.refresh();
    } catch (err) {
      toast.error(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const absoluteCallbackUrl = `${window.location.origin}${callbackUrl}`;

      const res = await signIn.social({
        provider: "google",
        callbackURL: absoluteCallbackUrl,
        errorCallbackURL: `${window.location.origin}/login?error=account_not_linked`,
      });

      if (res?.error) {
        toast.error(res.error.message || "Failed to log in with Google.");
      }
    } catch (err) {
      toast.error(
        err.message || "An error occurred during Google authentication.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-md bg-zinc-950/75 backdrop-blur-xl border border-zinc-800/80 p-8 rounded-2xl space-y-5 ring-1 ring-[#e2ff3b]/5 z-10 transition-all duration-500 hover:border-[#F2FD84]/40 hover:shadow-[0_0_40px_rgba(242,253,132,0.12)] group-hover:-translate-y-1">
      <h2 className="font-heading text-center text-3xl lg:text-4xl font-extrabold uppercase tracking-wide text-zinc-100">
        Login
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
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
            placeholder="Your password"
            required
            className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#F2FD84] px-4 py-3 rounded-lg text-sm transition-colors outline-none text-zinc-200 placeholder-zinc-600"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="font-heading w-full bg-[#F2FD84] text-black font-extrabold text-lg uppercase tracking-wider py-2.5 rounded-lg border border-transparent shadow-lg shadow-[#F2FD84]/10 transition-all duration-300 hover:bg-zinc-950 hover:text-[#F2FD84] hover:border-[#F2FD84]/75 active:scale-[0.99] mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging In..." : "Login"}
        </button>
      </form>

      <div className="relative flex items-center justify-center py-1">
        <div className="w-full border-t border-zinc-800/60" />
        <span className="font-body absolute bg-zinc-950 px-3 text-xs font-bold text-zinc-500 uppercase tracking-widest">
          Or
        </span>
      </div>

      {/* GOOGLE BUTTON */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="font-body w-full flex items-center justify-center gap-3 bg-zinc-950 border border-zinc-800 hover:bg-zinc-900 transition-colors py-3 rounded-lg text-sm font-semibold tracking-wide text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#EA4335"
            d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.103C18.435 1.21 15.62 0 12.24 0 5.58 0 0 5.37 0 12s5.58 12 12.24 12c6.96 0 11.57-4.854 11.57-11.77 0-.795-.085-1.4-.195-1.945H12.24z"
          />
        </svg>
        {loading ? "Connecting..." : "Sign in with Google"}
      </button>

      <p className="font-body text-center text-xs text-zinc-500 font-bold tracking-wide pt-1">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-heading uppercase text-[#F2FD84]/95 hover:underline underline-offset-4"
        >
          Register Now
        </Link>
      </p>
    </div>
  );
}
