"use client";

import Image from 'next/image';
import DarkVeil from '../components/ui/DarkVeil';
import NavbarLayer from './Navbar';

export default function Hero() {
  return (
    <div id='Hero'
    className="w-full min-h-[600px] md:min-h-[700px] relative bg-gradient-to-r from-blue-800 via-indigo-900 to-black flex items-center justify-center overflow-hidden pt-16 md:pt-0">
      <NavbarLayer/>
      {/* Dark overlay */}
      <DarkVeil />

      {/* Hero Content */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 md:px-16 gap-4 sm:gap-6 md:gap-12 text-center md:text-left">

        {/* MLSC Logo */}
        <Image
          src="/mlsclogo.png"
          alt="MLSC Logo"
          width={500}
          height={500}
          loading="eager"
          className="w-full max-w-sm h-auto object-contain"
        />


        {/* Text + MLSA Logo */}
        <div className="flex flex-col items-center md:items-start gap-2 sm:gap-3 md:gap-4">
          <h1 className="text-white text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold leading-snug sm:leading-tight md:leading-tight animate-fadeIn delay-200">
            Microsoft Learn Student Club
          </h1>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-2xl max-w-xs sm:max-w-sm md:max-w-md animate-fadeIn delay-400">
            Empowering Students with Technology & Innovation
          </p>

          {/* MLSA Logo */}

        </div>
      </div>

      {/* Optional animated background shapes */}
      <div className="absolute w-full h-full top-0 left-0 pointer-events-none">
        <div className="absolute rounded-full w-32 h-32 sm:w-40 sm:h-40 bg-blue-600 opacity-20 top-6 left-2 animate-pulse-slow"></div>
        <div className="absolute rounded-full w-56 h-56 sm:w-72 sm:h-72 bg-purple-600 opacity-20 bottom-0 right-2 sm:right-4 animate-pulse-slow"></div>
      </div>
    </div>
  );
}
