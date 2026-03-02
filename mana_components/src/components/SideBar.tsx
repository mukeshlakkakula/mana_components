"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const components = [
  { name: "Home", link: "/" },
  { name: "Headers", link: "/headers" },
  { name: "Button", link: "/buttons" },
  { name: "Input", link: "/inputs" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`h-screen bg-card border-r border-border transition-all duration-300 ease-in-out
        ${isOpen ? "w-64 p-6" : "w-20 p-4"}
      `}
    >
      {/* Top Section */}
      <div className="flex items-center justify-between mb-6">
        {isOpen && <h2 className="text-lg font-semibold">Components</h2>}
      </div>

      {/* Links */}
      <ul className="space-y-2">
        {components.map((component) => {
          const isActive = pathname === component.link;

          return (
            <li key={component.name}>
              <Link
                href={component.link}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }
                `}
              >
                {/* Icon Placeholder */}
                <span className="text-base">•</span>

                {isOpen && <span>{component.name}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md hover:bg-accent transition"
      >
        {isOpen ? "←" : "→"}
      </button>
    </div>
  );
}
