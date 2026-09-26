import Hero from '@/components/home/Hero';
import WorkoutCard from '@/components/shared/WorkoutCard';
import { IWorkout } from '@/types/workout.types';
import React from 'react';




const getWorkouts = async (): Promise<IWorkout[]> => {
  try{
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      cache: "no-store",
    });
    if(!res.ok) throw new Error("Failed to fetch workouts from live API");
    return res.json();
  }catch (error){
    console.error("Error fetching workouts from live API:", error);
    return [];
  }
};

const HomePage = async () => {

const workoutData: IWorkout[] = await getWorkouts();

  return (
    <div className="w-full">
      {/* <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        
      </main> */}
      <Hero></Hero>


      <section id="library" className="scroll-mt-24 pt-4">
        <div className="mb-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white tracking-wide">
            THE LIBRARY
          </h2>
          <p className="text-sm text-zinc-400 mt-1">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        
        {workoutData.length === 0 ? (
          <div className="text-center py-16 text-zinc-500">
            No workouts found. Please check connection.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workoutData.map((workout: IWorkout, ind: number) => (
              <WorkoutCard key={workout.id || ind} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;