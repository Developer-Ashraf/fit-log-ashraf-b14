"use client";

import Link from "next/link";
import Logo from "@/assets/logo.png"
import Image from "next/image";
import { usePathname } from "next/navigation";

import { usePlan } from "@/context/PlanContext";

const Navbar: React.FC = () => {
    const pathname = usePathname();
  const { todayPlan, savedPlan } = usePlan(); // custom hook

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0c0d10]/95 backdrop-blur-md border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-black transition-transform group-hover:rotate-12 relative">
           
            <Image 
            src={Logo}
            alt="fit-log"
            className="object-contain"
            />

           
          </div>
          <span className="font-display font-extrabold text-lg sm:text-xl tracking-wider text-white">
            FITLOG
          </span>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/" className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              pathname === "/"
                ? "bg-zinc-800 text-[#ccff00] font-semibold"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/40"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              pathname === "/my-plan"
                ? "bg-zinc-800 text-[#ccff00] font-semibold"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/40"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right: Counter Badges (Both link to /my-plan) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Plan Badge (Filled Pill) */}
          <Link
            href="/my-plan"
            className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-medium text-zinc-300 hover:text-white transition group"
          >
            <span className="hidden md:inline">Plan</span>
            <span className="min-w-5 h-5 px-1.5 rounded-full bg-[#ccff00] text-black font-bold text-xs flex items-center justify-center transition-transform group-hover:scale-110">
              {todayPlan.length}
            </span>
          </Link>

          {/* Saved Badge (Outline Pill) */}
          <Link
            href="/my-plan"
            className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-medium text-zinc-300 hover:text-white transition group"
          >
            <span className="hidden md:inline">Saved</span>
            <span className="min-w-5 h-5 px-1.5 rounded-full border border-zinc-600 text-zinc-300 font-medium text-xs flex items-center justify-center transition-all group-hover:border-zinc-400 group-hover:text-white">
              {savedPlan.length}
            </span>
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Navbar;