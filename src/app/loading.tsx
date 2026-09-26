import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 border-4 border-[#ccff00] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-zinc-400 text-sm font-medium tracking-wide">Loading workouts...</p>
    </div>
  );
}
