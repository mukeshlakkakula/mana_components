import Link from "next/link";
import Image from "next/image";
import { Component } from "@/lib/appwrite";

interface ComponentCardProps {
  component: Component;
}

export default function ComponentCard({ component }: ComponentCardProps) {
  return (
    <Link href={`/components/${component.slug}`} className="group block">
      <div className="bg-card rounded-lg border border-border shadow-soft hover:shadow-float transition-all duration-300 overflow-hidden">
        {/* Preview Image */}
        <div className="relative aspect-video bg-secondary/50">
          {component.previewImage ? (
            <Image
              src={component.previewImage}
              alt={component.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-muted-foreground">No preview</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
            {component.title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground capitalize">
              {component.category}
            </span>
            <span className="text-xs text-muted-foreground">
              {new Date(component.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
