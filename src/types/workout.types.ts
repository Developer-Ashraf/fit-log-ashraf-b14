export interface IWorkout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number; 
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

export type SortCriteria = "duration" | "calories" | "rating";

export interface IPlanContext {
  todayPlan: IWorkout[];
  savedPlan: IWorkout[];
  completedIds: number[];
  addToTodayPlan: (workout: IWorkout) => boolean;
  addToSavedPlan: (workout: IWorkout) => boolean;
  removeFromTodayPlan: (id: number) => void;
  removeFromSavedPlan: (id: number) => void;
  toggleMarkDone: (id: number) => void;
  isItemInTodayPlan: (id: number) => boolean;
  isItemInSavedPlan: (id: number) => boolean;
  isItemCompleted: (id: number) => boolean;
  totalExercises: number;
  totalMinutes: number;
  totalCalories: number;
}
