import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 px-4 bg-gray-800 text-gray-300 text-center">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="mb-4 md:mb-0">
          © 2023 AI Interview Question Generator. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <a
            href="#"
            className="hover:text-white transition duration-200 ease-in-out"
          >
            About
          </a>
          <a
            href="#"
            className="hover:text-white transition duration-200 ease-in-out"
          >
            Contact
          </a>
          <a
            href="#"
            className="hover:text-white transition duration-200 ease-in-out"
          >
            GitHub
          </a>
          <a
            href="#"
            className="hover:text-white transition duration-200 ease-in-out"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
