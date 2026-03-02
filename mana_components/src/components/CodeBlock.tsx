"use client";

import { useState } from "react";
import { Check, Copy, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

interface CodeBlockProps {
  code: string;
  images?: string[];
  instructions: string;
  title?: string;
}

export default function CodeBlock({
  code,
  images = [],
  instructions,
  title,
}: CodeBlockProps) {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Images Section */}
      {images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-video rounded-lg overflow-hidden border border-border shadow-soft"
            >
              <Image
                src={image}
                alt={`${title || "Component"} reference ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Instructions Section */}
      <div className="bg-card rounded-lg p-6 border border-border shadow-soft">
        <h2 className="text-xl font-display font-semibold mb-4">
          Instructions
        </h2>
        <div className="prose prose-sm max-w-none">
          <p className="text-muted-foreground whitespace-pre-wrap">
            {instructions}
          </p>
        </div>
      </div>

      {/* Code Section */}
      <div className="bg-card rounded-lg border border-border shadow-soft overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowCode(!showCode)}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              {showCode ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">
                {showCode ? "Hide Code" : "Show Code"}
              </span>
            </button>
          </div>
          {showCode && (
            <button
              onClick={copyToClipboard}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">
                {copied ? "Copied!" : "Copy Code"}
              </span>
            </button>
          )}
        </div>

        {showCode && (
          <pre className="p-4 overflow-x-auto bg-primary/5">
            <code className="text-sm font-mono whitespace-pre-wrap">
              {code}
            </code>
          </pre>
        )}
      </div>
    </div>
  );
}
