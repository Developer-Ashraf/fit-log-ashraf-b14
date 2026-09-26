import WorkoutActions from '@/components/workout/WorkoutActions';
import { IWorkout } from '@/types/workout.types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';

const getSingleWorkout = async (id: string) => {
    try {
        const res = await fetch(`https://api.api-store.workers.dev/api/fitlog/${id}`, {
            cache: "no-store",
        });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error("Error fetching single workout from live API:", error)
        return null;
    }
}

interface PageProps {
    params: Promise<{ id: string }>;
}

const WorkoutDetailPage = async ({ params }:PageProps ) => {

    const { id } = await params;
  const workout: IWorkout | null = await getSingleWorkout(id);



    if (!workout) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Workout Not Found</h2>
                <p className="text-zinc-400 text-sm mb-6">The requested lift does not exist in the library.</p>
                <Link
                    href="/"
                    className="px-5 py-2.5 rounded-lg bg-[#ccff00] text-black font-semibold text-sm hover:bg-[#b8e600]"
                >
                    Back to Library
                </Link>
            </div>
        );
    }


    return (
        <div className="py-4">
            
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-6 transition"
            >
                <BsArrowLeft className="w-4 h-4" />
                <span>Back to Workouts</span>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                
                <div className="lg:col-span-6 w-full">
                    <div className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800">
                        <Image
                            src={workout.image}
                            alt={workout.name}
                            fill
                            priority
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>
                </div>

                <div className="lg:col-span-6 flex flex-col">
                    <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase text-white tracking-wide">
                        {workout.name}
                    </h1>

                    <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mt-2 mb-4">
                        {workout.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {workout.muscleGroups.map((tag: string, ind: number) => (
                            <span
                                key={ind}
                                className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[#ccff00] text-black"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="rounded-2xl bg-[#12141a] border border-zinc-800/90 overflow-hidden divide-y divide-zinc-800/70 mb-8 text-sm">
                        {[
                            ["EQUIPMENT", workout.equipment],
                            ["DIFFICULTY", workout.difficulty],
                            ["SETS", workout.sets],
                            ["REPS", workout.reps],
                            ["DURATION", `${workout.duration} min`],
                            ["CALORIES", `${workout.caloriesBurned} kcal`],
                            ["RATING", workout.rating],
                        ].map(([label, value], ind: number) => (
                            <div key={ind} className="flex items-center justify-between p-3.5 px-5">
                                <span className="text-zinc-500 font-semibold uppercase text-xs">{label}</span>
                                <span className="text-zinc-200 font-medium">{value}</span>
                            </div>
                        ))}
                    </div>

                    
                    <div className="mb-8">
                        <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white mb-3">
                            INSTRUCTIONS
                        </h3>
                        <ol className="space-y-2 text-sm text-zinc-300">
                            {workout.instructions.map((step: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                                    <span className="font-bold text-zinc-500">{idx + 1}.</span>
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>

                    
                    <WorkoutActions workout={workout} />
                </div>
            </div>
        </div>
    );
};

export default WorkoutDetailPage;