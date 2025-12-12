"use client";

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { motion } from "framer-motion";
import { EncryptedText } from "@/components/ui/encrypted-text"
export default function Team() {
  const testimonials = [
    {
      quote:
        "Leading with vision, learning with purpose, and empowering others to explore the limitless world of technology.",
      name: "Prof. Priyank Bhojak",
      designation: "Faculty Advisor",
      src: "https://image2url.com/images/1765564657314-0fdc56bd-92b8-4813-b3d3-fadec0faf627.png",
    },
    {
      quote:
        "What you can do is more important than your IQ.",
      name: "Vraj Upadhyay",
      designation: "Mentor",
      src: "https://image2url.com/images/1765564929713-4a742168-86ad-4b32-a58a-c9dc85c48fec.png",
    },
    {
      quote:
        "Leading with vision, learning with purpose, and empowering others to explore the limitless world of technology.",
      name: "Shreya Mevada",
      designation: "Club Lead",
      src: "https://image2url.com/images/1762016725159-371df7e5-8f19-4a89-b251-4aa7f1626513.jpg",
    },
    {
      quote:
        "Crafting purpose from curiosity and turning ideas into impact.",
      name: "Parv Luhar",
      designation: "Club Co-Lead",
      src: "https://image2url.com/images/1765536578242-083dde5b-2f9b-44cc-8b8e-f945ee4bc2d6.jpeg",
    },
    {
      quote:
        "Where creativity meets flawless execution.",
      name: "Tanisha Patel",
      designation: "Event Manager",
      src: "https://image2url.com/images/1765560793186-d16c0f3a-438f-497f-a2c0-cd94c5381370.png",
    },
    {
      quote:
        "Designing experiences that connect people, spark ideas, and build community.",
      name: "Rudra Gohel",
      designation: "Event Manager",
      src: "https://image2url.com/images/1765536756234-ea6b154d-c393-45f4-8ac9-ff16938e602b.jpeg",
    },
    {
      quote:
        "Designing stories that speak louder than words.",
      name: "Tanvi Joshi",
      designation: "Graphics Lead",
      src: "https://image2url.com/images/1765536986681-908fd77b-79b9-4c21-ad4b-c8f230019216.jpeg",
    },
    {
      quote:
        "Graphics are the bridge between imagination and reality—they turn thoughts into visuals that anyone can understand.",
      name: "Rohit Gohil",
      designation: "Graphics Co-Lead",
      src: "https://image2url.com/images/1765555851931-d09b1258-1efd-4214-b663-74f19f0f55bf.png",
    },
    {
      quote:
        "Transforming fleeting thoughts into timeless narratives.",
      name: "Jeet Vasoya",
      designation: "Content Lead",
      src: "https://image2url.com/images/1765536193481-7447dccd-b255-4d95-b2a9-89edf494d364.jpeg",
    },
    {
      quote:
        "Turning ideas into stories, and stories into impact - that's what content is all about",
      name: "Arpita Sonagra",
      designation: "Content Associate",
      src: "https://image2url.com/images/1762056984478-cfa2e4ef-7c79-42dc-a35d-5cf9efd34975.jpeg",
    },
    {
      quote:
        "I don’t just write code — I design systems that think, scale, and evolve.Every function I create is a decision, every architecture a strategy, and every bug a puzzle waiting to be understood. Technology is my language, logic is my mindset, and building is my instinct.",
      name: "Urvil Patel",
      designation: "Tech Lead",
      src: "https://image2url.com/images/1765557240836-08f38755-895f-42cf-8e86-f326881aa400.jpeg",
    },
    {
      quote:
        "Translating code into practical help and confusion to clarity.",
      name: "Prisha Mathakiya",
      designation: "Tech associate",
      src: "https://image2url.com/images/1765557661391-0a2d076e-66b7-47c4-bf7b-2d206d353156.png",
    },
    {
      quote:
        "Great technology deserves great storytelling. At MLSC, my mission is to bridge ideas, people, and possibilities through powerful communication.",
      name: "Hitesh Prajapati",
      designation: "PR Manager",
      src: "https://image2url.com/images/1765558181806-3c61290d-6f91-4348-bbb1-116fbd047107.png",
    },
    {
      quote:
        "Every error teaches patience, every solution builds confidence and every new concept expands what 's possible.",
      name: "Tailor Maitry",
      designation: "PR Manager",
      src: "https://image2url.com/images/1762154427216-ce765290-8c7c-43a7-a252-f445b57ff51b.jpg",
    },
    {
      quote:
        "Learning tech today to shape tomorrow.",
      name: "Tanisha Patel",
      designation: "Team Member",
      src: "https://image2url.com/images/1762232589628-6eda7e74-d3e0-46c1-a9af-20e317975c61.jpeg",
    },
    {
      quote:
        "A great team turns challenges into opportunities.",
      name: "Hiya Patel",
      designation: "Team Member",
      src: "https://image2url.com/images/1762356399106-95f31021-b7a7-47b7-8695-abd377b7d518.jpeg",
    },

    
  ];

  return (
    <section className="bg-black py-20" id="team">
      {/* Animated Title */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-white text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <EncryptedText
          text="Our Team"
          encryptedClassName="text-white"
          revealedClassName="text-white"
          revealDelayMs={80}
          flipDelayMs={60}
        />
      </motion.h2>
      <h2 className="text-6xl font-bold text-center mb-20">

      </h2>


      {/* Testimonials */}
      <AnimatedTestimonials testimonials={testimonials} />
    </section>
  );
}
