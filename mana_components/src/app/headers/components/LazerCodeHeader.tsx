import React from "react";
import headerImg1 from "@/../public/assets/images/headers/lazercodeHeader.png";
import headerImg2 from "@/../public/assets/images/headers/lazercodeHeader2.png";

import CodeBlock from "@/components/CodeBlock";

const headerCode = `"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/assets/images/headers/logo/Zoomedlogo-removebg-preview.png";
import MobileMenu from "./LazerCodeMobileMenu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Adjust threshold as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={\`fixed z-50 transition-all duration-300 \${ 
        isScrolled
          ? "top-3 left-1/2 transform -translate-x-1/2 w-[80%] bg-black text-white p-3 shadow-lg rounded-full"
          : "top-0 left-0 w-full text-white p-4"
      }\`}
    >
      <div className="flex justify-between items-center ml-4 mr-4">
        <Link href="/">
          <Image
            src={logo}
            alt="Lazer Code Logo"
            width={160}
            height={80}
            className="rounded-lg"
          />
        </Link>
        <nav>
          <ul className="hidden md:flex gap-6  text-lg font-medium">
            <Link href="/">
              <li className="hover:underline hover:text-orange-300">Home</li>
            </Link>
            <Link href="/about">
              <li className="hover:underline hover:text-orange-300">About</li>
            </Link>
            <Link href="/services">
              <li className="hover:underline hover:text-orange-300">
                Services
              </li>
            </Link>
            <Link href="/contact">
              <li className="hover:underline hover:text-orange-300">Contact</li>
            </Link>
          </ul>
        </nav>
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </div>
  );
};

export default Header;`;

const Page = () => {
  const Images = [headerImg1.src, headerImg2.src];
  return (
    <div className="space-y-8">
      {/* Preview */}
      <div>
        <h1 className="text-3xl font-bold mb-4"> LazerCodeHeader </h1>
      </div>

      {/* Code */}
      <div>
        <CodeBlock code={headerCode} images={Images} />
      </div>
    </div>
  );
};

export default Page;
