import { IWorkout } from '@/types/workout.types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FiClock, FiStar } from 'react-icons/fi';
import { FaFire } from 'react-icons/fa';


interface WorkoutCardProps {
    workout: IWorkout;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
    return (
        <Link
            href={`/workout/${workout.id}`}
            className="group flex flex-col rounded-2xl bg-[#12141a] border border-zinc-800/80 overflow-hidden hover:border-[#ccff00]/60 hover:shadow-xl hover:shadow-[#ccff00]/5 transition-all duration-300"
        >
            {/* Thumbnail */}
            <div className="relative w-full aspect-video bg-zinc-900 overflow-hidden">
                <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                    {/* Category Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                        {workout.muscleGroups.map((tag: string, ind: number) => (
                            <span
                                key={ind}
                                className="px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#ccff00] text-black"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-lg text-[#ccff00] uppercase transition-colors leading-snug">
                        {workout.name}
                    </h3>

                    {/* Equipment */}
                    <p className="text-xs text-zinc-400 mt-1 mb-4 line-clamp-1">
                        {workout.equipment}
                    </p>
                </div>

                {/* Stats Row */}
                <div className="flex items-center justify-between text-xs text-zinc-400 border-t border-zinc-800/80 pt-3">
                    <div className="flex items-center gap-1.5">
                        <FiClock className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{workout.duration} min</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <FaFire className="w-3.5 h-3.5 text-orange-400" />
                        <span>{workout.caloriesBurned} kcal</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <FiStar className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span>{workout.rating}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default WorkoutCard;