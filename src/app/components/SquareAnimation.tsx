"use client";

import { motion } from "framer-motion";

const SquareAnimation = () => {
    const size = "w-16 h-16 md:w-20 md:h-20";

    return (
        <div className="relative w-36 h-36 md:w-40 md:h-40">
            {/* Red */}
            <motion.div
                className={`absolute ${size} bg-[#f25022]`}
                initial={{ y: -120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 140, damping: 20, delay: 0.2 }}
            />

            {/* Green */}
            <motion.div
                className={`absolute ${size} bg-[#7fba00] right-0`}
                initial={{ y: -120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 140, damping: 20, delay: 0.3 }}
            />

            {/* Blue */}
            <motion.div
                className={`absolute ${size} bg-[#00a4ef] bottom-0`}
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 140, damping: 20, delay: 0.4 }}
            />

            {/* Yellow */}
            <motion.div
                className={`absolute ${size} bg-[#ffb900] bottom-0 right-0`}
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 140, damping: 20, delay: 0.5 }}
            />
        </div>
    );
};

export default SquareAnimation;
