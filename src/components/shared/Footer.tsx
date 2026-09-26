import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Logo from "@/assets/logo.png"

const Footer = () => {
    return (
       <footer className="w-full bg-[#090a0d] border-t border-zinc-800/60 py-6 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: Brand */}
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src={Logo}
            alt="fit-log"
            />
          <span className="font-display font-extrabold text-base tracking-wider text-white">
            FITLOG
          </span>
        </Link>

        {/* Right: Copyright */}
        <p className="text-xs sm:text-sm text-zinc-500 text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
    );
};

export default Footer;