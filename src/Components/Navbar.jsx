import React from "react";
import { NavLink } from "react-router-dom";
import { FaGithub } from "react-icons/fa6";
import heroLogo from "../assets/logo.png"; 

const Navbar = () => {
  return (
    <nav className="navbar bg-base-100 shadow-sm px-4 md:px-16 py-3">
      <div className="flex-1">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img src={heroLogo} alt="HERO.IO" className="w-8 h-8" />
          <span className="font-bold text-lg text-[#7B2FF7]">HERO.IO</span>
        </a>
      </div>

      <div className="hidden md:flex justify-center flex-1">
        <ul className="menu menu-horizontal px-1 text-[15px] font-medium text-gray-700">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-[#7B2FF7] underline underline-offset-4"
                  : "hover:text-[#7B2FF7] transition"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/apps"
              className={({ isActive }) =>
                isActive
                  ? "text-[#7B2FF7] underline underline-offset-4"
                  : "hover:text-[#7B2FF7] transition"
              }
            >
              Apps
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/installation"
              className={({ isActive }) =>
                isActive
                  ? "text-[#7B2FF7] underline underline-offset-4"
                  : "hover:text-[#7B2FF7] transition"
              }
            >
              Installation
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Right Button */}
      <div className="flex-none">
        <a
          href="https://github.com/PrittyBiswas" 
          target="_blank"
          rel="noopener noreferrer"
          className="btn text-white border-none bg-gradient-to-r from-[#7B2FF7] to-[#F107A3] hover:opacity-90 flex items-center gap-2"
        >
          <FaGithub /> Contribute
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
