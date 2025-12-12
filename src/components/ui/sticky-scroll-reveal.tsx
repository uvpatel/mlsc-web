"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);

    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );

    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = ["#000000", "#0f172a", "#171717"];

  const linearGradients = [
    "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
    "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
    "linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))",
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0]
  );

  // ✅ FIX: include linearGradients in dependency list
  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard, linearGradients]);

  return (
    <motion.div
      animate={{
        backgroundColor:
          backgroundColors[activeCard % backgroundColors.length],
      }}
      className="relative flex h-[30rem] justify-center gap-10 overflow-y-auto rounded-2xl p-10 scrollbar-hide"
      ref={ref}
      style={{
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Left: Text */}
      <div className="relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-2xl font-bold text-slate-100 md:text-4xl"
              >
                {item.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="mt-6 max-w-lg text-base text-slate-300 md:text-lg"
              >
                {item.description}
              </motion.p>
            </div>
          ))}

          <div className="h-40" />
        </div>
      </div>

      {/* Right: Sticky Visual */}
      <motion.div
        style={{ background: backgroundGradient }}
        className={cn(
          "sticky top-10 hidden h-80 w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl lg:block",
          contentClassName
        )}
      >
        {content[activeCard]?.content || null}
      </motion.div>
    </motion.div>
  );
};
