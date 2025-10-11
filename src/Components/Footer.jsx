import React from "react";
import { FaXTwitter, FaLinkedinIn, FaFacebookF } from "react-icons/fa6";
import heroLogo from "../assets/logo.png";

const Footer = () => {
    return (
        <footer className="bg-[#031B34] text-white py-8 px-6 md:px-20">
            <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-700 pb-6">
                {/* Left section - Logo */}
                <div className="flex items-center gap-2 mb-4 md:mb-0">
                    <img src={heroLogo} alt="HERO.IO" className="w-8 h-8" />
                    <h2 className="text-lg font-semibold tracking-wide">HERO.IO</h2>
                </div>

                {/* Right section - Social Links */}
                <div className="text-center md:text-right">
                    <h3 className="text-sm font-semibold mb-2 uppercase text-gray-300">
                        Social Links
                    </h3>
                    <div className="flex justify-center md:justify-end gap-4 text-lg">
                        <a
                            href="#"
                            className="hover:text-primary transition-colors duration-300"
                            aria-label="Twitter"
                        >
                            <FaXTwitter />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/pritty-biswas-090/"
                            className="hover:text-primary transition-colors duration-300"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedinIn />
                        </a>
                        <a
                            href="https://www.facebook.com/home.php"
                            className="hover:text-primary transition-colors duration-300"
                            aria-label="Facebook"
                        >
                            <FaFacebookF />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="text-center mt-6 text-sm text-gray-400">
                Copyright © {new Date().getFullYear()} - All rights reserved
            </div>
        </footer>
    );
};

export default Footer;
