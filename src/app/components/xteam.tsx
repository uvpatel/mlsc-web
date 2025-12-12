"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EncryptedText } from "@/components/ui/encrypted-text";

gsap.registerPlugin(ScrollTrigger);

// Define TypeScript interfaces
interface TeamMember {
  img: string;
  name: string;
  role: string;
  year?: string;
  idx?: number;
}

interface Team {
  year: string;
  members: TeamMember[];
}

// Sample team data
const teamData: Team[] = [
  {
    year: "2023-2024",
    members: [
      { img: "https://image2url.com/images/1765549291699-45410615-dee1-4585-88a7-79597fe28488.jpeg", name: "Vraj Upadhyay", role: "Club Lead" },
      { img: "https://image2url.com/images/1765548500843-4980035a-d29b-4d76-a87b-660a04f39b84.jpeg", name: "Aastha Patel", role: "Technical Head" },
      { img: "https://image2url.com/images/1765548893608-8d596072-7662-43c2-a33f-aa897bccc9d5.jpeg", name: "Khanjan Soni", role: "Graphic Head" },
      { img: "https://image2url.com/images/1765548823460-3fdcdd53-c781-4096-ac1e-4b04e0c23c08.jpeg", name: "Het Patel", role: "Content Writer" },
      { img: "https://image2url.com/images/1765549222673-431dd338-bf45-4053-b389-ac4937a3cf45.jpeg", name: "Chirag Rathod", role: "Event Manager" },
      { img: "https://image2url.com/images/1765549523168-9af4bdeb-c1da-4eba-864d-04aefc6a2d4a.jpeg", name: "Khushi Patel", role: "Operation Manager" },
      { img: "https://image2url.com/images/1765549059616-4db8c1ad-03af-4e88-93d9-7e4989a77c43.jpeg", name: "Mahek Tolat", role: "PR Manager" },
    ],
  },
  {
    year: "2024-2025",
    members: [
      { img: "https://image2url.com/images/1765549291699-45410615-dee1-4585-88a7-79597fe28488.jpeg", name: "Vraj Upadhyay", role: "Club Lead" },
      { img: "https://image2url.com/images/1765548500843-4980035a-d29b-4d76-a87b-660a04f39b84.jpeg", name: "Aastha Patel", role: "Co-Lead" },
      { img: "https://image2url.com/images/1765548893608-8d596072-7662-43c2-a33f-aa897bccc9d5.jpeg", name: "Khanjan Soni", role: "Operation Manager" },
      { img: "https://image2url.com/images/1765549446863-3847625f-b7f5-48bb-a65c-bb621ba45e18.jpeg", name: "Aashka Shah", role: "PR Officer" },
      { img: "https://image2url.com/images/1765549523168-9af4bdeb-c1da-4eba-864d-04aefc6a2d4a.jpeg", name: "Khushi Patel", role: "Operation Manager" },
      { img: "https://image2url.com/images/1765549613574-04b93edd-d42e-4faa-94d9-27088cc3b9bd.jpeg", name: "Saniya Masih", role: "Event Manager" },
      { img: "https://image2url.com/images/1765549680035-192367fb-215e-43a3-b9cf-8fe798b26c32.jpeg", name: "Jeel Barad", role: "Tech Person" },
      { img: "https://image2url.com/images/1765549746521-6f52cf22-c2a2-4410-b807-2b8ec2463011.jpeg", name: "Pari Patel", role: "Tech Person" },
      { img: "https://image2url.com/images/1765549821780-85fd2be5-6acf-47de-9673-a8c78b062c77.jpeg", name: "Akshay Gojiya", role: "Graphic Designer" },
      { img: "https://image2url.com/images/1765549883086-473ada80-988c-4d74-829f-efb88e9c3487.jpeg", name: "Nandni Parekh", role: "Graphic Designer" },
      { img: "https://image2url.com/images/1765554604376-c71cb3da-9fa1-48da-a40f-7cbdbdf8e7d8.jpeg", name: "Diya Umretiya", role: "Content Creator" },
      { img: "https://image2url.com/images/1765548823460-3fdcdd53-c781-4096-ac1e-4b04e0c23c08.jpeg", name: "Het Patel", role: "Content Creator" },
    ],
  },
];

