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
                    src="/team.jpg"
                    alt="Students collaborating at a college hackathon event"
                    className="h-full w-full object-cover"
                    width={1920}
                    height={1080}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-3xl font-bold text-white drop-shadow-2xl">
                    Team
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
                    src="/Event.jpg"
                    alt="Students collaborating at a college hackathon event"
                    className="h-full w-full object-cover"
                    width={1920}
                    height={1080}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f52ba] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 text-3xl font-bold text-white drop-shadow-2xl">
                    Workshops
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
                    src="/xteam.jpg"
                    alt="Students collaborating at a college hackathon event"
                    className="h-full w-full object-cover"
                    width={1920}
                    height={1080}
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
                    src="/xteam.jpg"
                    alt="Group of Microsoft Learn Student Ambassadors excited and ready to get involved"
                    className="h-full w-full object-cover opacity-70"
                    fill
                    sizes="100vw"
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
        <section
            id="about"
            className="relative w-full overflow-hidden bg-black"
        >
            {/* unified background */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-[#020617] to-black" />

            {/* Header */}
            <div className="relative z-10 pt-24 pb-12">
                <motion.h2
                    className="text-4xl md:text-5xl font-bold text-white text-center"
                    initial={{ opacity: 0, y: -40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <EncryptedText
                        text="About Us"
                        encryptedClassName="text-blue-500 "
                        revealedClassName="text-blue-500 "
                    />
                </motion.h2>

                
            </div>

            {/* Sticky Scroll wrapper */}
            <div className="relative z-10 bg-transparent">
                <StickyScroll content={content} />
            </div>
        </section>

    );

}