"use client";

import { useState } from "react";

interface CodeBlockProps {
  code: string;
  images?: string[];
  instructions?: string;
}

export default function CodeBlock({
  code,
  images,
  instructions,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div>
      {" "}
      <h2 className="text-xl font-semibold mb-4">Reference Images</h2>
      <div className="grid grid-cols-12 gap-4 bg-white border border-border p-4 rounded-lg mb-6">
        {images && images.length > 0 ? (
          images.map((src, index) => (
            <div key={index} className="col-span-12 ">
              <img
                src={src}
                alt={`Image ${index + 1}`}
                className="object-cover rounded-lg"
              />
              <hr className="col-span-12 border-t border-border my-4" />
            </div>
          ))
        ) : (
          <div className="col-span-12">
            <p className="text-gray-500 text-center py-8">
              No images to display
            </p>
          </div>
        )}
      </div>
      <div className="bg-white border border-border p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Instructions</h2>
        <p className="text-gray-700">
          {instructions || "No instructions provided."}
        </p>
      </div>
      <h2 className="text-xl font-semibold mb-4">Code</h2>
      <div className="space-y-4">
        {/* Toggle Button */}
        <button
          onClick={() => setShowCode(!showCode)}
          className="px-4 py-2 text-sm rounded-lg border border-border 
        bg-card hover:bg-accent transition"
        >
          {showCode ? "Hide Code" : "Show Code"}
        </button>

        {/* Animated Code Container */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            showCode ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="relative mt-2">
            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 text-xs px-3 py-1 rounded-md 
            bg-primary text-primary-foreground hover:opacity-80 transition"
            >
              {copied ? "Copied!" : "Copy"}
            </button>

            {/* Code Block */}
            <pre className="bg-card border border-border p-6 rounded-2xl overflow-x-auto text-sm font-mono shadow-[var(--shadow-soft)]">
              <code>{code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
