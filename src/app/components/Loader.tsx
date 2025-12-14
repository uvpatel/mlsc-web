"use client";

import { motion } from "framer-motion";

export default function Loader() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0b0f19]">

            {/* Squares */}
            <div className="relative w-32 h-32 mb-8">
                <motion.div
                    className="absolute w-14 h-14 bg-[#f25022]"
                    initial={{ scale: 0, x: -40, y: -40 }}
                    animate={{ scale: 1, x: 0, y: 0 }}
                    transition={{ delay: 0.1, type: "spring" }}
                />
                <motion.div
                    className="absolute w-14 h-14 bg-[#7fba00] right-0"
                    initial={{ scale: 0, x: 40, y: -40 }}
                    animate={{ scale: 1, x: 0, y: 0 }}
                    transition={{ delay: 0.2, type: "spring" }}
                />
                <motion.div
                    className="absolute w-14 h-14 bg-[#00a4ef] bottom-0"
                    initial={{ scale: 0, x: -40, y: 40 }}
                    animate={{ scale: 1, x: 0, y: 0 }}
                    transition={{ delay: 0.3, type: "spring" }}
                />
                <motion.div
                    className="absolute w-14 h-14 bg-[#ffb900] bottom-0 right-0"
                    initial={{ scale: 0, x: 40, y: 40 }}
                    animate={{ scale: 1, x: 0, y: 0 }}
                    transition={{ delay: 0.4, type: "spring" }}
                />
            </div>

            {/* MLSC Text */}
            <motion.h1
                className="text-3xl md:text-4xl font-semibold tracking-wider text-gray-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                MLSC
            </motion.h1>

            {/* Subtitle */}
            <motion.p
                className="mt-2 text-sm tracking-[0.3em] text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
            >
                BVM
            </motion.p>
        </div>
    );
}
