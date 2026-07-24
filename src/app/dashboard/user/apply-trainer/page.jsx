"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  UserCheck,
  Award,
  Briefcase,
  Send,
  FileText,
  Phone,
} from "lucide-react";
import { submitTrainerApplication } from "./actions";

export default function ApplyTrainerPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const session = auth.api.getSession({ headers: headers() });
  if (!session || !session.user) {
    redirect("/login");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);

    const result = await submitTrainerApplication(formData);

    if (result.success) {
      router.push("/dashboard/user");
      router.refresh();
    } else {
      setErrorMessage(result.error || "Something went wrong.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-white/8 pb-6">
        <h1 className="text-xl sm:text-2xl font-heading font-extrabold uppercase tracking-wide text-white flex items-center gap-3">
          <UserCheck className="w-6 h-6 sm:w-7 sm:h-7 text-[#F2FD84]" />
          Apply as a Fitness Trainer
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Share your professional experience and core specialty to join the
          GYMETIX trainer lineup.
        </p>
      </div>

      {errorMessage && (
        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-400 text-xs">
          {errorMessage}
        </div>
      )}

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#1a1a1a] border border-white/8 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl"
      >
        {/* Experience Field */}
        <div className="space-y-2">
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-gray-300">
            Experience (in Years)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
              <Briefcase className="w-4 h-4" />
            </span>
            <input
              name="experience"
              type="number"
              min="0"
              max="50"
              required
              placeholder="e.g. 3"
              className="w-full bg-[#141414] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#F2FD84] transition-colors"
            />
          </div>
        </div>

        {/* Primary Specialty Field  */}
        <div className="space-y-2">
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-gray-300">
            Primary Specialty
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
              <Award className="w-4 h-4" />
            </span>
            <input
              name="specialty"
              type="text"
              required
              placeholder="e.g. CrossFit & Powerlifting"
              className="w-full bg-[#141414] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#F2FD84] transition-colors"
            />
          </div>
        </div>

        {/*  Phone Number */}
        <div className="space-y-2">
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-gray-300">
            Phone Number
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
              <Phone className="w-4 h-4" />
            </span>
            <input
              name="phone"
              type="tel"
              required
              placeholder="e.g. +1 (555) 019-2834"
              className="w-full bg-[#141414] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#F2FD84] transition-colors"
            />
          </div>
        </div>

        {/*  Bio */}
        <div className="space-y-2">
          <label className="block text-xs font-heading font-bold uppercase tracking-wider text-gray-300">
            Professional Bio / Summary
          </label>
          <div className="relative">
            <span className="absolute top-3 left-0 pl-4 flex items-start pointer-events-none text-gray-500">
              <FileText className="w-4 h-4" />
            </span>
            <textarea
              name="bio"
              rows="4"
              required
              placeholder="Tell us a little bit about your training philosophy and background..."
              className="w-full bg-[#141414] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#F2FD84] transition-colors resize-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#F2FD84] hover:bg-[#d8e370] text-[#141414] font-heading font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? "Submitting Application..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
}
