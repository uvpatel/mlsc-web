"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
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
        return distance <
          Math.abs(latest - cardsBreakpoints[acc])
          ? index
          : acc;
      },
      0
    );

    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = ["#000000", "#0f172a", "#000000"];

  const linearGradients = useMemo(
    () => [
      "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
      "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
      "linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))",
    ],
    []
  );

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0]
  );

  useEffect(() => {
    setBackgroundGradient(
      linearGradients[activeCard % linearGradients.length]
    );
  }, [activeCard, linearGradients]);

  return (
    <motion.div
      ref={ref}
      animate={{
        backgroundColor:
          backgroundColors[activeCard % backgroundColors.length],
      }}
      className="relative flex h-[30rem] justify-center gap-10 overflow-y-auto rounded-2xl p-10 scrollbar-hide"
      style={{
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      {/* Left content */}
      <div className="relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-2xl font-bold text-slate-100 md:text-4xl"
              >
                {item.title}
              </motion.h2>

              <motion.p
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

      {/* Right sticky visual */}
      <motion.div
        style={{ background: backgroundGradient }}
        className={cn(
          "sticky top-10 hidden h-80 w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl lg:block",
          contentClassName
        )}
      >
        {content[activeCard]?.content ?? null}
      </motion.div>
    </motion.div>
  );
};
