import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-6 mt-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">
        {/* Left side: copyright */}
        <p className="text-sm mb-4 sm:mb-0">
          © {new Date().getFullYear()} SneHIL DwiVEDI. All Rights Reserved.
        </p>

        {/* Right side: social links */}
        <div className="flex space-x-6 text-lg">
          <a
            href="https://github.com/snehildwivedi03"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-white transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/snehil-dwivedi-"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:snehildwive03@gmail.com"
            className="hover:text-red-600 dark:hover:text-red-400 transition"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
