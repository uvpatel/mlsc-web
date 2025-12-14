"use client";
import React, { useState } from "react";
import { motion, type Transition } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

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
      <Image
        src={src}
        width={100}
        height={100}
        alt={title}
        className="rounded-md shadow-2xl object-cover"
        style={{ width: 'auto', height: 'auto' }}
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
      <div className={`hidden md:block fixed top-10 inset-x-0 max-w-2xl mx-auto z-50  ${className}`}>
        <NavMenu setActive={setActive}>
          <MenuItem setActive={setActive} active={active} item="Section">
            <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="#Hero">Home</HoveredLink>
              <HoveredLink href="#team">Team</HoveredLink>
              <HoveredLink href="#xteam">Members</HoveredLink>
              <HoveredLink href="#Connect">Contact</HoveredLink>
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="Events">
            <div className="text-sm grid grid-cols-2 gap-10 p-4">
              <EventItem
                title="Web Services"
                href="#webservices"
                src="https://image2url.com/images/1765562959795-fc18203f-0493-4311-ab1f-3de1e388f09c.png"
                description="Hands-on Workshop on Web Services."
              />
              <EventItem
                title="Azure Workshop"
                href="#azure-workshop"
                src="https://image2url.com/images/1765561308620-d587b4df-db49-4913-96ef-224b1ff0504c.png"
                description="Hands-On Workshop On Azure Services."
              />
              <EventItem
                title="Figma Workshop"
                href="/events/ai-bootcamp"
                src="https://image2url.com/images/1765561421567-c89db34e-2e5b-45a4-985d-ee004d6a3d99.png"
                description="Figma Fusion was an exciting design competition organized through a collaboration between GDSC and MLSC."
              />
              <EventItem
                title="Binary Battles"
                href="/events/hackathon"
                src="https://image2url.com/images/1765561722307-377fc7b6-3266-453f-a7b6-b59474254cc8.png"
                description="Binary Battles, an exciting coding competition designed to challenge students problem-solving and analytical skills."
              />
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="About">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="#about">About MLSC</HoveredLink>
              <HoveredLink href="#team">Team</HoveredLink>
              <HoveredLink href="#events">Events</HoveredLink>
              <HoveredLink href="#Connect">Connect with Us</HoveredLink>
            </div>
          </MenuItem>
        </NavMenu>
      </div>

      {/* Mobile Navbar */}
      <div className={`md:hidden fixed top-4 left-4 right-4 z-50 ${className}`}>
        <div className="relative rounded-xl border border-white/10 bg-black/90 backdrop-blur-md shadow-2xl px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <span className="text-white font-bold text-xl tracking-tight">MLSC</span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-3 -m-3 hover:bg-white/10 rounded-xl transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mt-5 border-t border-white/10 pt-5 overflow-y-auto max-h-[calc(100vh-140px)]"
            >
              <div className="flex flex-col space-y-6 pb-4">
                <MenuItem setActive={setActive} active={active} item="Sections" isMobile>
                  <div className="flex flex-col space-y-3 text-neutral-300">
                    <HoveredLink href="#Hero">Home</HoveredLink>
                    <HoveredLink href="#team">Team</HoveredLink>
                    <HoveredLink href="#events">Events</HoveredLink>
                    <HoveredLink href="#Connect">Contact</HoveredLink>
                  </div>
                </MenuItem>

                <MenuItem setActive={setActive} active={active} item="Events" isMobile>
                  <div className="flex flex-col space-y-5 text-neutral-300">
                    <EventItem
                      title="Web Services"
                      href="#webservices"
                      src="https://image2url.com/images/1765562959795-fc18203f-0493-4311-ab1f-3de1e388f09c.png"
                      description="Hands-on Workshop on Web Services."
                    />
                    <EventItem
                      title="Azure Workshop"
                      href="/events/azure-workshop"
                      src="https://image2url.com/images/1765561308620-d587b4df-db49-4913-96ef-224b1ff0504c.png"
                      description="Hands-On Workshop On Azure Services."
                    />
                    <EventItem
                      title="Figma Fusion"
                      href="/events/ai-bootcamp"
                      src="https://image2url.com/images/1765561421567-c89db34e-2e5b-45a4-985d-ee004d6a3d99.png"
                      description="Figma Fusion was an exciting design competition organized through a collaboration between GDSC and MLSC."
                    />
                    <EventItem
                      title="Binary Battles"
                      href="/events/hackathon"
                      src="https://image2url.com/images/1765561722307-377fc7b6-3266-453f-a7b6-b59474254cc8.png"
                      description="Binary Battles, an exciting coding competition designed to challenge students problem-solving and analytical skills."
                    />
                  </div>
                </MenuItem>

                <MenuItem setActive={setActive} active={active} item="About" isMobile>
                  <div className="flex flex-col space-y-3 text-neutral-300">
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