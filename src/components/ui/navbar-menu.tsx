"use client";

import React from "react";
import { motion, type Transition } from "motion/react";
import Image from "next/image";

// -------------------
// Transition
// -------------------
const transition: Transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

// -------------------
// Types
// -------------------
export interface MenuItemProps {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}

export interface MenuProps {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}

export interface ProductItemProps {
  title: string;
  description: string;
  href: string;
  src: string;
}

export type HoveredLinkProps = React.ComponentProps<"a"> & {
  children: React.ReactNode;
};

// -------------------
// MenuItem Component
// -------------------
export const MenuItem = ({ setActive, active, item, children }: MenuItemProps) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-white hover:opacity-90"
      >
        {item}
      </motion.p>

      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-neutral-900 text-white backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 shadow-xl"
              >
                <motion.div layout className="w-max h-full p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

// -------------------
// Menu Wrapper
// -------------------
export const Menu = ({ setActive, children }: MenuProps) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-white/10 bg-black shadow-lg flex justify-center space-x-6 px-8 py-5"
    >
      {children}
    </nav>
  );
};

// -------------------
// ProductItem
// -------------------
export const ProductItem = ({ title, description, href, src }: ProductItemProps) => {
  return (
    <a href={href} className="flex space-x-2 hover:opacity-90 transition">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-lg font-semibold mb-1 text-white">{title}</h4>
        <p className="text-neutral-300 text-sm max-w-[10rem]">{description}</p>
      </div>
    </a>
  );
};

// -------------------
// HoveredLink
// -------------------
export const HoveredLink = ({ children, ...rest }: HoveredLinkProps) => {
  return (
    <a {...rest} className="text-neutral-300 hover:text-white transition">
      {children}
    </a>
  );
};