const Timeline: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      gsap.from(titleRef.current, {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power3.out",
      });

      // Animate timeline line
      gsap.to(timelineRef.current, {
        height: "100%",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      });

      // Animate each team card
      const cards = document.querySelectorAll(".team-card");
      cards.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 100,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });

      // Animate timeline nodes
      const nodes = document.querySelectorAll(".timeline-node");
      nodes.forEach((node) => {
        gsap.from(node, {
          scale: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: node,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleExpand = (year: string) => {
    setExpandedTeam(expandedTeam === year ? null : year);
  };

  return (
    <section ref={sectionRef} className="relative bg-black min-h-screen py-12 sm:py-16 overflow-hidden" id="PastMembers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Title */}
        <h2
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-12 sm:mb-16 md:mb-20"
        >
          <EncryptedText
              text="Our Members"
              encryptedClassName="text-white"
              revealedClassName="text-white"
              revealDelayMs={80}
              flipDelayMs={60}
            />
        </h2>

        {/* Central Timeline Line */}
        <div className="absolute left-6 md:left-1/2 top-24 sm:top-32 md:top-40 bottom-0 w-0.5 md:w-1 bg-gray-800 md:transform md:-translate-x-1/2 overflow-hidden">
          <div
            ref={timelineRef}
            className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 origin-top h-0"
          />
        </div>

        <div className="space-y-16 sm:space-y-20 md:space-y-32">
          {teamData.map((team, idx) => {
            const year = team.year.split("-")[0];
            const isExpanded = expandedTeam === team.year;
            const displayMembers = isExpanded ? team.members : team.members.slice(0, 6);

            return (
              <div
                key={idx}
                className="team-card relative pl-16 md:pl-0"
              >
                {/* Mobile Layout */}
                <div className="md:hidden">
                  <div className="flex items-center mb-6 relative">
                    {/* Timeline Node */}
                    <div
                      className="timeline-node absolute -left-16 w-10 h-10 m-[-10px] sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-black"
                      style={{
                        boxShadow: "0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.4)",
                      }}
                    >
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>

                    {/* Year */}
                    <h3 className="text-4xl sm:text-5xl font-bold text-white">
                      {year}
                    </h3>
                  </div>

                  {/* Team Card */}
                  <motion.div
                    className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-2xl border border-blue-500/20"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="text-sm sm:text-base text-blue-400 mb-4">{team.year}</h4>
                    
                    {/* Members Grid */}
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3 mb-4">
                      {displayMembers.map((member, i) => (
                        <div
                          key={i}
                          className="relative group"
                          onMouseEnter={() => setSelectedMember({ ...member, year: team.year, idx: i })}
                          onMouseLeave={() => setSelectedMember(null)}
                          onTouchStart={() => setSelectedMember({ ...member, year: team.year, idx: i })}
                        >
                          <motion.img
                            src={member.img}
                            alt={member.name}
                            className="w-full aspect-square rounded-full border-2 border-blue-500 object-cover cursor-pointer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                          />
                          <AnimatePresence>
                            {selectedMember?.year === team.year && selectedMember?.idx === i && (
                              <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 text-white p-2 sm:p-3 rounded-lg shadow-xl text-xs w-28 sm:w-32 text-center z-30 border border-blue-500/30 pointer-events-none"
                              >
                                <p className="font-semibold text-white truncate">{member.name}</p>
                                <p className="text-gray-400 text-[10px] sm:text-xs mt-1 truncate">{member.role}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>

                    {/* Expand/Collapse Button */}
                    {team.members.length > 6 && (
                      <motion.button
                        onClick={() => toggleExpand(team.year)}
                        className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2.5 sm:py-3 rounded-lg font-medium transition-colors duration-300 border border-gray-700 text-sm sm:text-base"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isExpanded ? "Show Less" : `View All ${team.members.length} Members`}
                      </motion.button>
                    )}
                  </motion.div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:flex items-center relative">
                  {/* Year */}
                  <div className="w-1/4 text-center">
                    <h3 className="text-5xl lg:text-6xl font-bold text-white">
                      {year}
                    </h3>
                  </div>

                  {/* Timeline Node */}
                  <div
                    className="timeline-node absolute left-1/2 transform -translate-x-1/2 w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-black"
                    style={{
                      boxShadow: "0 0 40px rgba(59, 130, 246, 0.8), 0 0 80px rgba(59, 130, 246, 0.4)",
                    }}
                  >
                    <svg
                      className="w-6 h-6 lg:w-7 lg:h-7"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>

                  {/* Team Card */}
                  <motion.div
                    className="w-2/4 lg:w-2/5 xl:w-1/3 ml-auto bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-2xl border border-blue-500/20"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="text-lg lg:text-xl text-blue-400 mb-6">{team.year}</h4>
                    
                    {/* Members Grid */}
                    <div className="grid grid-cols-6 gap-2 lg:gap-3 mb-6">
                      {displayMembers.map((member, i) => (
                        <div
                          key={i}
                          className="relative group"
                          onMouseEnter={() => setSelectedMember({ ...member, year: team.year, idx: i })}
                          onMouseLeave={() => setSelectedMember(null)}
                        >
                          <motion.img
                            src={member.img}
                            alt={member.name}
                            className="w-full aspect-square rounded-full border-2 border-blue-500 object-cover cursor-pointer"
                            whileHover={{ scale: 1.15, rotate: 5 }}
                            transition={{ duration: 0.3 }}
                          />
                          <AnimatePresence>
                            {selectedMember?.year === team.year && selectedMember?.idx === i && (
                              <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 text-white p-3 rounded-lg shadow-xl text-sm w-36 text-center z-30 border border-blue-500/30 pointer-events-none"
                              >
                                <p className="font-semibold text-white">{member.name}</p>
                                <p className="text-gray-400 text-xs mt-1">{member.role}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>

                    {/* Expand/Collapse Button */}
                    {team.members.length > 6 && (
                      <motion.button
                        onClick={() => toggleExpand(team.year)}
                        className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition-colors duration-300 border border-gray-700"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isExpanded ? "Show Less" : `View All ${team.members.length} Members`}
                      </motion.button>
                    )}
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;

















