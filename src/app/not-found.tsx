import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Logo from '@/assets/logo.png'

const NotFoundPage = () => {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
            <div className="w-14 h-14 rounded-2xl bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center text-[#ccff00] mb-6">
                {/* <Dumbbell className="w-7 h-7" /> */}

                <Image src={Logo} alt='Logo' />
            </div>
            <h1 className="font-display font-extrabold text-5xl sm:text-6xl text-white uppercase mb-2">
                404
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-300 uppercase mb-3">
                Page Not Found
            </h2>
            <p className="text-sm text-zinc-400 max-w-md mb-8">
                The lift or page you are looking for has been moved or doesn&apos;t exist. Return to the gym floor.
            </p>
            <Link
                href="/"
                className="px-6 py-3 rounded-xl bg-[#ccff00] text-black font-bold text-sm uppercase tracking-wide hover:bg-[#b8e600] transition active:scale-95"
            >
                Back to Library
            </Link>
        </div>
    );
};

export default NotFoundPage