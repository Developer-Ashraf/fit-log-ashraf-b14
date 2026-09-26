"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star, Check, X, ChevronDown } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import { SortCriteria, IWorkout } from "@/types/workout.types";
import EmptyState from "@/components/my-plan/EmptyState";

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
  const [sortBy, setSortBy] = useState<SortCriteria>("duration");

  const {
    todayPlan = [],
    savedPlan = [],
    completedIds = [],
    removeFromTodayPlan,
    removeFromSavedPlan,
    toggleMarkDone,
  } = usePlan();

  
  const currentList = activeTab === "today" ? todayPlan : savedPlan;

  
  const currentExercises = currentList.length;
  const currentMinutes = currentList.reduce(
    (acc, curr) => acc + (Number(curr.duration) || 0),
    0
  );
  const currentCalories = currentList.reduce(
    (acc, curr) => acc + (Number(curr.caloriesBurned) || 0),
    0
  );

  
  const sortedWorkouts = [...currentList].sort((a: IWorkout, b: IWorkout) => {
    if (sortBy === "duration") return (b.duration || 0) - (a.duration || 0);
    if (sortBy === "calories") return (b.caloriesBurned || 0) - (a.caloriesBurned || 0);
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  return (
    
    <div className="py-6 max-w-6xl mx-auto px-4" suppressHydrationWarning>
      
      <div className="mb-6">
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-wide">
          MY PLAN
        </h1>
        <p className="text-zinc-400 text-sm mt-1">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      
      <div className="w-full rounded-2xl bg-[#12141a] border border-zinc-800/80 p-5 sm:p-7 mb-8">
        <div className="grid grid-cols-3 gap-4 text-left">
          <div>
            <span className="text-xs sm:text-sm text-zinc-400 font-medium block mb-1">
              Exercises
            </span>
            <span className="font-display text-3xl sm:text-4xl font-extrabold text-[#ccff00]">
              {currentExercises}
            </span>
          </div>

          <div>
            <span className="text-xs sm:text-sm text-zinc-400 font-medium block mb-1">
              Minutes
            </span>
            <span className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              {currentMinutes}
            </span>
          </div>

          <div>
            <span className="text-xs sm:text-sm text-zinc-400 font-medium block mb-1">
              Calories
            </span>
            <span className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              {currentCalories}
            </span>
          </div>
        </div>
      </div>

      
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
        
        <div className="inline-flex p-1 rounded-xl bg-[#15171e] border border-zinc-800 w-fit">
          <button
            type="button"
            onClick={() => setActiveTab("today")}
            className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "today"
                ? "bg-[#252833] text-white shadow"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "saved"
                ? "bg-[#252833] text-white shadow"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        
        <div className="flex items-center justify-end gap-2 text-sm text-zinc-400">
          <span className="text-xs text-zinc-400">Sort By</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortCriteria)}
              aria-label="Sort workouts by"
              className="appearance-none bg-[#15171e] border border-zinc-800 text-white text-xs sm:text-sm rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:border-[#ccff00] cursor-pointer"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      
      {sortedWorkouts.length === 0 ? (
        <EmptyState tab={activeTab} />
      ) : (
        <div className="space-y-4">
          {sortedWorkouts.map((workout: IWorkout) => {
            const isDone = completedIds.includes(workout.id);

            return (
              <div
                key={workout.id}
                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 rounded-2xl border transition-all gap-4 ${
                  isDone
                    ? "bg-[#101217]/60 border-emerald-950/60 opacity-80"
                    : "bg-[#12141a] border-zinc-800/80 hover:border-zinc-700"
                }`}
              >
              
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative w-20 h-16 sm:w-28 sm:h-20 rounded-xl overflow-hidden bg-zinc-900 shrink-0">
                    <Image
                      src={workout.image}
                      alt={workout.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h3
                      className={`font-display font-bold text-base sm:text-lg uppercase ${
                        isDone ? "line-through text-zinc-400" : "text-white"
                      }`}
                    >
                      {workout.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mb-2">
                      {workout.equipment}
                    </p>

                    
                    <div className="flex items-center gap-4 text-xs text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-zinc-500" />
                        {workout.duration} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-orange-400" />
                        {workout.caloriesBurned} kcal
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        {workout.rating}
                      </span>
                    </div>
                  </div>
                </div>

                
                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800/60">
                  <Link
                    href={`/workout/${workout.id}`}
                    className="px-4 py-2 rounded-lg border border-zinc-700 hover:border-zinc-500 text-xs font-medium text-white transition hover:bg-zinc-800"
                  >
                    View Details
                  </Link>

                  
                  {activeTab === "today" && (
                    <button
                      type="button"
                      onClick={() => toggleMarkDone(workout.id)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                        isDone
                          ? "bg-emerald-600 text-white hover:bg-emerald-700"
                          : "bg-[#ccff00] text-black hover:bg-[#b8e600] active:scale-95"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>{isDone ? "Done" : "Mark as Done"}</span>
                    </button>
                  )}

                  
                  <button
                    type="button"
                    onClick={() => {
                      if (activeTab === "today") {
                        removeFromTodayPlan(workout.id);
                      } else {
                        removeFromSavedPlan(workout.id);
                      }
                    }}
                    title="Remove lift"
                    aria-label={`Remove ${workout.name} from plan`}
                    className="p-2 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-zinc-800/60 transition cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}