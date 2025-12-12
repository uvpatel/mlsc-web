"use client";
import React, { useState } from "react";
import { motion, type Transition } from "framer-motion";
import { Menu, X } from "lucide-react";

const transition: Transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

const MenuItem = ({
  setActive,
  active,
  item,
  children,
  isMobile,
}: {
  setActive: (item: string | null) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
  isMobile?: boolean;
}) => {
  const handleClick = () => {
    if (isMobile) {
      setActive(active === item ? null : item);
    }
  };

  return (
    <div
      onMouseEnter={!isMobile ? () => setActive(item) : undefined}
      onClick={handleClick}
      className="relative"
    >
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-white hover:opacity-90 py-2"
      >
        {item}
      </motion.p>

      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: isMobile ? 0 : 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className={isMobile ? "pl-4 mt-2" : "absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4"}>
              <motion.div
                transition={transition}
                layoutId={isMobile ? undefined : "active"}
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

const NavMenu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-white/10 bg-black shadow-lg flex justify-center space-x-6 px-8 py-5"
    >
      {children}
    </nav>
  );
};

const EventItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <a href={href} className="flex space-x-2 hover:opacity-90 transition">
      <img
        src={src}
        width={140}
        height={70}
        alt={title}
        className="shrink-0 rounded-md shadow-2xl object-cover"
      />
      <div>
        <h4 className="text-lg font-semibold mb-1 text-white">{title}</h4>
        <p className="text-neutral-300 text-sm max-w-[10rem]">{description}</p>
      </div>
    </a>
  );
};

const HoveredLink = ({ children, href }: { children: React.ReactNode; href: string }) => {
  return (
    <a href={href} className="text-neutral-300 hover:text-white transition block py-1">
      {children}
    </a>
  );
};

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Navbar */}
      <div className={`hidden md:block fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 ${className}`}>
        <NavMenu setActive={setActive}>
          <MenuItem setActive={setActive} active={active} item="About">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="#about">About MLSC</HoveredLink>
              <HoveredLink href="#team">Our Team</HoveredLink>
              <HoveredLink href="#about#mission">Mission & Vision</HoveredLink>
              <HoveredLink href="#join">Join Us</HoveredLink>
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="Events">
            <div className="text-sm grid grid-cols-2 gap-10 p-4">
              <EventItem
                title="Azure Workshop"
                href="/events/azure-workshop"
                src="https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=400&h=200&fit=crop"
                description="Learn cloud computing fundamentals with Microsoft Azure."
              />
              <EventItem
                title="AI & ML Bootcamp"
                href="/events/ai-bootcamp"
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop"
                description="Dive into artificial intelligence and machine learning concepts."
              />
              <EventItem
                title="Hackathon 2025"
                href="/events/hackathon"
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=200&fit=crop"
                description="24-hour coding challenge with amazing prizes and mentorship."
              />
              <EventItem
                title="Tech Talk Series"
                href="/events/tech-talks"
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop"
                description="Weekly sessions with industry experts and alumni."
              />
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="Resources">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/learning-paths">Learning Paths</HoveredLink>
              <HoveredLink href="/certifications">Microsoft Certifications</HoveredLink>
              <HoveredLink href="/projects">Student Projects</HoveredLink>
              <HoveredLink href="/blog">Blog</HoveredLink>
            </div>
          </MenuItem>
        </NavMenu>
      </div>

      {/* Mobile Navbar */}
      <div className={`md:hidden fixed top-4 inset-x-4 z-50 ${className}`}>
        <div className="relative rounded-2xl border border-white/10 bg-black shadow-lg px-6 py-4">
          <div className="flex items-center justify-between">
            <span className="text-white font-semibold text-lg">MLSC</span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 hover:bg-white/10 rounded-lg transition"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 border-t border-white/10 pt-4"
            >
              <div className="flex flex-col space-y-2">
                <MenuItem setActive={setActive} active={active} item="About" isMobile>
                  <div className="flex flex-col space-y-2 text-sm">
                    <HoveredLink href="#about">About MLSC</HoveredLink>
                    <HoveredLink href="#team">Our Team</HoveredLink>
                    <HoveredLink href="#mission">Mission & Vision</HoveredLink>
                    <HoveredLink href="#join">Join Us</HoveredLink>
                  </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Events" isMobile>
                  <div className="flex flex-col space-y-4 text-sm">
                    <EventItem
                      title="Azure Workshop"
                      href="/events/azure-workshop"
                      src="https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=400&h=200&fit=crop"
                      description="Learn cloud computing fundamentals."
                    />
                    <EventItem
                      title="AI & ML Bootcamp"
                      href="/events/ai-bootcamp"
                      src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop"
                      description="Dive into AI and ML concepts."
                    />
                    <EventItem
                      title="Hackathon 2025"
                      href="/events/hackathon"
                      src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=200&fit=crop"
                      description="24-hour coding challenge."
                    />
                    <EventItem
                      title="Tech Talk Series"
                      href="/events/tech-talks"
                      src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop"
                      description="Weekly sessions with experts."
                    />
                  </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Resources" isMobile>
                  <div className="flex flex-col space-y-2 text-sm">
                    <HoveredLink href="/learning-paths">Learning Paths</HoveredLink>
                    <HoveredLink href="/certifications">Microsoft Certifications</HoveredLink>
                    <HoveredLink href="/projects">Student Projects</HoveredLink>
                    <HoveredLink href="/blog">Blog</HoveredLink>
                  </div>
                </MenuItem>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}

export default function NavbarLayer() {
  return <Navbar className="top-2 z-10" />;
}