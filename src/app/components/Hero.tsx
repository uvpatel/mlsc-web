"use client";

import Image from "next/image";
import DarkVeil from "../components/ui/DarkVeil";
import NavbarLayer from "./Navbar";

export default function Hero() {
  return (
    <section
      id="Hero"
      className="relative min-h-screen w-full overflow-hidden bg-black"
    >
      {/* Navbar */}
      <NavbarLayer />

      {/* WebGL Background */}
      <div className="absolute inset-0 z-0">
        <DarkVeil
          noiseIntensity={0.025}
          scanlineIntensity={0.08}
          scanlineFrequency={1.2}
          warpAmount={0.12}
        />
      </div>

      {/* Readability Overlay */}
      <div className="absolute inset-0 bg-black/65 z-10" />

      {/* HERO CONTENT */}
      <div className="relative z-20 flex min-h-screen items-center justify-center px-6 md:px-16">
        <div className="grid max-w-7xl grid-cols-1 md:grid-cols-2 items-center gap-10">

          {/* LEFT — LOGO */}
          <div className="flex justify-center md:justify-start">
            <Image
              src="/mlsclogo.png"
              alt="MLSC BVM Logo"
              width={420}
              height={420}
              priority
              className="w-56 sm:w-64 md:w-72 lg:w-80 object-contain 
                          drop-shadow-[0_0_35px_rgba(59,130,246,0.25)]"
            />
          </div>

          {/* RIGHT — TEXT */}
          <div className="text-center md:text-left">
            <h1 className="text-white font-extrabold leading-tight
                           text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              Microsoft Learn
              <br />
              <span className="text-blue-400">Student Club</span>
            </h1>

            <p className="mt-4 text-gray-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto md:mx-0">
              A student-led technical community at BVM Engineering College,
              focused on learning, collaboration, and real-world innovation.
            </p>

            {/* Divider */}
            <div className="mt-6 h-px w-24 bg-blue-500/40 mx-auto md:mx-0" />

            {/* College Name */}
            <p className="mt-4 text-xs tracking-[0.3em] text-gray-400 uppercase">
              BVM Engineering College
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
