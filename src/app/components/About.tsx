"use client";
import React from "react"
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal"
import { motion } from "framer-motion";
import { EncryptedText } from "@/components/ui/encrypted-text";
import Image from "next/image";

const content = [
    {
        title: "Who We Are",
        description: "The Microsoft Learning Club (MLSC) is a vibrant community dedicated to fostering learning and growth in technology and innovation. We offer a range of activities including workshops, seminars, and networking events.",
        content: (
            <div className="relative h-full w-full overflow-hidden rounded-xl">
                <Image
                    src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop"
                    alt="Students collaborating at a college hackathon event"
                    className="h-full w-full object-cover"
                    width={100}
                    height={100}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-3xl font-bold text-white drop-shadow-2xl">
                    Hackathons
                </div>
            </div>
        ),
    },
    {
        title: "Our Mission",
        description: "Our mission is to provide a platform for learning and collaboration, encouraging members to stay updated with the latest technological trends and advancements.",
        content: (
            <div
                id="mission"
                className="relative h-full w-full overflow-hidden rounded-xl">
                <Image
                    src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop"
                    alt="Students collaborating at a college hackathon event"
                    className="h-full w-full object-cover"
                    width={100}
                    height={100}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f52ba] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 text-3xl font-bold text-white drop-shadow-2xl">
                    Open Source
                </div>
            </div>
        ),
    },
    {
        title: "Our Vision",
        description: "We envision a community where technology enthusiasts can collaborate, innovate, and inspire each other to achieve personal and professional growth.",
        content: (
            <div className="relative h-full w-full overflow-hidden rounded-xl">
                <Image
                    src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop"
                    alt="Students collaborating at a college hackathon event"
                    className="h-full w-full object-cover"
                    width={100}
                    height={100}                 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-6 left-6 text-3xl font-bold text-cyan-300 drop-shadow-2xl">
                    Community
                </div>
            </div>
        ),
    },
    {
        title: "Get Involved",
        description: "Join us to participate in exciting events, connect with experts, and enhance your skills. Be part of a community that's passionate about technology and learning.",
        content: (
            <div className="relative h-full w-full overflow-hidden rounded-xl bg-black">
                <Image
                    src="https://images.unsplash.com/photo-1517180102446-f3ece451e9d7?w=800&h=600&fit=crop"
                    alt="Students getting involved in college coding club activities"
                    className="h-full w-full object-cover opacity-70"
                    width={100}
                    height={100}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/50 to-black" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-5xl font-black text-white [text-shadow:0_0_40px_#00d4ff,0_0_80px_#00d4ff]">
                        Join Us
                    </h3>
                </div>
            </div>
        ),
    },
];
export function About() {
    return (

        <div className="bg-black relative" id="about">
            <motion.h2
                className="text-4xl md:text-5xl font-bold text-white text-center "
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <EncryptedText
                    text="About Us"
                    encryptedClassName="text-white"
                    revealedClassName="text-white"
                    revealDelayMs={80}
                    flipDelayMs={60}
                />
            </motion.h2>
            <StickyScroll content={content} />
        </div>
    );
}