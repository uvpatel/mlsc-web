
"use client";

import React from "react";

export function Contact() {
  const links = [
    {
      title: "Home",
      icon: "https://img.icons8.com/color/48/000000/home-page.png",
      href: "#",
    },
    {
      title: "Projects",
      icon: "https://img.icons8.com/color/48/000000/source-code.png",
      href: "#projects",
    },
    {
      title: "About",
      icon: "https://img.icons8.com/color/48/000000/about.png",
      href: "#about",
    },
    {
      title: "Contact",
      icon: "https://img.icons8.com/color/48/000000/email.png",
      href: "mailto:mlsc@example.com",
    },
    {
      title: "GitHub",
      icon: "https://img.icons8.com/color/48/000000/github--v1.png",
      href: "https://github.com/mlsc",
    },
    {
      title: "LinkedIn",
      icon: "https://img.icons8.com/color/48/000000/linkedin.png",
      href: "https://www.linkedin.com/company/mlsc",
    },
    {
      title: "Instagram",
      icon: "https://img.icons8.com/color/48/000000/instagram-new.png",
      href: "https://www.instagram.com/mlsc",
    },
    {
      title: "Twitter",
      icon: "https://img.icons8.com/color/48/000000/twitter--v1.png",
      href: "https://twitter.com/mlsc",
    },
  ];

  return (
    <div id="contact" className="w-full bg-gradient-to-t from-black via-gray-900 to-black py-10 px-4">
      {/* Club Name */}
      <div className="text-center mb-8">
        <h1 className="text-white text-4xl md:text-5xl font-extrabold tracking-wide">
          Microsoft Learning Student Club
        </h1>
        <p className="text-gray-400 mt-2 md:text-lg">
          Empowering Students with Technology & Innovation
        </p>
      </div>

      {/* Social / Navigation Links */}
      <footer className="flex flex-row md:flex-row flex-nowrap overflow-x-auto md:justify-center gap-6 md:gap-12 py-4">
        {links.map((link) => (
          <a
            key={link.title}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center flex-shrink-0 transform transition duration-300 hover:scale-110"
          >
            <div className="p-2 rounded-full bg-black/20 backdrop-blur-md shadow-lg hover:shadow-blue-500/50 transition-all duration-300">
              <img
                src={link.icon}
                alt={link.title}
                className="h-12 w-12 md:h-16 md:w-16 object-contain group-hover:rotate-12 transition-transform duration-300"
              />
            </div>
            <span className="mt-2 text-white text-xs md:text-base group-hover:text-blue-500 transition-colors duration-300 text-center">
              {link.title}
            </span>
          </a>
        ))}
      </footer>

      {/* Copyright */}
      <p className="text-center text-gray-500 text-xs mt-6">
        © {new Date().getFullYear()} Microsoft Learning Student Club. All rights reserved.
      </p>
    </div>
  );
}
