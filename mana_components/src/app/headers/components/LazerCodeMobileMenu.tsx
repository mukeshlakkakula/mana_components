import headerImg1 from "@/../public/assets/images/headers/lazercodeMobileMenu.png";
import headerImg2 from "@/../public/assets/images/headers/lazercodeMobileMenu2.png";

import CodeBlock from "@/components/CodeBlock";

const headerCode = `"use client";

import React from "react";
import Link from "next/link";

// import logo from "../../../../public/assets/images/headers/logo/Zoomedlogo-removebg-preview.png";
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 right-0 w-full h-full bg-white text-black p-4 shadow-lg rounded-lg"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center align-center mb-2">
        <Link href="/">
          <h1 className="text-xl font-bold">
            L<span className="text-red-500">C</span>
          </h1>
        </Link>
        <button onClick={onClose} className=" text-lg font-medium ">
          ✕
        </button>
      </div>

      <nav>
        <ul className="flex flex-col gap-4 text-lg font-medium  p-4 rounded-lg">
          <Link href="/" onClick={onClose}>
            <li className="hover:text-orange-300 text-center text-white bg-black rounded-full p-2">
              Home
            </li>
          </Link>
          <Link href="/about" onClick={onClose}>
            <li className="hover:text-orange-300 text-center     text-white bg-black rounded-full p-2 ">
              About
            </li>
          </Link>
          <Link href="/services" onClick={onClose}>
            <li className="hover:text-orange-300 text-center text-white bg-black rounded-full p-2">
              Services
            </li>
          </Link>
          <Link href="/contact" onClick={onClose}>
            <li className="hover:text-orange-300 text-center text-white bg-black rounded-full p-2">
              Contact
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default MobileMenu;
`;

const Page = () => {
  const Images = [headerImg1.src, headerImg2.src];
  return (
    <div className="space-y-8">
      {/* Preview */}
      <div>
        <h1 className="text-3xl font-bold mb-4"> lazercode MobileMenu </h1>
      </div>

      {/* Code */}
      <div>
        <CodeBlock code={headerCode} images={Images} />
      </div>
    </div>
  );
};

export default Page;
