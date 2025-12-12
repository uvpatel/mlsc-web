import React from "react";
import { FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-200 py-10">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left section */}
                <div>
                    <h2 className="text-xl font-semibold text-blue-500 mb-3">MLSC</h2>
                    <p className="mb-2">
                        Microsoft Learning Club (MLSC) is dedicated to fostering learning and development through Microsoft technologies and community engagement.
                    </p>
                    <p className="mb-1">
                        <strong>Address:</strong> BVM, Vidyanagar, Anand, Gujrat, India
                    </p>
                    <p>
                        <strong>Email:</strong> <a href="mailto:mlsaclub@bvmengineering.ac.in" className="hover:underline">mlsaclub@bvmengineering.ac.in</a>
                    </p>
                </div>

                {/* Middle section */}
                <div>
                    <h3 className="text-lg font-semibold text-blue-500 mb-3">Quick Links</h3>
                    <ul className="space-y-1">
                        <li><a href="#Hero" className="hover:underline">Home</a></li>
                        <li><a href="#about" className="hover:underline">About Us</a></li>
                        <li><a href="#team" className="hover:underline">Team</a></li>
                        <li><a href="#Events" className="hover:underline">Events</a></li>
                        <li><a href="#contact" className="hover:underline">Contact</a></li>
                    </ul>
                </div>

                {/* Right section */}
                <div>
                    <h3 className="text-lg font-semibold text-blue-500 mb-3">Follow Us</h3>
                    <div className="flex space-x-4">
                        <a href="https://www.linkedin.com/in/mlsc-bvm/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500">
                            <FaLinkedin size={24} />
                        </a>
                        <a href="https://www.instagram.com/mlsc_bvm/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500">
                            <FaInstagram size={24} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-10 pt-5 text-center text-gray-500 text-sm">
                © 2025 MLSC. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
