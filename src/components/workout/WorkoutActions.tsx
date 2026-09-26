"use client";

import React from "react";
import { CalendarPlus, Bookmark, Check } from "lucide-react";
import { IWorkout } from "@/types/workout.types";
import { usePlan } from "@/context/PlanContext";

interface WorkoutActionsProps {
  workout: IWorkout;
}

const WorkoutActions = ({ workout }: WorkoutActionsProps ) => {
  const { addToTodayPlan, addToSavedPlan, isItemInTodayPlan, isItemInSavedPlan } = usePlan();

  const inPlan = isItemInTodayPlan(workout.id);
  const inSaved = isItemInSavedPlan(workout.id);

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      
      <button
        onClick={() => addToTodayPlan(workout)}
        className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wide transition-all shadow-md cursor-pointer ${
          inPlan
            ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700/80"
            : "bg-[#ccff00] text-black hover:bg-[#b8e600] active:scale-95 shadow-[#ccff00]/10"
        }`}
      >
        {inPlan ? <Check className="w-4 h-4 stroke-[3]" /> : <CalendarPlus className="w-4 h-4 stroke-[2.5]" />}
        <span>{inPlan ? "In Today's Plan" : "Add to today's plan"}</span>
      </button>

      <button
        onClick={() => addToSavedPlan(workout)}
        className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wide border transition-all cursor-pointer ${
          inSaved
            ? "bg-zinc-800/80 border-zinc-700 text-zinc-400 hover:bg-zinc-700/80"
            : "bg-[#181a20] border-zinc-700 text-white hover:bg-zinc-800 hover:border-zinc-600 active:scale-95"
        }`}
      >
        {inSaved ? <Check className="w-4 h-4 stroke-[3]" /> : <Bookmark className="w-4 h-4 stroke-[2.5]" />}
        <span>{inSaved ? "Saved for later" : "Save for later"}</span>
      </button>
    </div>
  );
};

export default WorkoutActions;
