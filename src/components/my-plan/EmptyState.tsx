import React from "react";
import Link from "next/link";

interface EmptyStateProps {
  tab: "today" | "saved";
}

const EmptyState: React.FC<EmptyStateProps> = ({ tab }) => {
  return (
    <div className="w-full rounded-2xl border border-dashed border-zinc-800 bg-[#0f1115]/50 py-16 px-4 flex flex-col items-center justify-center text-center">
      <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white uppercase tracking-wider mb-2">
        NOTHING HERE YET
      </h3>
      <p className="text-zinc-400 text-sm max-w-sm mb-6">
        {tab === "today"
          ? "Browse the library and add a lift to get today moving."
          : "You haven't saved any lifts for later yet. Bookmark workouts to revisit them anytime."}
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-lg bg-[#ccff00] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#b8e600] transition active:scale-95"
      >
        Go to workouts
      </Link>
    </div>
  );
};

export default EmptyState;
