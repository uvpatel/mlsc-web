"use client";

import { EncryptedText } from "@/components/ui/encrypted-text";
import React from "react";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { MdEmail, MdHome, MdInfo } from "react-icons/md";

export function Contact() {
  const links = [
    {
      title: "Home",
      href: "#Hero",
      Icon: MdHome,
      hoverBg: "hover:bg-blue-600",
      textColor: "text-blue-500",
    },
    {
      title: "About",
      href: "#about",
      Icon: MdInfo,
      hoverBg: "hover:bg-blue-600",
      textColor: "text-blue-500",
    },
    {
      title: "Contact",
      href: "mailto:mlsc@mlsaclub@bvmengineering.ac.in",
      Icon: MdEmail,
      hoverBg: "hover:bg-blue-600",
      textColor: "text-blue-500",
    },
    {
      title: "LinkedIn",
      href: "https://www.linkedin.com/in/mlsc-bvm/",
      Icon: FaLinkedinIn,
      hoverBg: "hover:bg-[#0077b5]",
      textColor: "text-[#0077b5]",
    },
    {
      title: "Instagram",
      href: "https://www.instagram.com/mlsc_bvm/",
      Icon: FaInstagram,
      hoverBg: "hover:bg-[#e1306c]",
      textColor: "text-[#e1306c]",
    },
  ];

  return (
    <div id="Connect" className="w-full bg-gradient-to-t from-black via-gray-900 to-black py-10 px-4">
      {/* Club Name */}
      <div className="text-center mb-8">
        <h1 className="text-white text-4xl md:text-5xl font-extrabold tracking-wide">
          
          <EncryptedText
                    text="Microsoft Learn Student Club"
                    encryptedClassName="text-white"
                    revealedClassName="text-white"
                    revealDelayMs={80}
                    flipDelayMs={60}
                  />
        </h1>
        <p className="text-gray-400 mt-2 md:text-lg">
          Empowering Students with Technology & Innovation • Connect with Us
        </p>
      </div>

      {/* Social / Navigation Links */}
      <div className="flex justify-center">
        <div className="grid grid-cols-5 sm:flex sm:justify-center gap-8 md:gap-12">
          {links.map((link) => {
            const IconComponent = link.Icon;
            const isExternal = link.href.startsWith("http") || link.href.startsWith("mailto");

            return (
              <a
                key={link.title}
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="group flex flex-col items-center space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-4"
              >
                <div
                  className={`icon bg-white rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center shadow-lg transition-all duration-500 ease-out ${link.hoverBg} group-hover:text-white`}
                >
                  <IconComponent className="text-2xl sm:text-3xl text-gray-800 group-hover:text-white transition-colors duration-300" />
                </div>

                <span
                  className={`hidden sm:inline text-base md:text-lg font-medium ${link.textColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                >
                  {link.title}
                </span>

                {/* Mobile label - always visible below icon */}
                <span className="sm:hidden text-white text-xs mt-1">
                  {link.title}
                </span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Copyright */}
      <p className="text-center text-gray-500 text-xs mt-10">
        © {new Date().getFullYear()} Microsoft Learn Student Club - BVM. All rights reserved.
      </p>
    </div>
  );
}