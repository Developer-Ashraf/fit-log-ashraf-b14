import React from 'react';
import HeroImage from '@/assets/banner.png'
import Image from 'next/image';
import { BsArrowDown } from 'react-icons/bs';
import { BiDumbbell } from 'react-icons/bi';

const Hero = () => {
    return (
        <section className="relative w-full rounded-3xl bg-[#101217] border border-zinc-800/70 p-6 sm:p-10 lg:p-12 mb-14 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                
                <div className="lg:col-span-7 flex flex-col items-start z-10">
                    <span className="text-[#ccff00] text-xs font-bold tracking-widest uppercase mb-3 px-2.5 py-1 rounded bg-[#ccff00]/10">
                        WORKOUT LIBRARY
                    </span>

                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-tight mb-4">
                        TRAIN WITH INTENT. <br className="hidden sm:inline" />
                        LOG EVERY SET.
                    </h1>

                    <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl mb-8">
                        FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s
                        plan, and watch the week&apos;s work add up.
                    </p>

                    <button
                        
                        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#ccff00] text-black font-bold text-sm tracking-wide uppercase hover:bg-[#b8e600] active:scale-95 transition-all shadow-lg shadow-[#ccff00]/10 cursor-pointer"
                    >
                        <BiDumbbell className="w-4 h-4 stroke-[2.5]" />
                        <span>BROWSE WORKOUTS</span>
                        <BsArrowDown className="w-4 h-4 ml-1" />
                    </button>
                </div>

                
                <div className="lg:col-span-5 flex justify-center lg:justify-end">
                    <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                        <Image
                            src={HeroImage}
                            alt="FitLog Gym Hero"
                            fill
                            className="object-contain drop-shadow-2xl rounded-2xl"
                            priority
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;