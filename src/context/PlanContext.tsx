"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { IWorkout, IPlanContext } from "@/types/workout.types";
import { toast } from "react-toastify";

const PlanContext = createContext<IPlanContext | undefined>(undefined);
const MAX_DAILY_LIFTS = 5;

export const PlanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const [todayPlan, setTodayPlan] = useState<IWorkout[]>([]);
  const [savedPlan, setSavedPlan] = useState<IWorkout[]>([]);
  const [completedIds, setCompletedIds] = useState<number[]>([]);

  
  useEffect(() => {
    try {
      const storedToday = localStorage.getItem("fitlog_today_plan");
      if (storedToday) setTodayPlan(JSON.parse(storedToday));

      const storedSaved = localStorage.getItem("fitlog_saved_plan");
      if (storedSaved) setSavedPlan(JSON.parse(storedSaved));

      const storedCompleted = localStorage.getItem("fitlog_completed_ids");
      if (storedCompleted) setCompletedIds(JSON.parse(storedCompleted));
    } catch (error) {
      console.error("Failed to load plans from localStorage", error);
    }
  }, []);

  // Add to Today's Plan
  const addToTodayPlan = (workout: IWorkout): boolean => {
    const exists = todayPlan.some((item) => item.id === workout.id);
    if (exists) {
      toast.error(`"${workout.name}" is already in today's plan!`, {
        toastId: `dup-plan-${workout.id}`,
        theme: "dark",
      });
      return false;
    }

    if (todayPlan.length >= MAX_DAILY_LIFTS) {
      toast.error(`Daily limit reached! You can only add up to ${MAX_DAILY_LIFTS} lifts today.`, {
        toastId: "cap-reached",
        theme: "dark",
      });
      return false;
    }

    const updated = [...todayPlan, workout];
    setTodayPlan(updated);
    localStorage.setItem("fitlog_today_plan", JSON.stringify(updated));

    toast.success(`Added "${workout.name}" to today's plan!`, { theme: "dark" });
    return true;
  };

  // Add to Saved Plan
  const addToSavedPlan = (workout: IWorkout): boolean => {
    const exists = savedPlan.some((item) => item.id === workout.id);
    if (exists) {
      toast.error(`"${workout.name}" is already saved for later!`, {
        toastId: `dup-saved-${workout.id}`,
        theme: "dark",
      });
      return false;
    }

    const updated = [...savedPlan, workout];
    setSavedPlan(updated);
    localStorage.setItem("fitlog_saved_plan", JSON.stringify(updated));

    toast.success(`Saved "${workout.name}" for later!`, { theme: "dark" });
    return true;
  };

  // Remove from Today's Plan
  const removeFromTodayPlan = (id: number) => {
    const item = todayPlan.find((w) => w.id === id);
    const updatedToday = todayPlan.filter((w) => w.id !== id);
    const updatedCompleted = completedIds.filter((itemDoneId) => itemDoneId !== id);

    setTodayPlan(updatedToday);
    setCompletedIds(updatedCompleted);

    localStorage.setItem("fitlog_today_plan", JSON.stringify(updatedToday));
    localStorage.setItem("fitlog_completed_ids", JSON.stringify(updatedCompleted));

    toast.info(`Removed ${item ? `"${item.name}"` : "workout"} from today's plan`, {
      theme: "dark",
    });
  };

  const removeFromSavedPlan = (id: number) => {
    const item = savedPlan.find((w) => w.id === id);
    const updated = savedPlan.filter((w) => w.id !== id);

    setSavedPlan(updated);
    localStorage.setItem("fitlog_saved_plan", JSON.stringify(updated));

    toast.info(`Removed ${item ? `"${item.name}"` : "workout"} from saved`, {
      theme: "dark",
    });
  };

  // Toggle Mark as Done
  const toggleMarkDone = (id: number) => {
    let updated: number[];
    if (completedIds.includes(id)) {
      updated = completedIds.filter((doneId) => doneId !== id);
      toast.info("Marked as incomplete", { theme: "dark" });
    } else {
      updated = [...completedIds, id];
      toast.success("Workout marked as done! Great job! 🔥", { theme: "dark" });
    }

    setCompletedIds(updated);
    localStorage.setItem("fitlog_completed_ids", JSON.stringify(updated));
  };

  
  const isItemInTodayPlan = (id: number) => todayPlan.some((w) => w.id === id);
  const isItemInSavedPlan = (id: number) => savedPlan.some((w) => w.id === id);
  const isItemCompleted = (id: number) => completedIds.includes(id);

  
  const totalExercises = todayPlan.length;
  const totalMinutes = todayPlan.reduce((acc, curr) => acc + (Number(curr.duration) || 0), 0);
  const totalCalories = todayPlan.reduce((acc, curr) => acc + (Number(curr.caloriesBurned) || 0), 0);

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        savedPlan,
        completedIds,
        addToTodayPlan,
        addToSavedPlan,
        removeFromTodayPlan,
        removeFromSavedPlan,
        toggleMarkDone,
        isItemInTodayPlan,
        isItemInSavedPlan,
        isItemCompleted,
        totalExercises,
        totalMinutes,
        totalCalories,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) throw new Error("usePlan must be used within a PlanProvider");
  return context;
};